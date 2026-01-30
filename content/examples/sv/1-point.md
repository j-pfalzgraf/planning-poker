# 1 Story Point – Mycket små ändringar

> **Arbetsinsats:** 1–2 timmar
> **Risk:** Låg
> **Tester:** Smoke-test rekommenderas
> **Komplexitet:** Minimal

---

## 📋 Exempel 1: Byt ikon

### User Story

> Som **Användare** vill jag **se en modern spara-ikon**, så att **gränssnittet ser mer samtida ut**.

### Bakgrund

"Spara"-knappen använder för närvarande en diskettikon (`floppy-disk`). Eftersom disketter inte längre är vanliga ska denna ersättas med en bockikon.

### Tekniska detaljer

```text
Berörd fil: app/components/SaveButton.vue
Ikonbibliotek: @heroicons/vue
Gammal ikon: FloppyDiskIcon
Ny ikon: CheckIcon
```

### Acceptanskriterier

- [ ] Byt ikon i `SaveButton.vue` från `FloppyDiskIcon` till `CheckIcon`
- [ ] Uppdatera ikonimport
- [ ] Storleken förblir `w-5 h-5`
- [ ] Visuell kontroll på desktop och mobil
- [ ] Inga funktionella ändringar

### Definition of Done

- [ ] Kodgranskning slutförd
- [ ] Testad i staging
- [ ] Skärmbilder dokumenterade i ticket

---

## 📋 Exempel 2: Lägg till tooltip

### User Story

> Som **Kund** vill jag **förstå om priset inkluderar moms**, så att **jag inte får överraskningar vid kassan**.

### Bakgrund

Info-ikonen (`ℹ`) bredvid prisfältet ska visa en tooltip med texten "Inkl. moms" vid hover. Tooltip-komponenten finns redan i projektet.

### Tekniska detaljer

```vue
<template>
  <Tooltip text="Inkl. moms">
    <InfoIcon class="w-4 h-4 text-gray-400 cursor-help" />
  </Tooltip>
</template>
```

### Acceptanskriterier

- [ ] Använd tooltip-komponenten från `@/components/ui/Tooltip.vue`
- [ ] Text: "Inkl. moms"
- [ ] Tooltip visas vid hover och fokus (tillgänglighet)
- [ ] Fördröjning: 200ms innan visning
- [ ] Position: topp centrerad

---

## 📋 Exempel 3: CSS-justering enligt stilguide

### User Story

> Som **Varumärkesansvarig** vill jag **justera knappfärgen enligt den nya stilguiden**, så att **alla produkter ser enhetliga ut**.

### Bakgrund

Den primära knappen använder `#0066cc`, enligt den nya stilguiden ska den vara `#0052a3`.

### Tekniska detaljer

| Egenskap | Gammal    | Ny        |
| -------- | --------- | --------- |
| Bakgrund | `#0066cc` | `#0052a3` |
| Hover    | `#0055b3` | `#003d7a` |

**Fil:** `tailwind.config.ts`

```typescript
primary: {
  500: '#0052a3', // var: #0066cc
  600: '#003d7a', // var: #0055b3
}
```

### Acceptanskriterier

- [ ] Justera färgen i `tailwind.config.ts`
- [ ] Alla primära knappar påverkas (automatiskt via token)
- [ ] Bibehåll WCAG AA kontrastförhållande (min. 4.5:1)
- [ ] Inga funktionella ändringar

---

## ✅ Varför 1 poäng?

| Kriterium  | Bedömning          |
| ---------- | ------------------ |
| Omfattning | Tydligt definierad |
| Filer      | 1–2 berörda        |
| Logik      | Ingen ny logik     |
| Tester     | Visuellt testbart  |
| Risk       | Minimal            |
