# 2 Story Points – Kleine Änderungen

> **Aufwand:** Ein halber Tag
> **Risiko:** Gering bis moderat
> **Tests:** Unit-Tests empfohlen

---

## Beispiel 1: Neues Formularfeld

**Titel:** Optionales Telefonnummer-Feld im Kontaktformular

**Beschreibung:**
Ein optionales Eingabefeld für die Telefonnummer soll zum Kontaktformular hinzugefügt werden. Formatvalidierung für deutsche/internationale Nummern.

**Akzeptanzkriterien:**

- [ ] Neues `phone`-Feld im Formular
- [ ] Label: „Telefon (optional)"
- [ ] Validierung: Nur Ziffern, +, -, Leerzeichen erlaubt
- [ ] Feld wird ans Backend übermittelt

---

## Beispiel 2: Sortieroption hinzufügen

**Titel:** Produktliste nach Preis sortieren

**Beschreibung:**
Eine Sortieroption „Preis aufsteigend/absteigend" soll zur Produktübersicht hinzugefügt werden.

**Akzeptanzkriterien:**

- [ ] Dropdown mit Sortieroptionen
- [ ] Client-seitige Sortierung
- [ ] Aktive Sortierung visuell hervorgehoben

---

## Beispiel 3: Bestätigungsdialog

**Titel:** Bestätigungsdialog beim Löschen anzeigen

**Beschreibung:**
Vor dem Löschen eines Eintrags soll ein Modal erscheinen: „Sind Sie sicher, dass Sie löschen möchten?"

**Akzeptanzkriterien:**

- [ ] Modal mit „Ja" / „Abbrechen"
- [ ] Löschung nur bei Bestätigung
- [ ] Modal kann mit ESC geschlossen werden

---

## Warum 2 Punkte?

- Mehrere Komponenten betroffen
- Einfache Logik
- Überschaubarer Testaufwand
- Geringes Risiko für Seiteneffekte
