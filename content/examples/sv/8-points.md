# 8 Story Points – Större ändringar

> **Arbetsinsats:** 2–3 dagar
> **Risk:** Medel till hög
> **Tester:** Omfattande testsvit krävs
> **Komplexitet:** Medel-Hög

---

## 📋 Exempel 1: E-postnotifikationer

### User Story

> Som **ny användare** vill jag **få ett bekräftelsemail** så att **jag kan verifiera min e-postadress och aktivera mitt konto**.

### Bakgrund

Efter registrering måste användaren bekräfta sin e-postadress innan de kan använda applikationen fullt ut. Detta ökar säkerheten och minskar spam-registreringar.

### Teknisk arkitektur

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│   E-post    │
│   Register  │     │   API       │     │   Tjänst    │
└─────────────┘     └──────┬──────┘     └──────┬──────┘
                           │                    │
                           ▼                    ▼
                    ┌─────────────┐     ┌─────────────┐
                    │  Databas    │     │   SMTP/SES  │
                    │  (Token)    │     │             │
                    └─────────────┘     └─────────────┘
```

### E-postmall

```html
<!-- templates/email/confirm-registration.html -->
<h1>Välkommen till {{appName}}!</h1>
<p>Klicka på knappen för att bekräfta din e-post:</p>
<a href="{{confirmUrl}}" class="button">Bekräfta e-post</a>
<p><small>Länken är giltig i 24 timmar.</small></p>
```

### API-endpoints

| Endpoint                        | Metod | Beskrivning                     |
| ------------------------------- | ----- | ------------------------------- |
| `/api/auth/register`            | POST  | Skapa användare + skicka e-post |
| `/api/auth/confirm/{token}`     | GET   | Validera token + aktivera konto |
| `/api/auth/resend-confirmation` | POST  | Skicka e-post igen              |

### Acceptanskriterier

- [ ] Skapa e-postmall (HTML + ren text-fallback)
- [ ] Token-baserad aktiveringslänk med 64-teckens slumpsträng
- [ ] Lagra token i Redis/DB med 24-timmars TTL
- [ ] Felsida för ogiltig eller utgången token
- [ ] Skicka igen-knapp på inloggningssidan (endast om inte aktiverad)
- [ ] Rate limiting: Max 3 omsändningar per timme
- [ ] E-postloggning för felsökning

### Säkerhetsaspekter

- [ ] Token är kryptografiskt säker
- [ ] Token ogiltigförklaras efter användning
- [ ] Brute-force-skydd på bekräftelseendpoint

---

## 📋 Exempel 2: Fulltextsökning med markering

### User Story

> Som **användare** vill jag **söka artiklar och se markerade träffar** så att **jag snabbt kan hitta relevant information**.

### Teknisk lösning

```typescript
// Sökning med markering
const searchArticles = async (query: string) => {
  const response = await fetch(`/api/articles/search?q=${encodeURIComponent(query)}`);
  return response.json();
};

// Svarsformat
interface SearchResult {
  id: string;
  title: string;
  titleHighlighted: string;  // Med <mark>...</mark>-taggar
  excerpt: string;
  excerptHighlighted: string;
  score: number;
}
```

### Acceptanskriterier

- [ ] Sökfält med debounce (300ms mellan inmatningar)
- [ ] Sök i titel och beskrivning
- [ ] Markering av söktermer med `<mark>`-taggar
- [ ] Minst 2 tecken krävs för sökning
- [ ] Visning av tomt tillstånd vid 0 resultat
- [ ] "Ladda fler"-knapp för > 20 resultat
- [ ] Prestanda: < 200ms för 10 000+ artiklar (index krävs)

---

## 📋 Exempel 3: Kommentarsystem

### User Story

> Som **bloggläsare** vill jag **skriva kommentarer och svara på andra** så att **jag kan delta i diskussionen**.

### Datamodell

```typescript
interface Comment {
  id: string;
  postId: string;
  parentId: string | null;  // null = toppnivåkommentar
  authorId: string;
  authorName: string;
  content: string;          // max 1000 tecken
  createdAt: Date;
  updatedAt: Date | null;
  isDeleted: boolean;
}
```

### UI-struktur

```
┌─────────────────────────────────────────────────┐
│ 💬 3 kommentarer                                 │
├─────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────┐ │
│ │ 👤 Johan Andersson · 2 timmar sedan        │ │
│ │ "Bra artikel! Tack för tipsen."            │ │
│ │ [Svara] [Redigera] [Radera]                │ │
│ │                                             │ │
│ │   ┌─────────────────────────────────────┐   │ │
│ │   │ 👤 Anna S. · 1 timme sedan         │   │ │
│ │   │ "Håller med, mycket hjälpsamt!"    │   │ │
│ │   │ [Svara]                             │   │ │
│ │   └─────────────────────────────────────┘   │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### Acceptanskriterier

- [ ] Skriv kommentar (max 1000 tecken, teckenräknare)
- [ ] Nästlade svar (1 nivå djupt)
- [ ] Redigera egna kommentarer (med "redigerad"-märke)
- [ ] Radera egna kommentarer (mjuk radering, visar "[raderad]")
- [ ] Relativa tidsstämplar ("5 minuter sedan", "igår")
- [ ] Avatar + författarnamn
- [ ] Realtidsuppdateringar valfritt (WebSocket för livekommentarer)

---

## ✅ Varför 8 poäng?

| Kriterium   | Bedömning                             |
| ----------- | ------------------------------------- |
| Arkitektur  | Flera system integrerade              |
| Komplexitet | Frontend + Backend + externa tjänster |
| Säkerhet    | Säkerhetsaspekter att beakta          |
| Tester      | Omfattande testsvit behövs            |
| Risk        | Ökad risk på grund av beroenden       |
