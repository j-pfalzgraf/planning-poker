# 0 Story Pointów – Trywialne Zmiany

> **Nakład pracy:** Minimalny, często poniżej 15 minut
> **Ryzyko:** Prawie żadne
> **Testy:** Zazwyczaj nie wymagane
> **Złożoność:** Brak

---

## 📋 Przykład 1: Włączenie Feature Flag

### Historia Użytkownika

> Jako **Product Owner** chcę **włączyć funkcję Trybu Ciemnego**, aby **nasi użytkownicy mogli od razu z niej korzystać**.

### Kontekst

Funkcja Trybu Ciemnego jest w pełni zaimplementowana i przetestowana, ale została wstrzymana w ostatnim wydaniu. Teraz powinna zostać aktywowana poprzez zmianę feature flag.

### Implementacja

```json
// config/features.json
{
  "darkMode": true,  // ← Zmiana: false → true
  "betaFeatures": false,
  "newCheckout": true
}
```

### Kryteria Akceptacji

- [ ] Ustaw feature flag w `config/features.json` na `true`
- [ ] Utwórz i scal PR
- [ ] Uruchom wdrożenie
- [ ] Przetestuj Tryb Ciemny na produkcji

### Ocena Ryzyka

| Aspekt          | Ocena                 |
| --------------- | --------------------- |
| Zmiana w kodzie | 1 linia               |
| Testy           | Test podstawowy       |
| Wycofanie       | Zresetuj feature flag |

---

## 📋 Przykład 2: Zmiana Zmiennej Środowiskowej

### Historia Użytkownika

> Jako **Inżynier DevOps** chcę **zwiększyć timeout API**, aby **wolne żądania API nie kończyły się błędem**.

### Kontekst

Niektóre wywołania API do wolnej usługi zewnętrznej przekraczają limit czasu. Obecny timeout 5 sekund powinien zostać zwiększony do 10 sekund.

### Zmiana

```bash
# .env.production
API_TIMEOUT=10000  # było: 5000
```

### Kryteria Akceptacji

- [ ] Ustaw `API_TIMEOUT=10000` w `.env.production`
- [ ] Brak zmian w kodzie
- [ ] Ponowne wdrożenie w celu aktywacji
- [ ] Monitoruj błędy timeout

---

## 📋 Przykład 3: Poprawka Literówki

### Historia Użytkownika

> Jako **Użytkownik** chcę **widzieć poprawny tekst w aplikacji**, aby **produkt wyglądał profesjonalnie**.

### Problem

Stopka strony pokazuje **"Kontkat"** zamiast **"Kontakt"**.

### Rozwiązanie

```vue
<!-- app/components/Footer.vue -->
<template>
  <footer>
    <a href="/contact">Kontakt</a>  <!-- było: Kontkat -->
  </footer>
</template>
```

### Kryteria Akceptacji

- [ ] Popraw literówkę w `Footer.vue`
- [ ] Sprawdź ten sam błąd w innych miejscach
- [ ] Weryfikacja wizualna w przeglądarce
