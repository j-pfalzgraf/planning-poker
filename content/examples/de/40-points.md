# 40 Story Points – Epische Änderungen

> **Aufwand:** 2–4 Wochen
> **Risiko:** Sehr hoch
> **Tests:** Vollständige Regression + Performance-Tests
> ⚠️ **Empfehlung:** In kleinere Stories aufteilen!

---

## Beispiel 1: Echtzeit-Zusammenarbeit

**Titel:** Simultane Dokumentenbearbeitung

**Beschreibung:**
Mehrere Nutzer können dasselbe Dokument gleichzeitig bearbeiten. Änderungen werden in Echtzeit synchronisiert (Google-Docs-Stil).

**Akzeptanzkriterien:**

- [ ] Operational Transformation oder CRDT
- [ ] WebSocket-basierte Synchronisation
- [ ] Cursorposition anderer Nutzer sichtbar
- [ ] Konfliktauflösung
- [ ] Offline-Unterstützung mit Sync
- [ ] Versionshistorie
- [ ] Performance mit 10+ gleichzeitigen Nutzern

---

## Beispiel 2: Workflow-Engine

**Titel:** Konfigurierbarer Freigabe-Workflow

**Beschreibung:**
Admins können Freigabe-Workflows definieren: Schritte, Bedingungen, Eskalationen, Benachrichtigungen.

**Akzeptanzkriterien:**

- [ ] Visueller Workflow-Editor
- [ ] Schritte: Freigabe, Bedingung, Aktion
- [ ] Rollenbasierte Genehmiger
- [ ] Eskalation bei Timeout
- [ ] E-Mail- und In-App-Benachrichtigungen
- [ ] Audit-Trail
- [ ] Parallele und sequentielle Pfade

---

## Beispiel 3: Berichtsmodul

**Titel:** Benutzerdefiniertes Berichtssystem

**Beschreibung:**
Nutzer können eigene Berichte erstellen: Datenquellen auswählen, Filter setzen, Visualisierung wählen, als PDF/Excel exportieren.

**Akzeptanzkriterien:**

- [ ] Report-Builder-UI
- [ ] Datenquellen-Auswahl
- [ ] Filter und Gruppierung
- [ ] Diagrammtypen: Balken, Linie, Kreis, Tabelle
- [ ] Speicherbare Berichte
- [ ] Geplante Ausführung
- [ ] Export: PDF, Excel, CSV
- [ ] Berechtigungen pro Bericht

---

## Warum 40 Punkte?

- Mehrere Wochen Entwicklungszeit
- Hochkomplexe Architektur
- Viele Abhängigkeiten
- Hohes Risiko
- **Sollte in kleinere Stories aufgeteilt werden!**
