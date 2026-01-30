# 40 Story Points – Epische Wijzigingen

> **Inspanning:** 2–4 weken
> **Risico:** Zeer hoog
> **Tests:** Volledige regressie + prestatietests
> ⚠️ **Aanbeveling:** Opdelen in kleinere stories!

---

## Voorbeeld 1: Real-Time Samenwerking

**Titel:** Gelijktijdig Document Bewerken

**Beschrijving:**
Meerdere gebruikers kunnen hetzelfde document tegelijk bewerken. Wijzigingen worden real-time gesynchroniseerd (Google Docs stijl).

**Acceptatiecriteria:**

- [ ] Operational Transformation of CRDT
- [ ] WebSocket-gebaseerde synchronisatie
- [ ] Cursorpositie van andere gebruikers zichtbaar
- [ ] Conflictresolutie
- [ ] Offline ondersteuning met sync
- [ ] Versiegeschiedenis
- [ ] Prestatie met 10+ gelijktijdige gebruikers

---

## Voorbeeld 2: Workflow Engine

**Titel:** Configureerbare Goedkeuringsworkflow

**Beschrijving:**
Admins kunnen goedkeuringsworkflows definiëren: stappen, voorwaarden, escalaties, notificaties.

**Acceptatiecriteria:**

- [ ] Visuele workflow editor
- [ ] Stappen: Goedkeuring, Voorwaarde, Actie
- [ ] Rolgebaseerde goedkeurders
- [ ] Escalatie bij timeout
- [ ] E-mail en in-app notificaties
- [ ] Audit trail
- [ ] Parallelle en sequentiële paden

---

## Voorbeeld 3: Rapportagemodule

**Titel:** Custom Rapportsysteem

**Beschrijving:**
Gebruikers kunnen aangepaste rapporten maken: selecteer databronnen, stel filters in, kies visualisatie, exporteer als PDF/Excel.

**Acceptatiecriteria:**

- [ ] Rapportbouwer UI
- [ ] Databron selectie
- [ ] Filters en groepering
- [ ] Grafiektypen: Staaf, Lijn, Taart, Tabel
- [ ] Opslaanbare rapporten
- [ ] Geplande uitvoering
- [ ] Export: PDF, Excel, CSV
- [ ] Permissies per rapport

---

## Waarom 40 Punten?

- Meerdere weken ontwikkeltijd
- Zeer complexe architectuur
- Veel afhankelijkheden
- Hoog risico
- **Moet worden opgedeeld in kleinere stories!**
