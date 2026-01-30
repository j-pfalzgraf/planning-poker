# 3 Story Points – Kleine tot Middelgrote Wijzigingen

> **Inspanning:** 0,5–1 dag
> **Risico:** Matig
> **Tests:** Unit en integratie tests aanbevolen

---

## Voorbeeld 1: Filterbare Lijst

**Titel:** Takenlijst Filteren op Status

**Beschrijving:**
De takenlijst moet filterbaar zijn op status (Open, In Uitvoering, Voltooid). Filterknoppen boven de lijst.

**Acceptatiecriteria:**

- [ ] Filterknoppen voor elke status
- [ ] "Alle" optie
- [ ] URL parameter voor filter (`?status=open`)
- [ ] Lege status weergave bij 0 resultaten

---

## Voorbeeld 2: Formulier met Validatie

**Titel:** Registratieformulier met Real-Time Validatie

**Beschrijving:**
Velden: E-mail, Wachtwoord, Wachtwoord bevestiging. Validatie bij blur en submit.

**Acceptatiecriteria:**

- [ ] Valideer e-mail formaat
- [ ] Wachtwoord minimaal 8 tekens
- [ ] Wachtwoorden moeten overeenkomen
- [ ] Toon fouten inline

---

## Voorbeeld 3: Eenvoudige Drag & Drop Sortering

**Titel:** Taken Herschikken via Drag & Drop

**Beschrijving:**
Taken in een lijst moeten via drag & drop herschikbaar zijn. Nieuwe volgorde wordt opgeslagen.

**Acceptatiecriteria:**

- [ ] Sleephandvat bij elke taak
- [ ] Visuele preview tijdens slepen
- [ ] Opslaan na loslaten
- [ ] Touch ondersteuning

---

## Waarom 3 Punten?

- Meerdere states te beheren
- UI en logica wijzigingen
- Matige complexiteit
- Mogelijke edge cases
