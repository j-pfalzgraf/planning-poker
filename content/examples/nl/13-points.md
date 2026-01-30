# 13 Story Points – Grote Wijzigingen

> **Inspanning:** 3–5 dagen
> **Risico:** Hoog
> **Tests:** Volledige testdekking vereist
> **Complexiteit:** Hoog

---

## 📋 Voorbeeld 1: Multi-Stap Onboarding Wizard

### Epic

> Als **nieuwe klant** wil ik **door een configuratieproces worden geleid** zodat **ik het systeem zo snel mogelijk productief kan gebruiken**.

### Achtergrond

Nieuwe klanten moeten momenteel alle instellingen handmatig vinden. Een 4-stappen wizard moet hen door de belangrijkste stappen leiden en de time-to-value verminderen.

### Wizard Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Stap 1    │───▶│   Stap 2    │───▶│   Stap 3    │───▶│   Stap 4    │
│  Bedrijf    │    │  Contact    │    │  Betaling   │    │  Samenvatting│
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      │                  │                  │                  │
      ▼                  ▼                  ▼                  ▼
   Validatie         Validatie         Validatie          Verstuur
   opslaan           opslaan           opslaan           alle gegevens
```

### Stap Details

| Stap                | Velden                       | Validatie                  |
| ------------------- | ---------------------------- | -------------------------- |
| 1. Bedrijfsgegevens | Naam, Adres, BTW-nummer      | Verplicht, BTW-formaat     |
| 2. Contactpersoon   | Naam, E-mail, Telefoon       | E-mail formaat, Verplicht  |
| 3. Betaalmethode    | IBAN of Creditcard           | Rekening/Kaartnummer check |
| 4. Samenvatting     | Alle gegevens (alleen-lezen) | Bevestiging                |

### Technische Componenten

```typescript
// State management
interface OnboardingState {
  currentStep: 1 | 2 | 3 | 4;
  company: CompanyData | null;
  contact: ContactData | null;
  payment: PaymentData | null;
  isDirty: boolean;
  errors: Record<string, string[]>;
}

// Tussentijdse opslag
const STORAGE_KEY = 'onboarding_draft';
localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
```

### Acceptatiecriteria

- [ ] Voortgangsindicator toont huidige stap (1/4, 2/4, ...)
- [ ] Validatie per stap bij klikken op Volgende
- [ ] Terug navigatie zonder gegevensverlies
- [ ] Auto-save naar LocalStorage elke 30s en bij blur
- [ ] Waarschuwing bij verlaten pagina met niet-opgeslagen gegevens
- [ ] Eindoverzicht met bewerklinks naar elke stap
- [ ] Foutafhandeling bij versturen (retry logica)
- [ ] Mobiel-geoptimaliseerd (verticale stepper)
- [ ] Toetsenbordnavigatie (Tab, Enter)

### Test Scenario's

1. **Happy Path:** Vul alle stappen in → Succesvol afgerond
2. **Validatiefout:** Ongeldig rekeningnummer → Toon fout
3. **Afbreken:** Sluit tab bij stap 2 → Herstel gegevens bij heropenen
4. **Netwerkfout:** Versturen mislukt → Toon opnieuw proberen knop

---

## 📋 Voorbeeld 2: Aanpasbaar Dashboard met Widgets

### User Story

> Als **power user** wil ik **mijn dashboard personaliseren met widgets** zodat **ik de voor mij belangrijke informatie in één oogopslag kan zien**.

### Functie Scope

- **Widget Bibliotheek:** 8 voorgedefinieerde widgets
- **Drag & Drop:** Vrije positionering
- **Formaat wijzigen:** Grootte aanpassen via handvat
- **Persistentie:** Layout wordt opgeslagen

### Beschikbare Widgets

| Widget          | Groottes      | Databron                 |
| --------------- | ------------- | ------------------------ |
| Omzet Grafiek   | 1x1, 2x1, 2x2 | `/api/stats/revenue`     |
| Recente Orders  | 1x2, 2x2      | `/api/orders?limit=10`   |
| Takenlijst      | 1x1, 1x2      | `/api/tasks?status=open` |
| KPI Tegels      | 1x1, 2x1      | `/api/stats/kpis`        |
| Kalender        | 2x2           | `/api/events`            |
| Team Activiteit | 1x2           | `/api/activity`          |
| Snelle Acties   | 1x1           | statisch                 |
| Notities        | 1x1, 1x2      | `/api/notes`             |

### Grid Systeem

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

### Acceptatiecriteria

- [ ] Widget bibliotheek met preview kaarten
- [ ] Drag & drop voor positionering (react-grid-layout of vue-grid-layout)
- [ ] Formaat wijzigen via hoekhandvatten
- [ ] Botsingsdetectie (widgets overlappen niet)
- [ ] Layout opgeslagen naar DB (debounced, 500ms na wijziging)
- [ ] Reset naar standaard layout (knop + bevestiging)
- [ ] Responsive: Grid past zich aan viewport aan
- [ ] Laad skeleton voor elke widget

---

## 📋 Voorbeeld 3: In-App Notificatiecentrum

### User Story

> Als **gebruiker** wil ik **alle relevante notificaties op één plek zien** zodat **ik niets belangrijks mis**.

### Component Architectuur

```
┌─────────────────────────────────────────────────┐
│                    Header                        │
│  Logo   Nav   Nav   Nav   [🔔 3]   Avatar       │
└─────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │  Notificatie        │
                    │  Dropdown           │
                    │  ┌───────────────┐  │
                    │  │ Nieuwe Order  │  │
                    │  │ 2 min geleden │  │
                    │  ├───────────────┤  │
                    │  │ Taak Voltooid │  │
                    │  │ 1 uur geleden │  │
                    │  └───────────────┘  │
                    │  [Alles als gelezen] │
                    │  [Bekijk alles →]    │
                    └─────────────────────┘
```

### Datamodel

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

### Acceptatiecriteria

- [ ] Bel icoon met badge (ongelezen teller, max 99+)
- [ ] Dropdown met laatste 10 notificaties
- [ ] Markeren als gelezen (individueel of alles)
- [ ] Klik op notificatie → navigeer naar relevante pagina
- [ ] Real-time updates via WebSocket
- [ ] Persistentie in database
- [ ] Geluid bij nieuwe notificatie (optioneel, configureerbaar)
- [ ] "Alle notificaties" pagina met paginering en filtering

---

## ✅ Waarom 13 Punten?

| Criterium    | Beoordeling                     |
| ------------ | ------------------------------- |
| Architectuur | Meerdere systemen geïntegreerd  |
| State        | Complexe state management       |
| Componenten  | 10+ nieuwe/gewijzigde bestanden |
| Persistentie | Database + API endpoints        |
| Tests        | Hoge testinspanning             |
| Risico       | Edge cases en foutscenario's    |
