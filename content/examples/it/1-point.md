# 1 Story Point – Modifiche Molto Piccole

> **Impegno:** 1–2 ore
> **Rischio:** Basso
> **Test:** Smoke test consigliato
> **Complessità:** Minima

---

## 📋 Esempio 1: Sostituire Icona

### User Story

> Come **Utente** voglio **vedere un'icona di salvataggio moderna**, così che **l'interfaccia appaia più contemporanea**.

### Contesto

Il pulsante "Salva" attualmente usa un'icona di floppy disk (`floppy-disk`). Poiché i floppy disk non sono più comuni, questa deve essere sostituita con un'icona di spunta.

### Dettagli Tecnici

```text
File interessato: app/components/SaveButton.vue
Libreria Icone: @heroicons/vue
Icona Precedente: FloppyDiskIcon
Nuova Icona: CheckIcon
```

### Criteri di Accettazione

- [ ] Sostituire l'icona in `SaveButton.vue` da `FloppyDiskIcon` a `CheckIcon`
- [ ] Aggiornare l'import dell'icona
- [ ] La dimensione rimane `w-5 h-5`
- [ ] Verifica visiva su desktop e mobile
- [ ] Nessuna modifica funzionale

### Definition of Done

- [ ] Code review completata
- [ ] Testato in staging
- [ ] Screenshot documentati nel ticket

---

## 📋 Esempio 2: Aggiungere Tooltip

### User Story

> Come **Cliente** voglio **capire se il prezzo include l'IVA**, così che **non abbia sorprese al checkout**.

### Contesto

L'icona info (`ℹ`) accanto al campo prezzo deve mostrare un tooltip con il testo "IVA inclusa" al passaggio del mouse. Il componente tooltip esiste già nel progetto.

### Dettagli Tecnici

```vue
<template>
  <Tooltip text="IVA inclusa">
    <InfoIcon class="w-4 h-4 text-gray-400 cursor-help" />
  </Tooltip>
</template>
```

### Criteri di Accettazione

- [ ] Usare il componente tooltip da `@/components/ui/Tooltip.vue`
- [ ] Testo: "IVA inclusa"
- [ ] Il tooltip appare su hover e focus (accessibilità)
- [ ] Ritardo: 200ms prima della visualizzazione
- [ ] Posizione: centro alto

---

## 📋 Esempio 3: Modifica CSS secondo Style Guide

### User Story

> Come **Brand Manager** voglio **adeguare il colore del pulsante alla nuova style guide**, così che **tutti i prodotti abbiano un aspetto uniforme**.

### Contesto

Il pulsante primario usa `#0066cc`, secondo la nuova style guide deve essere `#0052a3`.

### Dettagli Tecnici

| Proprietà  | Precedente | Nuovo     |
| ---------- | ---------- | --------- |
| Background | `#0066cc`  | `#0052a3` |
| Hover      | `#0055b3`  | `#003d7a` |

**File:** `tailwind.config.ts`

```typescript
primary: {
  500: '#0052a3', // era: #0066cc
  600: '#003d7a', // era: #0055b3
}
```

### Criteri di Accettazione

- [ ] Modificare il colore in `tailwind.config.ts`
- [ ] Tutti i pulsanti primari sono interessati (automaticamente tramite token)
- [ ] Mantenere il rapporto di contrasto WCAG AA (min. 4.5:1)
- [ ] Nessuna modifica funzionale

---

## ✅ Perché 1 Punto?

| Criterio | Valutazione           |
| -------- | --------------------- |
| Ambito   | Chiaramente definito  |
| File     | 1–2 interessati       |
| Logica   | Nessuna nuova logica  |
| Test     | Testabile visivamente |
| Rischio  | Minimo                |
