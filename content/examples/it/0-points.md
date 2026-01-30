# 0 Story Point – Modifiche Banali

> **Impegno:** Minimo, spesso meno di 15 minuti
> **Rischio:** Quasi nullo
> **Test:** Di solito non richiesti
> **Complessità:** Nessuna

---

## 📋 Esempio 1: Abilitare Feature Flag

### User Story

> Come **Product Owner** voglio **abilitare la funzionalità Dark Mode**, così che **i nostri utenti possano iniziare a usarla immediatamente**.

### Contesto

La funzionalità Dark Mode è completamente implementata e testata, ma era stata trattenuta per l'ultimo rilascio. Ora deve essere attivata modificando un feature flag.

### Implementazione

```json
// config/features.json
{
  "darkMode": true,  // ← Modifica: false → true
  "betaFeatures": false,
  "newCheckout": true
}
```

### Criteri di Accettazione

- [ ] Impostare il feature flag in `config/features.json` a `true`
- [ ] Creare e unire la PR
- [ ] Avviare il deployment
- [ ] Testare Dark Mode in produzione

### Valutazione del Rischio

| Aspetto            | Valutazione          |
| ------------------ | -------------------- |
| Modifica al codice | 1 riga               |
| Test               | Smoke test           |
| Rollback           | Ripristinare il flag |

---

## 📋 Esempio 2: Modificare Variabile d'Ambiente

### User Story

> Come **DevOps Engineer** voglio **aumentare il timeout dell'API**, così che **le richieste API lente non falliscano più**.

### Contesto

Alcune chiamate API verso un servizio esterno lento stanno andando in timeout. Il timeout attuale di 5 secondi deve essere aumentato a 10 secondi.

### Modifica

```bash
# .env.production
API_TIMEOUT=10000  # era: 5000
```

### Criteri di Accettazione

- [ ] Impostare `API_TIMEOUT=10000` in `.env.production`
- [ ] Nessuna modifica al codice necessaria
- [ ] Ridistribuire per attivare
- [ ] Monitorare gli errori di timeout

---

## 📋 Esempio 3: Correggere un Errore di Battitura

### User Story

> Come **Utente** voglio **vedere testo corretto nell'app**, così che **il prodotto appaia professionale**.

### Problema

Il footer del sito mostra **"Conttat"** invece di **"Contatto"**.

### Soluzione

```vue
<!-- app/components/Footer.vue -->
<template>
  <footer>
    <a href="/contact">Contatto</a>  <!-- era: Conttat -->
  </footer>
</template>
```

### Criteri di Accettazione

- [ ] Correggere l'errore di battitura in `Footer.vue`
- [ ] Verificare lo stesso errore in altri punti
- [ ] Verificare visivamente nel browser

---

## ✅ Perché 0 Punti?

| Criterio   | Valutazione                         |
| ---------- | ----------------------------------- |
| Logica     | Nessuna logica coinvolta            |
| Isolamento | Atomico e isolato                   |
| Rischio    | Quasi nullo                         |
| Tempo      | Può essere fatto durante un meeting |
| Revisione  | Minima, quasi autoesplicativa       |

> 💡 **Suggerimento:** Le storie da 0 punti sono ottime per l'onboarding di nuovi membri del team o come "riscaldamento" al mattino.
