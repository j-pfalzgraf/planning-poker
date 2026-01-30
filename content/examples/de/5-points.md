# 5 Story Points – Mittlere Änderungen

> **Aufwand:** 1–2 Tage
> **Risiko:** Moderat
> **Tests:** Unit-, Integrations- und E2E-Tests empfohlen
> **Komplexität:** Mittel

---

## 📋 Beispiel 1: CSV-Export für Bestellungen

### User Story

> Als **Shop-Administrator** möchte ich **alle angezeigten Bestellungen als CSV exportieren**, damit **ich die Daten in Excel weiterverarbeiten kann**.

### Hintergrund

Die Bestellübersicht zeigt aktuell bis zu 100 Bestellungen an. Ein neuer Export-Button soll diese als CSV-Datei herunterladen. Aktive Filter sollen berücksichtigt werden.

### Technische Architektur

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   ExportButton  │────▶│   OrderService  │────▶│   CSV-Generator │
│   (Frontend)    │     │   (API-Aufruf)  │     │   (Backend)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                                               │
         │◀──────────────── Blob-Download ◀──────────────┘
```

### API-Spezifikation

```http
GET /api/orders/export?status=pending&from=2024-01-01
Accept: text/csv

Response:
Content-Type: text/csv; charset=utf-8
Content-Disposition: attachment; filename="bestellungen-2024-01-15.csv"
```

### CSV-Format

```csv
BestellNr;Datum;Kunde;Artikel;Gesamt
ORD-2024-001;15.01.2024;Max Mustermann;3;149,99 €
ORD-2024-002;15.01.2024;Erika Musterfrau;1;29,99 €
```

### Akzeptanzkriterien

- [ ] Button „Als CSV exportieren" oben rechts in der Bestellübersicht
- [ ] Spalten: Bestellnr., Datum, Kunde, Anzahl Artikel, Gesamtsumme
- [ ] Deutsche Formatierung (Datum: TT.MM.JJJJ, Zahlen: 1.234,56)
- [ ] UTF-8 mit BOM für Excel-Kompatibilität
- [ ] Dateiname: `bestellungen-JJJJ-MM-TT.csv`
- [ ] Lade-Spinner während der Generierung
- [ ] Fehlerbehandlung bei > 10.000 Zeilen

### Testszenarien

1. **Happy Path:** 50 Bestellungen exportieren → CSV korrekt
2. **Leerer Export:** Keine Bestellungen → Info-Meldung anzeigen
3. **Große Datenmenge:** 5.000 Bestellungen → Performance < 3s
4. **Sonderzeichen:** Kundennamen mit Umlauten → korrekt in Excel

---

## 📋 Beispiel 2: Server-seitige Paginierung

### User Story

> Als **Nutzer** möchte ich **durch große Listen navigieren**, damit **die Seite schnell lädt und übersichtlich bleibt**.

### Hintergrund

Die Produktliste lädt aktuell alle 5.000+ Artikel auf einmal, was zu langen Ladezeiten führt. Server-seitige Paginierung mit 20 Elementen pro Seite soll implementiert werden.

### API-Änderungen

```typescript
// Neuer Endpoint
GET /api/articles?page=1&limit=20&sort=name:asc

// Response
{
  "data": [...],
  "meta": {
    "total": 5432,
    "page": 1,
    "limit": 20,
    "totalPages": 272
  }
}
```

### UI-Komponente

```
┌────────────────────────────────────────────────┐
│  ◀ Zurück   1  2  3  ...  271  272   Weiter ▶  │
│             Zeige 1-20 von 5.432 Elementen     │
└────────────────────────────────────────────────┘
```

### Akzeptanzkriterien

- [ ] Backend: Endpoint mit `page`, `limit`, `sort` Parametern
- [ ] Frontend: Paginierungs-Komponente mit Seitenzahlen
- [ ] URL-Sync: `?page=2` wird in URL reflektiert
- [ ] Deep Link: Direkter Zugriff auf Seite 5 funktioniert
- [ ] Ladezustand während Seitenwechsel (Skeleton)
- [ ] Sprung zu Seite 1 bei Filteränderung
- [ ] Mobil: Vereinfachte Paginierung (nur Zurück/Weiter)

---

## 📋 Beispiel 3: Profilbild-Upload

### User Story

> Als **registrierter Nutzer** möchte ich **ein Profilbild hochladen**, damit **mein Profil persönlicher wirkt**.

### Akzeptanzkriterien

- [ ] Drag & Drop oder Dateiauswahl
- [ ] Erlaubte Formate: JPG, PNG, WebP
- [ ] Maximale Größe: 5 MB
- [ ] Vorschau vor dem Upload (Zuschnitt-Option)
- [ ] Fortschrittsanzeige während des Uploads
- [ ] Server-seitig: Größenanpassung auf max. 400x400px
- [ ] Altes Bild wird automatisch gelöscht
- [ ] Fallback: Initialen-Avatar wenn kein Bild vorhanden

### Fehlerbehandlung

| Fehler                | Meldung                                          |
| --------------------- | ------------------------------------------------ |
| Falsches Format       | „Nur JPG, PNG oder WebP erlaubt"                 |
| Zu groß               | „Das Bild darf maximal 5 MB groß sein"           |
| Upload fehlgeschlagen | „Upload fehlgeschlagen. Bitte erneut versuchen." |

---

## ✅ Warum 5 Punkte?

| Kriterium   | Bewertung                  |
| ----------- | -------------------------- |
| Architektur | Frontend + Backend         |
| Komponenten | 3–5 neue/geänderte Dateien |
| Logik       | Mittlere Komplexität       |
| Tests       | Unit + Integration nötig   |
| Risiko      | Überschaubar               |
