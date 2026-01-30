# 1 Story Point – Zeer Kleine Wijzigingen

> **Inspanning:** 1–2 uur
> **Risico:** Laag
> **Tests:** Smoke test aanbevolen
> **Complexiteit:** Minimaal

---

## 📋 Voorbeeld 1: Icoon Vervangen

### User Story

> Als **Gebruiker** wil ik **een modern opslaan-icoon zien**, zodat **de UI er hedendaagser uitziet**.

### Achtergrond

De "Opslaan" knop gebruikt momenteel een diskette-icoon (`floppy-disk`). Aangezien diskettes niet meer gangbaar zijn, moet dit worden vervangen door een vinkje-icoon.

### Technische Details

```text
Betrokken bestand: app/components/SaveButton.vue
Icoon Bibliotheek: @heroicons/vue
Oud Icoon: FloppyDiskIcon
Nieuw Icoon: CheckIcon
```

### Acceptatiecriteria

- [ ] Vervang icoon in `SaveButton.vue` van `FloppyDiskIcon` naar `CheckIcon`
- [ ] Update icoon import
- [ ] Grootte blijft `w-5 h-5`
- [ ] Visuele controle op desktop en mobiel
- [ ] Geen functionele wijzigingen

### Definition of Done

- [ ] Code review voltooid
- [ ] Getest in staging
- [ ] Screenshots gedocumenteerd in ticket

---

## 📋 Voorbeeld 2: Tooltip Toevoegen

### User Story

> Als **Klant** wil ik **begrijpen of de prijs inclusief BTW is**, zodat **ik geen verrassingen krijg bij het afrekenen**.

### Achtergrond

Het info-icoon (`ℹ`) naast het prijsveld moet een tooltip tonen met de tekst "Incl. BTW" bij hover. De tooltip component bestaat al in het project.

### Technische Details

```vue
<template>
  <Tooltip text="Incl. BTW">
    <InfoIcon class="w-4 h-4 text-gray-400 cursor-help" />
  </Tooltip>
</template>
```

### Acceptatiecriteria

- [ ] Gebruik tooltip component uit `@/components/ui/Tooltip.vue`
- [ ] Tekst: "Incl. BTW"
- [ ] Tooltip verschijnt bij hover en focus (toegankelijkheid)
- [ ] Vertraging: 200ms voor weergave
- [ ] Positie: midden boven

---

## 📋 Voorbeeld 3: CSS Aanpassing per Stijlgids

### User Story

> Als **Brand Manager** wil ik **de knopkleur aanpassen aan de nieuwe stijlgids**, zodat **alle producten er uniform uitzien**.

### Achtergrond

De primaire knop gebruikt `#0066cc`, volgens de nieuwe stijlgids moet dit `#0052a3` zijn.

### Technische Details

| Eigenschap  | Oud       | Nieuw     |
| ----------- | --------- | --------- |
| Achtergrond | `#0066cc` | `#0052a3` |
| Hover       | `#0055b3` | `#003d7a` |

**Bestand:** `tailwind.config.ts`

```typescript
primary: {
  500: '#0052a3', // was: #0066cc
  600: '#003d7a', // was: #0055b3
}
```

### Acceptatiecriteria

- [ ] Pas kleur aan in `tailwind.config.ts`
- [ ] Alle primaire knoppen worden beïnvloed (automatisch via token)
- [ ] Behoud WCAG AA contrastverhouding (min. 4.5:1)
- [ ] Geen functionele wijzigingen

---

## ✅ Waarom 1 Punt?

| Criterium | Beoordeling          |
| --------- | -------------------- |
| Scope     | Duidelijk afgebakend |
| Bestanden | 1–2 beïnvloed        |
| Logica    | Geen nieuwe logica   |
| Tests     | Visueel testbaar     |
| Risico    | Minimaal             |
