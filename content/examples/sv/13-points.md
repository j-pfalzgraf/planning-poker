# 13 Story Points – Stora ändringar

> **Arbetsinsats:** 3–5 dagar
> **Risk:** Hög
> **Tester:** Full testtäckning krävs
> **Komplexitet:** Hög

---

## 📋 Exempel 1: Flerstegs onboarding-guide

### Epic

> Som **ny kund** vill jag **guidas genom en installationsprocess** så att **jag kan använda systemet produktivt så snabbt som möjligt**.

### Bakgrund

Nya kunder måste för närvarande hitta alla inställningar manuellt. En 4-stegsguide ska leda dem genom de viktigaste stegen och minska time-to-value.

### Guideflöde

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Steg 1    │───▶│   Steg 2    │───▶│   Steg 3    │───▶│   Steg 4    │
│  Företag    │    │  Kontakt    │    │  Betalning  │    │  Sammanfat. │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      │                  │                  │                  │
      ▼                  ▼                  ▼                  ▼
   Validering        Validering        Validering         Skicka
   spara             spara             spara              alla data
```

### Stegdetaljer

| Steg               | Fält                    | Validering                  |
| ------------------ | ----------------------- | --------------------------- |
| 1. Företagsdata    | Namn, Adress, Org.nr    | Obligatorisk, Org.nr-format |
| 2. Kontaktperson   | Namn, E-post, Telefon   | E-postformat, Obligatorisk  |
| 3. Betalningsmetod | Bankgiro eller Kort     | Konto-/kortnummerkontroll   |
| 4. Sammanfattning  | All data (skrivskyddad) | Bekräftelse                 |

### Tekniska komponenter

```typescript
// Tillståndshantering
interface OnboardingState {
  currentStep: 1 | 2 | 3 | 4;
  company: CompanyData | null;
  contact: ContactData | null;
  payment: PaymentData | null;
  isDirty: boolean;
  errors: Record<string, string[]>;
}

// Mellanlagring
const STORAGE_KEY = 'onboarding_draft';
localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
```

### Acceptanskriterier

- [ ] Förloppsindikator visar aktuellt steg (1/4, 2/4, ...)
- [ ] Validering per steg vid Nästa-klick
- [ ] Bakåtnavigering utan dataförlust
- [ ] Auto-spara till LocalStorage var 30:e sekund och vid blur
- [ ] Varning när sidan lämnas med osparad data
- [ ] Slutsammanfattning med redigeringslänkar till varje steg
- [ ] Felhantering vid submit (retry-logik)
- [ ] Mobiloptimerad (vertikal stepper)
- [ ] Tangentbordsnavigering (Tab, Enter)

### Testscenarier

1. **Happy Path:** Fyll i alla steg → Framgångsrikt slutfört
2. **Valideringsfel:** Ogiltigt kontonummer → Visa fel
3. **Avbryt:** Stäng flik vid steg 2 → Återställ data vid återöppning
4. **Nätverksfel:** Submit misslyckas → Visa retry-knapp

---

## 📋 Exempel 2: Anpassningsbar dashboard med widgets

### User Story

> Som **power-användare** vill jag **anpassa min dashboard med widgets** så att **jag kan se den information som är viktig för mig på ett ögonblick**.

### Funktionsomfång

- **Widget-bibliotek:** 8 fördefinierade widgets
- **Dra och släpp:** Fri positionering
- **Ändra storlek:** Ändra storlek via handtag
- **Beständighet:** Layout sparas

### Tillgängliga widgets

| Widget         | Storlekar     | Datakälla                |
| -------------- | ------------- | ------------------------ |
| Intäktsdiagram | 1x1, 2x1, 2x2 | `/api/stats/revenue`     |
| Senaste ordrar | 1x2, 2x2      | `/api/orders?limit=10`   |
| Uppgiftslista  | 1x1, 1x2      | `/api/tasks?status=open` |
| KPI-rutor      | 1x1, 2x1      | `/api/stats/kpis`        |
| Kalender       | 2x2           | `/api/events`            |
| Teamaktivitet  | 1x2           | `/api/activity`          |
| Snabbåtgärder  | 1x1           | statisk                  |
| Anteckningar   | 1x1, 1x2      | `/api/notes`             |

### Rutnätssystem

```
┌──────────┬──────────┬──────────┬──────────┐
│  Widget  │  Widget  │       Widget        │
│   1x1    │   1x1    │        2x1          │
├──────────┼──────────┼──────────┬──────────┤
│       Widget        │  Widget  │  Widget  │
│        2x1          │   1x1    │   1x1    │
├──────────┬──────────┼──────────┴──────────┤
│  Widget  │  Widget  │       Widget        │
│   1x2    │   1x2    │        2x2          │
│          │          │                     │
└──────────┴──────────┴─────────────────────┘
```

### Acceptanskriterier

- [ ] Widget-bibliotek med förhandsgranskningskort
- [ ] Dra och släpp för positionering (react-grid-layout eller vue-grid-layout)
- [ ] Ändra storlek via hörnhandtag
- [ ] Kollisionsdetektering (widgets överlappar inte)
- [ ] Layout sparad till DB (debounced, 500ms efter ändring)
- [ ] Återställ till standardlayout (knapp + bekräftelse)
- [ ] Responsiv: Rutnät anpassas till viewport
- [ ] Laddningsskelett för varje widget

---

## 📋 Exempel 3: Notifikationscenter i appen

### User Story

> Som **användare** vill jag **se alla relevanta notifikationer på ett ställe** så att **jag inte missar något viktigt**.

### Komponentarkitektur

```
┌─────────────────────────────────────────────────┐
│                    Header                        │
│  Logo   Nav   Nav   Nav   [🔔 3]   Avatar       │
└─────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │  Notifikations-     │
                    │  dropdown           │
                    │  ┌───────────────┐  │
                    │  │ Ny order      │  │
                    │  │ 2 min sedan   │  │
                    │  ├───────────────┤  │
                    │  │ Uppgift klar  │  │
                    │  │ 1 timme sedan │  │
                    │  └───────────────┘  │
                    │  [Markera alla som lästa] │
                    │  [Visa alla →]       │
                    └─────────────────────┘
```

### Datamodell

```typescript
interface Notification {
  id: string;
  type: 'order' | 'task' | 'system' | 'mention';
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
}
```

### Acceptanskriterier

- [ ] Klockikon med märke (oläst räknare, max 99+)
- [ ] Dropdown med senaste 10 notifikationer
- [ ] Markera som läst (individuellt eller alla)
- [ ] Klick på notifikation → navigera till relevant sida
- [ ] Realtidsuppdateringar via WebSocket
- [ ] Beständighet i databas
- [ ] Ljud vid ny notifikation (valfritt, konfigurerbart)
- [ ] "Alla notifikationer"-sida med paginering och filtrering

---

## ✅ Varför 13 poäng?

| Kriterium    | Bedömning                   |
| ------------ | --------------------------- |
| Arkitektur   | Flera system integrerade    |
| Tillstånd    | Komplex tillståndshantering |
| Komponenter  | 10+ nya/ändrade filer       |
| Beständighet | Databas + API-endpoints     |
| Tester       | Hög testinsats              |
| Risk         | Kantfall och felscenarier   |
