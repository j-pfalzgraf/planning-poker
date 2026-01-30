# 8 Story Points – Größere Änderungen

> **Aufwand:** 2–3 Tage
> **Risiko:** Mittel bis hoch
> **Tests:** Umfassende Testsuite erforderlich
> **Komplexität:** Mittel-Hoch

---

## 📋 Beispiel 1: E-Mail-Benachrichtigungen

### User Story

> Als **neuer Nutzer** möchte ich **eine Bestätigungs-E-Mail erhalten**, damit **ich meine E-Mail-Adresse verifizieren und mein Konto aktivieren kann**.

### Hintergrund

Nach der Registrierung muss der Nutzer seine E-Mail-Adresse bestätigen, bevor er die Anwendung vollständig nutzen kann. Dies erhöht die Sicherheit und reduziert Spam-Registrierungen.

### Technische Architektur

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│   E-Mail    │
│   Registr.  │     │   API       │     │   Service   │
└─────────────┘     └──────┬──────┘     └──────┬──────┘
                           │                    │
                           ▼                    ▼
                    ┌─────────────┐     ┌─────────────┐
                    │  Datenbank  │     │   SMTP/SES  │
                    │  (Token)    │     │             │
                    └─────────────┘     └─────────────┘
```

### E-Mail-Template

```html
<!-- templates/email/confirm-registration.html -->
<h1>Willkommen bei {{appName}}!</h1>
<p>Klicken Sie auf den Button, um Ihre E-Mail zu bestätigen:</p>
<a href="{{confirmUrl}}" class="button">E-Mail bestätigen</a>
<p><small>Link gültig für 24 Stunden.</small></p>
```

### API-Endpoints

| Endpoint                        | Methode | Beschreibung                        |
| ------------------------------- | ------- | ----------------------------------- |
| `/api/auth/register`            | POST    | Nutzer erstellen + E-Mail senden    |
| `/api/auth/confirm/{token}`     | GET     | Token validieren + Konto aktivieren |
| `/api/auth/resend-confirmation` | POST    | E-Mail erneut senden                |

### Akzeptanzkriterien

- [ ] E-Mail-Template erstellen (HTML + Plain-Text-Fallback)
- [ ] Token-basierter Aktivierungslink mit 64-Zeichen-Zufallsstring
- [ ] Token in Redis/DB speichern mit 24-Stunden-TTL
- [ ] Fehlerseite für ungültigen oder abgelaufenen Token
- [ ] Erneut-Senden-Button auf Login-Seite (nur wenn nicht aktiviert)
- [ ] Rate-Limiting: Max. 3 erneute Sendungen pro Stunde
- [ ] E-Mail-Logging für Debugging

### Sicherheitsaspekte

- [ ] Token ist kryptografisch sicher
- [ ] Token wird nach Verwendung ungültig
- [ ] Brute-Force-Schutz am Confirm-Endpoint

---

## 📋 Beispiel 2: Volltextsuche mit Hervorhebung

### User Story

> Als **Nutzer** möchte ich **Artikel durchsuchen und hervorgehobene Treffer sehen**, damit **ich relevante Informationen schnell finden kann**.

### Technische Lösung

```typescript
// Suche mit Hervorhebung
const searchArticles = async (query: string) => {
  const response = await fetch(`/api/articles/search?q=${encodeURIComponent(query)}`);
  return response.json();
};

// Response-Format
interface SearchResult {
  id: string;
  title: string;
  titleHighlighted: string;  // Mit <mark>...</mark> Tags
  excerpt: string;
  excerptHighlighted: string;
  score: number;
}
```

### Akzeptanzkriterien

- [ ] Suchfeld mit Debounce (300ms zwischen Eingaben)
- [ ] Suche in Titel und Beschreibung
- [ ] Hervorhebung der Suchbegriffe mit `<mark>` Tags
- [ ] Mindestens 2 Zeichen für Suche erforderlich
- [ ] Leerzustand-Anzeige bei 0 Ergebnissen
- [ ] „Mehr laden"-Button bei > 20 Ergebnissen
- [ ] Performance: < 200ms für 10.000+ Artikel (Index erforderlich)

---

## 📋 Beispiel 3: Kommentarsystem

### User Story

> Als **Blog-Leser** möchte ich **Kommentare schreiben und anderen antworten**, damit **ich an der Diskussion teilnehmen kann**.

### Datenmodell

```typescript
interface Comment {
  id: string;
  postId: string;
  parentId: string | null;  // null = Top-Level-Kommentar
  authorId: string;
  authorName: string;
  content: string;          // max. 1000 Zeichen
  createdAt: Date;
  updatedAt: Date | null;
  isDeleted: boolean;
}
```

### UI-Struktur

```
┌─────────────────────────────────────────────────┐
│ 💬 3 Kommentare                                  │
├─────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────┐ │
│ │ 👤 Max Mustermann · vor 2 Stunden          │ │
│ │ „Toller Artikel! Danke für die Tipps."     │ │
│ │ [Antworten] [Bearbeiten] [Löschen]         │ │
│ │                                             │ │
│ │   ┌─────────────────────────────────────┐   │ │
│ │   │ 👤 Erika M. · vor 1 Stunde         │   │ │
│ │   │ „Stimme zu, sehr hilfreich!"       │   │ │
│ │   │ [Antworten]                         │   │ │
│ │   └─────────────────────────────────────┘   │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### Akzeptanzkriterien

- [ ] Kommentar schreiben (max. 1000 Zeichen, Zeichenzähler)
- [ ] Verschachtelte Antworten (1 Ebene tief)
- [ ] Eigene Kommentare bearbeiten (mit „bearbeitet"-Badge)
- [ ] Eigene Kommentare löschen (Soft Delete, zeigt „[gelöscht]")
- [ ] Relative Zeitstempel („vor 5 Minuten", „gestern")
- [ ] Avatar + Autorenname
- [ ] Echtzeit-Updates optional (WebSocket für Live-Kommentare)

---

## ✅ Warum 8 Punkte?

| Kriterium   | Bewertung                            |
| ----------- | ------------------------------------ |
| Architektur | Mehrere Systeme integriert           |
| Komplexität | Frontend + Backend + externe Dienste |
| Sicherheit  | Sicherheitsaspekte zu beachten       |
| Tests       | Umfassende Testsuite erforderlich    |
| Risiko      | Erhöhtes Risiko durch Abhängigkeiten |
