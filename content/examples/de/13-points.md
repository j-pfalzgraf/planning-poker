# 13 Story Points – Große Änderungen

> **Aufwand:** 3–5 Tage
> **Risiko:** Hoch
> **Tests:** Vollständige Testabdeckung erforderlich
> **Komplexität:** Hoch

---

## 📋 Beispiel 1: Mehrstufiger Onboarding-Wizard

### Epic

> Als **neuer Kunde** möchte ich **durch einen Einrichtungsprozess geführt werden**, damit **ich das System schnellstmöglich produktiv nutzen kann**.

### Hintergrund

Neue Kunden müssen derzeit alle Einstellungen selbst finden. Ein 4-stufiger Wizard soll sie durch die wichtigsten Schritte führen und die Time-to-Value reduzieren.

### Wizard-Ablauf

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Schritt 1 │───▶│   Schritt 2 │───▶│   Schritt 3 │───▶│   Schritt 4 │
│  Unternehmen│    │  Ansprech-  │    │   Zahlung   │    │  Zusammen-  │
│             │    │   partner   │    │             │    │   fassung   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      │                  │                  │                  │
      ▼                  ▼                  ▼                  ▼
   Validierung       Validierung       Validierung         Absenden
   speichern         speichern         speichern         aller Daten
```

### Schritt-Details

| Schritt              | Felder                        | Validierung                |
| -------------------- | ----------------------------- | -------------------------- |
| 1. Unternehmensdaten | Name, Adresse, USt-IdNr.      | Pflicht, USt-IdNr.-Format  |
| 2. Ansprechpartner   | Name, E-Mail, Telefon         | E-Mail-Format, Pflicht     |
| 3. Zahlungsmethode   | SEPA oder Kreditkarte         | IBAN-/Kartennummer-Prüfung |
| 4. Zusammenfassung   | Alle Daten (schreibgeschützt) | Bestätigung                |

### Technische Komponenten

```typescript
// Zustandsverwaltung
interface OnboardingState {
  currentStep: 1 | 2 | 3 | 4;
  company: CompanyData | null;
  contact: ContactData | null;
  payment: PaymentData | null;
  isDirty: boolean;
  errors: Record<string, string[]>;
}

// Zwischenspeicherung
const STORAGE_KEY = 'onboarding_draft';
localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
```

### Akzeptanzkriterien

- [ ] Fortschrittsanzeige zeigt aktuellen Schritt (1/4, 2/4, ...)
- [ ] Validierung pro Schritt bei Klick auf Weiter
- [ ] Zurück-Navigation ohne Datenverlust
- [ ] Auto-Speichern in LocalStorage alle 30s und bei Blur
- [ ] Warnung beim Verlassen der Seite mit ungespeicherten Daten
- [ ] Finale Zusammenfassung mit Bearbeitungslinks zu jedem Schritt
- [ ] Fehlerbehandlung beim Absenden (Retry-Logik)
- [ ] Mobil-optimiert (vertikaler Stepper)
- [ ] Tastaturnavigation (Tab, Enter)

### Testszenarien

1. **Happy Path:** Alle Schritte ausfüllen → Erfolgreich abgeschlossen
2. **Validierungsfehler:** Ungültige IBAN → Fehler anzeigen
3. **Abbruch:** Tab bei Schritt 2 schließen → Daten beim Wiedereröffnen wiederherstellen
4. **Netzwerkfehler:** Absenden schlägt fehl → Wiederholen-Button anzeigen

---

## 📋 Beispiel 2: Anpassbares Dashboard mit Widgets

### User Story

> Als **Power-User** möchte ich **mein Dashboard mit Widgets personalisieren**, damit **ich für mich wichtige Informationen auf einen Blick sehe**.

### Feature-Umfang

- **Widget-Bibliothek:** 8 vordefinierte Widgets
- **Drag & Drop:** Freie Positionierung
- **Größenänderung:** Anpassung per Handle
- **Persistenz:** Layout wird gespeichert

### Verfügbare Widgets

| Widget          | Größen        | Datenquelle              |
| --------------- | ------------- | ------------------------ |
| Umsatz-Chart    | 1x1, 2x1, 2x2 | `/api/stats/revenue`     |
| Letzte Bestell. | 1x2, 2x2      | `/api/orders?limit=10`   |
| Aufgabenliste   | 1x1, 1x2      | `/api/tasks?status=open` |
| KPI-Kacheln     | 1x1, 2x1      | `/api/stats/kpis`        |
| Kalender        | 2x2           | `/api/events`            |
| Team-Aktivität  | 1x2           | `/api/activity`          |
| Schnellaktionen | 1x1           | statisch                 |
| Notizen         | 1x1, 1x2      | `/api/notes`             |

### Raster-System

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

### Akzeptanzkriterien

- [ ] Widget-Bibliothek mit Vorschaukarten
- [ ] Drag & Drop zur Positionierung (react-grid-layout oder vue-grid-layout)
- [ ] Größenänderung über Eck-Handles
- [ ] Kollisionserkennung (Widgets überlappen nicht)
- [ ] Layout wird in DB gespeichert (debounced, 500ms nach Änderung)
- [ ] Auf Standard-Layout zurücksetzen (Button + Bestätigung)
- [ ] Responsiv: Raster passt sich dem Viewport an
- [ ] Lade-Skeleton für jedes Widget

---

## 📋 Beispiel 3: In-App Benachrichtigungszentrale

### User Story

> Als **Nutzer** möchte ich **alle relevanten Benachrichtigungen an einem Ort sehen**, damit **ich nichts Wichtiges verpasse**.

### Komponenten-Architektur

```
┌─────────────────────────────────────────────────┐
│                    Header                        │
│  Logo   Nav   Nav   Nav   [🔔 3]   Avatar       │
└─────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │  Benachrichtigungs- │
                    │  Dropdown           │
                    │  ┌───────────────┐  │
                    │  │ Neue Bestellung│  │
                    │  │ vor 2 Min.    │  │
                    │  ├───────────────┤  │
                    │  │ Aufgabe fertig│  │
                    │  │ vor 1 Stunde  │  │
                    │  └───────────────┘  │
                    │  [Alle als gelesen] │
                    │  [Alle anzeigen →]  │
                    └─────────────────────┘
```

### Datenmodell

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

### Akzeptanzkriterien

- [ ] Glocken-Icon mit Badge (Ungelesen-Zähler, max. 99+)
- [ ] Dropdown mit letzten 10 Benachrichtigungen
- [ ] Als gelesen markieren (einzeln oder alle)
- [ ] Klick auf Benachrichtigung → Navigation zur relevanten Seite
- [ ] Echtzeit-Updates via WebSocket
- [ ] Persistenz in Datenbank
- [ ] Ton bei neuer Benachrichtigung (optional, konfigurierbar)
- [ ] „Alle Benachrichtigungen"-Seite mit Paginierung und Filterung

---

## ✅ Warum 13 Punkte?

| Kriterium   | Bewertung                     |
| ----------- | ----------------------------- |
| Architektur | Mehrere Systeme integriert    |
| Zustand     | Komplexe Zustandsverwaltung   |
| Komponenten | 10+ neue/geänderte Dateien    |
| Persistenz  | Datenbank + API-Endpoints     |
| Tests       | Hoher Testaufwand             |
| Risiko      | Randfälle und Fehlerszenarien |
