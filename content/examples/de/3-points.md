# 3 Story Points – Kleine bis mittlere Änderungen

> **Aufwand:** 0,5–1 Tag
> **Risiko:** Moderat
> **Tests:** Unit- und Integrationstests empfohlen

---

## Beispiel 1: Filterbare Liste

**Titel:** Aufgabenliste nach Status filtern

**Beschreibung:**
Die Aufgabenliste soll nach Status filterbar sein (Offen, In Bearbeitung, Abgeschlossen). Filter-Buttons oberhalb der Liste.

**Akzeptanzkriterien:**

- [ ] Filter-Buttons für jeden Status
- [ ] „Alle"-Option
- [ ] URL-Parameter für Filter (`?status=open`)
- [ ] Leerzustand-Anzeige bei 0 Ergebnissen

---

## Beispiel 2: Formular mit Validierung

**Titel:** Registrierungsformular mit Echtzeit-Validierung

**Beschreibung:**
Felder: E-Mail, Passwort, Passwortbestätigung. Validierung bei Blur und Submit.

**Akzeptanzkriterien:**

- [ ] E-Mail-Format validieren
- [ ] Passwort mindestens 8 Zeichen
- [ ] Passwörter müssen übereinstimmen
- [ ] Fehler inline anzeigen

---

## Beispiel 3: Einfache Drag & Drop-Sortierung

**Titel:** Aufgaben per Drag & Drop umsortieren

**Beschreibung:**
Aufgaben in einer Liste sollen per Drag & Drop umsortiert werden können. Neue Reihenfolge wird gespeichert.

**Akzeptanzkriterien:**

- [ ] Drag-Handle an jeder Aufgabe
- [ ] Visuelle Vorschau beim Ziehen
- [ ] Speichern nach dem Ablegen
- [ ] Touch-Unterstützung

---

## Warum 3 Punkte?

- Mehrere Zustände zu verwalten
- UI- und Logik-Änderungen
- Mittlere Komplexität
- Mögliche Randfälle
