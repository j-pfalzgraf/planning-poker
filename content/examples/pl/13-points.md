# 13 Story Pointów – Duże Zmiany

> **Nakład pracy:** 3–5 dni
> **Ryzyko:** Wysokie
> **Testy:** Wymagane pełne pokrycie testami
> **Złożoność:** Wysoka

---

## 📋 Przykład 1: Wieloetapowy Kreator Onboardingu

### Epic

> Jako **nowy klient** chcę **być prowadzony przez proces konfiguracji**, aby **móc jak najszybciej produktywnie korzystać z systemu**.

### Kontekst

Nowi klienci obecnie muszą samodzielnie znajdować wszystkie ustawienia. 4-etapowy kreator powinien ich przeprowadzić przez najważniejsze kroki i skrócić czas do uzyskania wartości.

### Przepływ Kreatora

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Krok 1    │───▶│   Krok 2    │───▶│   Krok 3    │───▶│   Krok 4    │
│   Firma     │    │   Kontakt   │    │   Płatność  │    │ Podsumowanie│
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      │                  │                  │                  │
      ▼                  ▼                  ▼                  ▼
   Walidacja         Walidacja         Walidacja           Wyślij
   zapisz            zapisz            zapisz            wszystkie dane
```

### Szczegóły Kroków

| Krok                | Pola                          | Walidacja                      |
| ------------------- | ----------------------------- | ------------------------------ |
| 1. Dane Firmy       | Nazwa, Adres, NIP             | Wymagane, Format NIP           |
| 2. Osoba Kontaktowa | Imię, Email, Telefon          | Format email, Wymagane         |
| 3. Metoda Płatności | Przelew lub Karta Kredytowa   | Sprawdzenie numeru konta/karty |
| 4. Podsumowanie     | Wszystkie dane (tylko odczyt) | Potwierdzenie                  |

### Komponenty Techniczne

```typescript
// Zarządzanie stanem
interface OnboardingState {
  currentStep: 1 | 2 | 3 | 4;
  company: CompanyData | null;
  contact: ContactData | null;
  payment: PaymentData | null;
  isDirty: boolean;
  errors: Record<string, string[]>;
}

// Tymczasowy zapis
const STORAGE_KEY = 'onboarding_draft';
localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
```

### Kryteria Akceptacji

- [ ] Wskaźnik postępu pokazuje bieżący krok (1/4, 2/4, ...)
- [ ] Walidacja na krok przy kliknięciu Dalej
- [ ] Nawigacja wstecz bez utraty danych
- [ ] Auto-zapis do LocalStorage co 30s i przy opuszczeniu pola
- [ ] Ostrzeżenie przy opuszczaniu strony z niezapisanymi danymi
- [ ] Końcowe podsumowanie z linkami edycji do każdego kroku
- [ ] Obsługa błędów przy wysyłaniu (logika ponowienia)
- [ ] Zoptymalizowane dla mobile (pionowy stepper)
- [ ] Nawigacja klawiaturą (Tab, Enter)

### Scenariusze Testowe

1. **Happy Path:** Wypełnij wszystkie kroki → Pomyślnie ukończone
2. **Błąd walidacji:** Nieprawidłowy numer konta → Pokaż błąd
3. **Przerwanie:** Zamknij kartę w kroku 2 → Przywróć dane po ponownym otwarciu
4. **Błąd sieci:** Wysłanie nieudane → Pokaż przycisk ponowienia

---

## 📋 Przykład 2: Konfigurowalny Dashboard z Widgetami

### Historia Użytkownika

> Jako **zaawansowany użytkownik** chcę **personalizować mój dashboard widgetami**, aby **widzieć ważne dla mnie informacje na pierwszy rzut oka**.

### Zakres Funkcji

- **Biblioteka Widgetów:** 8 predefiniowanych widgetów
- **Drag & Drop:** Dowolne pozycjonowanie
- **Zmiana rozmiaru:** Zmiana wielkości przez uchwyt
- **Zapis:** Układ jest zapisywany

### Dostępne Widgety

| Widget              | Rozmiary      | Źródło Danych            |
| ------------------- | ------------- | ------------------------ |
| Wykres Przychodów   | 1x1, 2x1, 2x2 | `/api/stats/revenue`     |
| Ostatnie Zamówienia | 1x2, 2x2      | `/api/orders?limit=10`   |
| Lista Zadań         | 1x1, 1x2      | `/api/tasks?status=open` |
