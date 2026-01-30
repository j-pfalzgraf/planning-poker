# 1 Story Point – Bardzo Małe Zmiany

> **Nakład pracy:** 1–2 godziny
> **Ryzyko:** Niskie
> **Testy:** Zalecany test podstawowy
> **Złożoność:** Minimalna

---

## 📋 Przykład 1: Wymiana Ikony

### Historia Użytkownika

> Jako **Użytkownik** chcę **widzieć nowoczesną ikonę zapisywania**, aby **interfejs wyglądał bardziej współcześnie**.

### Kontekst

Przycisk "Zapisz" obecnie używa ikony dyskietki (`floppy-disk`). Ponieważ dyskietki nie są już powszechnie używane, powinna zostać zastąpiona ikoną ptaszka.

### Szczegóły Techniczne

```text
Plik do edycji: app/components/SaveButton.vue
Biblioteka ikon: @heroicons/vue
Stara ikona: FloppyDiskIcon
Nowa ikona: CheckIcon
```

### Kryteria Akceptacji

- [ ] Zamień ikonę w `SaveButton.vue` z `FloppyDiskIcon` na `CheckIcon`
- [ ] Zaktualizuj import ikony
- [ ] Rozmiar pozostaje `w-5 h-5`
- [ ] Sprawdzenie wizualne na desktopie i urządzeniach mobilnych
- [ ] Brak zmian funkcjonalnych

### Definicja Ukończenia

- [ ] Code review ukończony
- [ ] Przetestowane na staging
- [ ] Zrzuty ekranu udokumentowane w zgłoszeniu

---

## 📋 Przykład 2: Dodanie Podpowiedzi

### Historia Użytkownika

> Jako **Klient** chcę **wiedzieć, czy cena zawiera VAT**, aby **nie mieć niespodzianek przy kasie**.

### Kontekst

Ikona informacji (`ℹ`) obok pola ceny powinna pokazywać podpowiedź z tekstem "Zawiera VAT" po najechaniu myszką. Komponent podpowiedzi już istnieje w projekcie.

### Szczegóły Techniczne

```vue
<template>
  <Tooltip text="Zawiera VAT">
    <InfoIcon class="w-4 h-4 text-gray-400 cursor-help" />
  </Tooltip>
</template>
```

### Kryteria Akceptacji

- [ ] Użyj komponentu podpowiedzi z `@/components/ui/Tooltip.vue`
- [ ] Tekst: "Zawiera VAT"
- [ ] Podpowiedź pojawia się przy najechaniu i fokusie (dostępność)
- [ ] Opóźnienie: 200ms przed pokazaniem
- [ ] Pozycja: góra środek

---

## 📋 Przykład 3: Dostosowanie CSS do Przewodnika Stylu

### Historia Użytkownika

> Jako **Brand Manager** chcę **dostosować kolor przycisków do nowego przewodnika stylu**, aby **wszystkie produkty wyglądały jednolicie**.

### Kontekst

Przycisk główny używa `#0066cc`, według nowego przewodnika stylu powinien być `#0052a3`.

### Szczegóły Techniczne

| Właściwość | Stara     | Nowa      |
| ---------- | --------- | --------- |
| Tło        | `#0066cc` | `#0052a3` |
| Hover      | `#0055b3` | `#003d7a` |

**Plik:** `tailwind.config.ts`

```typescript
primary: {
  500: '#0052a3', // było: #0066cc
  600: '#003d7a', // było: #0055b3
}
```
