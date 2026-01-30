# 0 Story Points – Triviale Änderungen

> **Aufwand:** Minimal, oft unter 15 Minuten
> **Risiko:** Fast keines
> **Tests:** In der Regel nicht erforderlich
> **Komplexität:** Keine

---

## 📋 Beispiel 1: Feature-Flag aktivieren

### User Story

> Als **Product Owner** möchte ich **den Dark Mode aktivieren**, damit **unsere Nutzer ihn sofort verwenden können**.

### Hintergrund

Der Dark Mode ist vollständig implementiert und getestet, wurde aber für das letzte Release zurückgehalten. Jetzt soll er durch Ändern eines Feature-Flags aktiviert werden.

### Implementierung

```json
// config/features.json
{
  "darkMode": true,  // ← Änderung: false → true
  "betaFeatures": false,
  "newCheckout": true
}
```

### Akzeptanzkriterien

- [ ] Feature-Flag in `config/features.json` auf `true` setzen
- [ ] PR erstellen und mergen
- [ ] Deployment auslösen
- [ ] Dark Mode in Produktion testen

### Risikobewertung

| Aspekt        | Bewertung                 |
| ------------- | ------------------------- |
| Code-Änderung | 1 Zeile                   |
| Tests         | Smoke-Test                |
| Rollback      | Feature-Flag zurücksetzen |

---

## 📋 Beispiel 2: Umgebungsvariable anpassen

### User Story

> Als **DevOps-Engineer** möchte ich **das API-Timeout erhöhen**, damit **langsame API-Anfragen nicht mehr fehlschlagen**.

### Kontext

Einige API-Aufrufe an einen langsamen Drittanbieter-Service laufen in Timeouts. Das aktuelle Timeout von 5 Sekunden soll auf 10 Sekunden erhöht werden.

### Änderung

```bash
# .env.production
API_TIMEOUT=10000  # war: 5000
```

### Akzeptanzkriterien

- [ ] `API_TIMEOUT=10000` in `.env.production` setzen
- [ ] Keine Code-Änderungen erforderlich
- [ ] Redeployment zur Aktivierung
- [ ] Timeout-Fehler überwachen

---

## 📋 Beispiel 3: Tippfehler korrigieren

### User Story

> Als **Nutzer** möchte ich **korrekten Text in der App sehen**, damit **das Produkt professionell wirkt**.

### Problem

Im Footer der Website steht **"Kontkat"** statt **"Kontakt"**.

### Lösung

```vue
<!-- app/components/Footer.vue -->
<template>
  <footer>
    <a href="/contact">Kontakt</a>  <!-- war: Kontkat -->
  </footer>
</template>
```

### Akzeptanzkriterien

- [ ] Tippfehler in `Footer.vue` korrigieren
- [ ] Nach demselben Fehler an anderen Stellen suchen
- [ ] Visuell im Browser überprüfen
