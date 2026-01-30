# 1 Story Point – Very Small Changes

> **Effort:** 1–2 hours
> **Risk:** Low
> **Tests:** Smoke test recommended
> **Complexity:** Minimal

---

## 📋 Example 1: Replace Icon

### User Story

> As a **User** I want to **see a modern save icon**, so that **the UI looks more contemporary**.

### Background

The "Save" button currently uses a floppy disk icon (`floppy-disk`). Since floppy disks are no longer common, this should be replaced with a checkmark icon.

### Technical Details

```text
Affected file: app/components/SaveButton.vue
Icon Library: @heroicons/vue
Old Icon: FloppyDiskIcon
New Icon: CheckIcon
```

### Acceptance Criteria

- [ ] Replace icon in `SaveButton.vue` from `FloppyDiskIcon` to `CheckIcon`
- [ ] Update icon import
- [ ] Size remains at `w-5 h-5`
- [ ] Visual check on desktop and mobile
- [ ] No functional changes

### Definition of Done

- [ ] Code review completed
- [ ] Tested in staging
- [ ] Screenshots documented in ticket

---

## 📋 Example 2: Add Tooltip

### User Story

> As a **Customer** I want to **understand if the price includes VAT**, so that **I don't have surprises at checkout**.

### Background

The info icon (`ℹ`) next to the price field should show a tooltip with the text "Incl. VAT" on hover. The tooltip component already exists in the project.

### Technical Details

```vue
<template>
  <Tooltip text="Incl. VAT">
    <InfoIcon class="w-4 h-4 text-gray-400 cursor-help" />
  </Tooltip>
</template>
```

### Acceptance Criteria

- [ ] Use tooltip component from `@/components/ui/Tooltip.vue`
- [ ] Text: "Incl. VAT"
- [ ] Tooltip appears on hover and focus (accessibility)
- [ ] Delay: 200ms before showing
- [ ] Position: top center

---

## 📋 Example 3: CSS Adjustment per Style Guide

### User Story

> As a **Brand Manager** I want to **adjust the button color to the new style guide**, so that **all products look uniform**.

### Background

The primary button uses `#0066cc`, according to the new style guide it should be `#0052a3`.

### Technical Details

| Property   | Old       | New       |
| ---------- | --------- | --------- |
| Background | `#0066cc` | `#0052a3` |
| Hover      | `#0055b3` | `#003d7a` |

**File:** `tailwind.config.ts`

```typescript
primary: {
  500: '#0052a3', // was: #0066cc
  600: '#003d7a', // was: #0055b3
}
```

### Acceptance Criteria

- [ ] Adjust color in `tailwind.config.ts`
- [ ] All primary buttons affected (automatically via token)
- [ ] Maintain WCAG AA contrast ratio (min. 4.5:1)
- [ ] No functional changes

---

## ✅ Why 1 Point?

| Criterion | Assessment        |
| --------- | ----------------- |
| Scope     | Clearly defined   |
| Files     | 1–2 affected      |
| Logic     | No new logic      |
| Tests     | Visually testable |
| Risk      | Minimal           |
