# 1 Story Point – Sehr kleine Änderungen

> **Aufwand:** 1–2 Stunden
> **Risiko:** Gering
> **Tests:** Smoke-Test empfohlen
> **Komplexität:** Minimal

---

## 📋 Beispiel 1: Icon austauschen

### User Story

> Als **Nutzer** möchte ich **ein modernes Speichern-Icon sehen**, damit **die Benutzeroberfläche zeitgemäßer wirkt**.

### Hintergrund

Der „Speichern"-Button verwendet derzeit ein Disketten-Icon (`floppy-disk`). Da Disketten nicht mehr üblich sind, soll dieses durch ein Häkchen-Icon ersetzt werden.

### Technische Details

```text
Betroffene Datei: app/components/SaveButton.vue
Icon-Bibliothek: @heroicons/vue
Altes Icon: FloppyDiskIcon
Neues Icon: CheckIcon
```

### Akzeptanzkriterien

- [ ] Icon in `SaveButton.vue` von `FloppyDiskIcon` zu `CheckIcon` ändern
- [ ] Icon-Import aktualisieren
- [ ] Größe bleibt bei `w-5 h-5`
- [ ] Visuelle Prüfung auf Desktop und Mobil
- [ ] Keine funktionalen Änderungen

### Definition of Done

- [ ] Code-Review abgeschlossen
- [ ] Im Staging getestet
- [ ] Screenshots im Ticket dokumentiert

---

## 📋 Beispiel 2: Tooltip hinzufügen

### User Story

> Als **Kunde** möchte ich **verstehen, ob der Preis die MwSt. enthält**, damit **ich beim Checkout keine Überraschungen erlebe**.

### Hintergrund

Das Info-Icon (`ℹ`) neben dem Preisfeld soll beim Hover einen Tooltip mit dem Text „Inkl. MwSt." anzeigen. Die Tooltip-Komponente existiert bereits im Projekt.

### Technische Details

```vue
<template>
  <Tooltip text="Inkl. MwSt.">
    <InfoIcon class="w-4 h-4 text-gray-400 cursor-help" />
  </Tooltip>
</template>
```

### Akzeptanzkriterien

- [ ] Tooltip-Komponente aus `@/components/ui/Tooltip.vue` verwenden
- [ ] Text: „Inkl. MwSt."
- [ ] Tooltip erscheint bei Hover und Fokus (Barrierefreiheit)
- [ ] Verzögerung: 200ms vor dem Anzeigen
- [ ] Position: oben mittig

---

## 📋 Beispiel 3: CSS-Anpassung gemäß Styleguide

### User Story

> Als **Brand Manager** möchte ich **die Button-Farbe an den neuen Styleguide anpassen**, damit **alle Produkte einheitlich aussehen**.

### Hintergrund

Der primäre Button verwendet `#0066cc`, laut neuem Styleguide soll es `#0052a3` sein.

### Technische Details

| Eigenschaft | Alt       | Neu       |
| ----------- | --------- | --------- |
| Hintergrund | `#0066cc` | `#0052a3` |
| Hover       | `#0055b3` | `#003d7a` |

**Datei:** `tailwind.config.ts`

```typescript
primary: {
  500: '#0052a3', // war: #0066cc
  600: '#003d7a', // war: #0055b3
}
```
