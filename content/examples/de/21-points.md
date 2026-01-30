# 21 Story Points – Sehr große Änderungen

> **Aufwand:** 1–2 Wochen
> **Risiko:** Hoch
> **Tests:** Umfassende Testsuite + QA-Review

---

## Beispiel 1: Rollenbasierte Berechtigungen

**Titel:** Rollen- und Berechtigungssystem implementieren

**Beschreibung:**
Einführung von Rollen (Admin, Manager, Nutzer) mit granularen Berechtigungen. UI-Elemente und API-Endpoints werden entsprechend geschützt.

**Akzeptanzkriterien:**

- [ ] Rollen: Admin, Manager, Nutzer, Gast
- [ ] Berechtigungen pro Feature (CRUD)
- [ ] Admin-UI für Rollenverwaltung
- [ ] Frontend: Bedingte Anzeige von Elementen
- [ ] Backend: Middleware für Autorisierung
- [ ] Audit-Log für Berechtigungsänderungen
- [ ] Migration bestehender Nutzer

---

## Beispiel 2: Mandantenfähigkeit

**Titel:** Multi-Tenant-Unterstützung einführen

**Beschreibung:**
Die Anwendung soll mehrere unabhängige Mandanten (Unternehmen) unterstützen. Strikte Datentrennung.

**Akzeptanzkriterien:**

- [ ] Mandanten-ID in allen relevanten Tabellen
- [ ] Subdomain- oder Header-basierte Mandantenerkennung
- [ ] Mandanten-Wechsler für Super-Admins
- [ ] Isolierte Daten pro Mandant
- [ ] Mandantenspezifische Konfiguration
- [ ] Migration bestehender Daten

---

## Beispiel 3: Internationalisierung (i18n)

**Titel:** Vollständige Mehrsprachigkeit (DE, EN, FR)

**Beschreibung:**
Die gesamte Anwendung soll in drei Sprachen verfügbar sein. Dynamischer Sprachwechsel ohne Neuladen.

**Akzeptanzkriterien:**

- [ ] Alle UI-Texte externalisiert
- [ ] Sprachdateien für DE, EN, FR
- [ ] Sprachwechsler im Header
- [ ] Sprache in Nutzereinstellungen speicherbar
- [ ] Datums- und Zahlenformate lokalisiert
- [ ] RTL-Unterstützung vorbereitet

---

## Warum 21 Punkte?

- Breite Änderungen im gesamten System
- Architekturauswirkungen
- Hohes Risiko für Regressionen
- Komplexe Migration
- Intensives Testen erforderlich
