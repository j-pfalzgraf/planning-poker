# 8 Story Points – Grotere Wijzigingen

> **Inspanning:** 2–3 dagen
> **Risico:** Gemiddeld tot hoog
> **Tests:** Uitgebreide testsuite vereist
> **Complexiteit:** Gemiddeld-Hoog

---

## 📋 Voorbeeld 1: E-mail Notificaties

### User Story

> Als **nieuwe gebruiker** wil ik **een bevestigingsmail ontvangen** zodat **ik mijn e-mailadres kan verifiëren en mijn account kan activeren**.

### Achtergrond

Na registratie moet de gebruiker zijn e-mailadres bevestigen voordat hij de applicatie volledig kan gebruiken. Dit verhoogt de beveiliging en vermindert spam-registraties.

### Technische Architectuur

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│   E-mail    │
│   Register  │     │   API       │     │   Service   │
└─────────────┘     └──────┬──────┘     └──────┬──────┘
                           │                    │
                           ▼                    ▼
                    ┌─────────────┐     ┌─────────────┐
                    │  Database   │     │   SMTP/SES  │
                    │  (Token)    │     │             │
                    └─────────────┘     └─────────────┘
```

### E-mail Template

```html
<!-- templates/email/confirm-registration.html -->
<h1>Welkom bij {{appName}}!</h1>
<p>Klik op de knop om je e-mail te bevestigen:</p>
<a href="{{confirmUrl}}" class="button">E-mail Bevestigen</a>
<p><small>Link geldig voor 24 uur.</small></p>
```

### API Endpoints

| Endpoint                        | Methode | Beschrijving                      |
| ------------------------------- | ------- | --------------------------------- |
| `/api/auth/register`            | POST    | Maak gebruiker + verstuur e-mail  |
| `/api/auth/confirm/{token}`     | GET     | Valideer token + activeer account |
| `/api/auth/resend-confirmation` | POST    | Verstuur e-mail opnieuw           |

### Acceptatiecriteria

- [ ] Maak e-mail template (HTML + platte tekst fallback)
- [ ] Token-gebaseerde activatielink met 64-teken willekeurige string
- [ ] Sla token op in Redis/DB met 24-uur TTL
- [ ] Foutpagina voor ongeldige of verlopen token
- [ ] Opnieuw versturen knop op loginpagina (alleen als niet geactiveerd)
- [ ] Rate limiting: Max 3 keer opnieuw versturen per uur
- [ ] E-mail logging voor debugging

### Beveiligingsaspecten

- [ ] Token is cryptografisch veilig
- [ ] Token wordt na gebruik ongeldig gemaakt
- [ ] Brute-force bescherming op confirm endpoint

---

## 📋 Voorbeeld 2: Full-Text Zoeken met Highlighting

### User Story

> Als **gebruiker** wil ik **artikelen doorzoeken en gemarkeerde overeenkomsten zien** zodat **ik snel relevante informatie kan vinden**.

### Technische Oplossing

```typescript
// Zoeken met highlighting
const searchArticles = async (query: string) => {
  const response = await fetch(`/api/articles/search?q=${encodeURIComponent(query)}`);
  return response.json();
};

// Response formaat
interface SearchResult {
  id: string;
  title: string;
  titleHighlighted: string;  // Met <mark>...</mark> tags
  excerpt: string;
  excerptHighlighted: string;
  score: number;
}
```

### Acceptatiecriteria

- [ ] Zoekveld met debounce (300ms tussen invoer)
- [ ] Zoeken in titel en beschrijving
- [ ] Highlighting van zoektermen met `<mark>` tags
- [ ] Minimaal 2 tekens vereist voor zoeken
- [ ] Lege status weergave bij 0 resultaten
- [ ] "Meer laden" knop voor > 20 resultaten
- [ ] Prestatie: < 200ms voor 10.000+ artikelen (index vereist)

---

## 📋 Voorbeeld 3: Reactiesysteem

### User Story

> Als **bloglezer** wil ik **reacties schrijven en op anderen reageren** zodat **ik kan deelnemen aan de discussie**.

### Datamodel

```typescript
interface Comment {
  id: string;
  postId: string;
  parentId: string | null;  // null = top-level reactie
  authorId: string;
  authorName: string;
  content: string;          // max 1000 tekens
  createdAt: Date;
  updatedAt: Date | null;
  isDeleted: boolean;
}
```

### UI Structuur

```
┌─────────────────────────────────────────────────┐
│ 💬 3 Reacties                                    │
├─────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────┐ │
│ │ 👤 Jan Jansen · 2 uur geleden              │ │
│ │ "Geweldig artikel! Bedankt voor de tips."  │ │
│ │ [Reageren] [Bewerken] [Verwijderen]        │ │
│ │                                             │ │
│ │   ┌─────────────────────────────────────┐   │ │
│ │   │ 👤 Marie V. · 1 uur geleden        │   │ │
│ │   │ "Eens, erg nuttig!"                │   │ │
│ │   │ [Reageren]                          │   │ │
│ │   └─────────────────────────────────────┘   │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### Acceptatiecriteria

- [ ] Schrijf reactie (max 1000 tekens, tekenteller)
- [ ] Geneste reacties (1 niveau diep)
- [ ] Eigen reacties bewerken (met "bewerkt" badge)
- [ ] Eigen reacties verwijderen (soft delete, toont "[verwijderd]")
- [ ] Relatieve tijdstempels ("5 minuten geleden", "gisteren")
- [ ] Avatar + auteursnaam
- [ ] Real-time updates optioneel (WebSocket voor live reacties)

---

## ✅ Waarom 8 Punten?

| Criterium    | Beoordeling                           |
| ------------ | ------------------------------------- |
| Architectuur | Meerdere systemen geïntegreerd        |
| Complexiteit | Frontend + Backend + externe services |
| Beveiliging  | Beveiligingsaspecten te overwegen     |
| Tests        | Uitgebreide testsuite nodig           |
| Risico       | Verhoogd risico door afhankelijkheden |
