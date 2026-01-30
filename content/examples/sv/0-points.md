# 0 Story Points – Triviala ändringar

> **Arbetsinsats:** Minimal, ofta under 15 minuter
> **Risk:** Nästan ingen
> **Tester:** Vanligtvis inte nödvändigt
> **Komplexitet:** Ingen

---

## 📋 Exempel 1: Aktivera funktionsflagga

### User Story

> Som **Produktägare** vill jag **aktivera Dark Mode-funktionen**, så att **våra användare kan börja använda den omedelbart**.

### Bakgrund

Dark Mode-funktionen är fullständigt implementerad och testad, men hölls tillbaka för den senaste releasen. Nu ska den aktiveras genom att ändra en funktionsflagga.

### Implementation

```json
// config/features.json
{
  "darkMode": true,  // ← Ändring: false → true
  "betaFeatures": false,
  "newCheckout": true
}
```

### Acceptanskriterier

- [ ] Sätt funktionsflaggan i `config/features.json` till `true`
- [ ] Skapa och merga PR
- [ ] Trigga deployment
- [ ] Testa Dark Mode i produktion

### Riskbedömning

| Aspekt     | Bedömning         |
| ---------- | ----------------- |
| Kodändring | 1 rad             |
| Tester     | Smoke-test        |
| Rollback   | Återställ flaggan |

---

## 📋 Exempel 2: Justera miljövariabel

### User Story

> Som **DevOps-ingenjör** vill jag **öka API-timeout**, så att **långsamma API-anrop inte längre misslyckas**.

### Kontext

Vissa API-anrop till en långsam tredjepartstjänst får timeout. Den nuvarande timeout på 5 sekunder ska ökas till 10 sekunder.

### Ändring

```bash
# .env.production
API_TIMEOUT=10000  # var: 5000
```

### Acceptanskriterier

- [ ] Sätt `API_TIMEOUT=10000` i `.env.production`
- [ ] Inga kodändringar krävs
- [ ] Omdeploya för att aktivera
- [ ] Övervaka timeout-fel

---

## 📋 Exempel 3: Rätta stavfel

### User Story

> Som **Användare** vill jag **se korrekt text i appen**, så att **produkten ser professionell ut**.

### Problem

Webbplatsens sidfot visar **"Kontkat"** istället för **"Kontakt"**.

### Lösning

```vue
<!-- app/components/Footer.vue -->
<template>
  <footer>
    <a href="/contact">Kontakt</a>  <!-- var: Kontkat -->
  </footer>
</template>
```

### Acceptanskriterier

- [ ] Rätta stavfelet i `Footer.vue`
- [ ] Kontrollera om samma fel finns på andra ställen
- [ ] Verifiera visuellt i webbläsaren

---

## ✅ Varför 0 poäng?

| Kriterium  | Bedömning                        |
| ---------- | -------------------------------- |
| Logik      | Ingen logik påverkas             |
| Isolering  | Atomär och isolerad              |
| Risk       | Nästan ingen                     |
| Tid        | Kan göras under ett möte         |
| Granskning | Minimal, nästan självförklarande |

> 💡 **Tips:** 0-poängs stories är utmärkta för onboarding av nya teammedlemmar eller som "uppvärmning" på morgonen.
