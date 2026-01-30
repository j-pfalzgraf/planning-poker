# 8 Story Point – Modifiche Grandi

> **Impegno:** 2–3 giorni
> **Rischio:** Da medio ad alto
> **Test:** Suite di test completa richiesta
> **Complessità:** Medio-Alta

---

## 📋 Esempio 1: Notifiche Email

### User Story

> Come **nuovo utente** voglio **ricevere un'email di conferma** così che **possa verificare il mio indirizzo email e attivare il mio account**.

### Contesto

Dopo la registrazione, l'utente deve confermare il proprio indirizzo email prima di poter utilizzare completamente l'applicazione. Questo aumenta la sicurezza e riduce le registrazioni spam.

### Architettura Tecnica

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│   Email     │
│   Register  │     │   API       │     │   Service   │
└─────────────┘     └──────┬──────┘     └──────┬──────┘
                           │                    │
                           ▼                    ▼
                    ┌─────────────┐     ┌─────────────┐
                    │  Database   │     │   SMTP/SES  │
                    │  (Token)    │     │             │
                    └─────────────┘     └─────────────┘
```

### Template Email

```html
<!-- templates/email/confirm-registration.html -->
<h1>Benvenuto su {{appName}}!</h1>
<p>Clicca il pulsante per confermare la tua email:</p>
<a href="{{confirmUrl}}" class="button">Conferma Email</a>
<p><small>Link valido per 24 ore.</small></p>
```

### Endpoint API

| Endpoint                        | Metodo | Descrizione                   |
| ------------------------------- | ------ | ----------------------------- |
| `/api/auth/register`            | POST   | Crea utente + invia email     |
| `/api/auth/confirm/{token}`     | GET    | Valida token + attiva account |
| `/api/auth/resend-confirmation` | POST   | Reinvia email                 |

### Criteri di Accettazione

- [ ] Creare template email (HTML + fallback testo semplice)
- [ ] Link di attivazione basato su token con stringa casuale di 64 caratteri
- [ ] Salvare token in Redis/DB con TTL di 24 ore
- [ ] Pagina di errore per token invalido o scaduto
- [ ] Pulsante di reinvio sulla pagina di login (solo se non attivato)
- [ ] Rate limiting: Max 3 reinvii all'ora
- [ ] Logging email per debug

### Aspetti di Sicurezza

- [ ] Il token è crittograficamente sicuro
- [ ] Il token viene invalidato dopo l'uso
- [ ] Protezione brute-force sull'endpoint di conferma

---

## 📋 Esempio 2: Ricerca Full-Text con Evidenziazione

### User Story

> Come **utente** voglio **cercare articoli e vedere le corrispondenze evidenziate** così che **possa trovare rapidamente informazioni rilevanti**.

### Soluzione Tecnica

```typescript
// Ricerca con evidenziazione
const searchArticles = async (query: string) => {
  const response = await fetch(`/api/articles/search?q=${encodeURIComponent(query)}`);
  return response.json();
};

// Formato risposta
interface SearchResult {
  id: string;
  title: string;
  titleHighlighted: string;  // Con tag <mark>...</mark>
  excerpt: string;
  excerptHighlighted: string;
  score: number;
}
```

### Criteri di Accettazione

- [ ] Campo di ricerca con debounce (300ms tra gli input)
- [ ] Ricerca in titolo e descrizione
- [ ] Evidenziazione dei termini di ricerca con tag `<mark>`
- [ ] Minimo 2 caratteri richiesti per la ricerca
- [ ] Visualizzazione stato vuoto quando 0 risultati
- [ ] Pulsante "Carica altro" per > 20 risultati
- [ ] Performance: < 200ms per 10.000+ articoli (indice richiesto)

---

## 📋 Esempio 3: Sistema di Commenti

### User Story

> Come **lettore del blog** voglio **scrivere commenti e rispondere agli altri** così che **possa partecipare alla discussione**.

### Modello Dati

```typescript
interface Comment {
  id: string;
  postId: string;
  parentId: string | null;  // null = commento principale
  authorId: string;
  authorName: string;
  content: string;          // max 1000 caratteri
  createdAt: Date;
  updatedAt: Date | null;
  isDeleted: boolean;
}
```

### Struttura UI

```
┌─────────────────────────────────────────────────┐
│ 💬 3 Commenti                                    │
├─────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────┐ │
│ │ 👤 Mario Rossi · 2 ore fa                   │ │
│ │ "Ottimo articolo! Grazie per i consigli."  │ │
│ │ [Rispondi] [Modifica] [Elimina]            │ │
│ │                                             │ │
│ │   ┌─────────────────────────────────────┐   │ │
│ │   │ 👤 Giulia B. · 1 ora fa             │   │ │
│ │   │ "D'accordo, molto utile!"           │   │ │
│ │   │ [Rispondi]                          │   │ │
│ │   └─────────────────────────────────────┘   │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### Criteri di Accettazione

- [ ] Scrivere commento (max 1000 caratteri, contatore caratteri)
- [ ] Risposte nidificate (1 livello di profondità)
- [ ] Modificare i propri commenti (con badge "modificato")
- [ ] Eliminare i propri commenti (soft delete, mostra "[eliminato]")
- [ ] Timestamp relativi ("5 minuti fa", "ieri")
- [ ] Avatar + nome autore
- [ ] Aggiornamenti in tempo reale opzionali (WebSocket per commenti live)

---

## ✅ Perché 8 Punti?

| Criterio     | Valutazione                          |
| ------------ | ------------------------------------ |
| Architettura | Più sistemi integrati                |
| Complessità  | Frontend + Backend + servizi esterni |
| Sicurezza    | Aspetti di sicurezza da considerare  |
| Test         | Suite di test completa necessaria    |
| Rischio      | Rischio aumentato per dipendenze     |
