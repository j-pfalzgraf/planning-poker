# 0 Story Points – Triviale Wijzigingen

> **Inspanning:** Minimaal, vaak minder dan 15 minuten
> **Risico:** Vrijwel geen
> **Tests:** Meestal niet nodig
> **Complexiteit:** Geen

---

## 📋 Voorbeeld 1: Feature Flag Inschakelen

### User Story

> Als **Product Owner** wil ik **de Donkere Modus functie inschakelen**, zodat **onze gebruikers deze direct kunnen gebruiken**.

### Achtergrond

De Donkere Modus functie is volledig geïmplementeerd en getest, maar werd achtergehouden voor de laatste release. Nu moet deze worden geactiveerd door een feature flag te wijzigen.

### Implementatie

```json
// config/features.json
{
  "darkMode": true,  // ← Wijziging: false → true
  "betaFeatures": false,
  "newCheckout": true
}
```

### Acceptatiecriteria

- [ ] Zet feature flag in `config/features.json` op `true`
- [ ] Maak en merge PR
- [ ] Start deployment
- [ ] Test Donkere Modus in productie

### Risicobeoordeling

| Aspect        | Beoordeling        |
| ------------- | ------------------ |
| Codewijziging | 1 regel            |
| Tests         | Smoke test         |
| Rollback      | Reset feature flag |

---

## 📋 Voorbeeld 2: Omgevingsvariabele Aanpassen

### User Story

> Als **DevOps Engineer** wil ik **de API timeout verhogen**, zodat **langzame API requests niet meer falen**.

### Context

Sommige API-aanroepen naar een langzame externe dienst krijgen timeouts. De huidige timeout van 5 seconden moet worden verhoogd naar 10 seconden.

### Wijziging

```bash
# .env.production
API_TIMEOUT=10000  # was: 5000
```

### Acceptatiecriteria

- [ ] Zet `API_TIMEOUT=10000` in `.env.production`
- [ ] Geen codewijzigingen nodig
- [ ] Opnieuw deployen om te activeren
- [ ] Monitor op timeout-fouten

---

## 📋 Voorbeeld 3: Typfout Herstellen

### User Story

> Als **Gebruiker** wil ik **correcte tekst zien in de app**, zodat **het product er professioneel uitziet**.

### Probleem

De website footer toont **"Contcat"** in plaats van **"Contact"**.

### Oplossing

```vue
<!-- app/components/Footer.vue -->
<template>
  <footer>
    <a href="/contact">Contact</a>  <!-- was: Contcat -->
  </footer>
</template>
```

### Acceptatiecriteria

- [ ] Herstel typfout in `Footer.vue`
- [ ] Controleer op dezelfde fout op andere plaatsen
- [ ] Visueel verifiëren in browser

---

## ✅ Waarom 0 Punten?

| Criterium | Beoordeling                     |
| --------- | ------------------------------- |
| Logica    | Geen logica beïnvloed           |
| Isolatie  | Atomair en geïsoleerd           |
| Risico    | Vrijwel geen                    |
| Tijd      | Kan tijdens een meeting         |
| Review    | Minimaal, bijna vanzelfsprekend |

> 💡 **Tip:** 0-punten stories zijn geweldig voor het inwerken van nieuwe teamleden of als "opwarmer" in de ochtend.
