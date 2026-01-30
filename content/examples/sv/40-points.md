# 40 Story Points – Episka ändringar

> **Arbetsinsats:** 2–4 veckor
> **Risk:** Mycket hög
> **Tester:** Full regression + prestandatester
> ⚠️ **Rekommendation:** Dela upp i mindre stories!

---

## Exempel 1: Realtidssamarbete

**Titel:** Samtidig dokumentredigering

**Beskrivning:**
Flera användare kan redigera samma dokument samtidigt. Ändringar synkroniseras i realtid (Google Docs-stil).

**Acceptanskriterier:**

- [ ] Operational Transformation eller CRDT
- [ ] WebSocket-baserad synkronisering
- [ ] Markörposition för andra användare synlig
- [ ] Konfliktlösning
- [ ] Offline-stöd med synk
- [ ] Versionshistorik
- [ ] Prestanda med 10+ samtidiga användare

---

## Exempel 2: Arbetsflödesmotor

**Titel:** Konfigurerbart godkännandearbetsflöde

**Beskrivning:**
Administratörer kan definiera godkännandearbetsflöden: steg, villkor, eskaleringar, notifikationer.

**Acceptanskriterier:**

- [ ] Visuell arbetsflödeseditor
- [ ] Steg: Godkännande, Villkor, Åtgärd
- [ ] Rollbaserade godkännare
- [ ] Eskalering vid timeout
- [ ] E-post och in-app-notifikationer
- [ ] Granskningslogg
- [ ] Parallella och sekventiella vägar

---

## Exempel 3: Rapporteringsmodul

**Titel:** Anpassat rapportsystem

**Beskrivning:**
Användare kan skapa anpassade rapporter: välja datakällor, ställa in filter, välja visualisering, exportera som PDF/Excel.

**Acceptanskriterier:**

- [ ] Rapportbyggar-UI
- [ ] Val av datakälla
- [ ] Filter och gruppering
- [ ] Diagramtyper: Stapel, Linje, Cirkel, Tabell
- [ ] Sparade rapporter
- [ ] Schemalagd körning
- [ ] Export: PDF, Excel, CSV
- [ ] Behörigheter per rapport

---

## Varför 40 poäng?

- Flera veckors utvecklingstid
- Mycket komplex arkitektur
- Många beroenden
- Hög risk
- **Bör delas upp i mindre stories!**
