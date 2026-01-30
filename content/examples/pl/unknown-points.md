# ? Story Pointów – Nieznany Nakład

> **Nakład pracy:** Nie można oszacować
> **Ryzyko:** Nieznane
> **Działanie:** Wymagany Spike/Research

---

## Kiedy Używa się "?"?

Karta "?" sygnalizuje, że historia **nie może być oszacowana**, ponieważ:

- Wymagania są niejasne
- Wykonalność techniczna jest niepewna
- Istnieje zbyt wiele niewiadomych
- Potrzeba więcej kontekstu

---

## Przykład 1: Niejasne Wymagania

**Tytuł:** Import Danych ze Starego Systemu

**Opis:**
Dane ze starego systemu powinny zostać zaimportowane.

**Dlaczego "?":**

- W jakim formacie są dane?
- Ile jest rekordów?
- Które pola są mapowane?
- Czy są reguły walidacji?

**Następny Krok:**
Spotkanie z interesariuszem w celu wyjaśnienia wymagań.

---

## Przykład 2: Niepewność Techniczna

**Tytuł:** Integracja z API Zewnętrznym

**Opis:**
Połączenie z API dostawcy XY.

**Dlaczego "?":**

- Dokumentacja API nieprzejrzana
- Metoda uwierzytelniania niejasna
- Limity zapytań nieznane
- Brak dostępu do sandboxa

**Następny Krok:**
Spike: Przejrzenie dokumentacji API, test sandboxa.

---

## Przykład 3: Pytanie o Wykonalność

**Tytuł:** Optymalizacja Wydajności Wyszukiwania

**Opis:**
Wyszukiwanie powinno być szybsze.

**Dlaczego "?":**

- Obecna wydajność niezmierzona
- Cel nieokreślony (jak szybko?)
- Główna przyczyna problemu nieznana

**Następny Krok:**
Przeprowadzenie analizy wydajności, zebranie metryk.

---

## Zalecane Podejście

1. **Odłóż historię** – Nie dodawaj do sprintu
2. **Zaplanuj spike** – Ograniczony czasowo research (np. 4h, 1 dzień)
3. **Udokumentuj wnioski** – Zapisz odkrycia
4. **Ponownie oszacuj historię** – Oszacuj ponownie z nową wiedzą
5. **Ewentualnie podziel** – Rozbij na mniejsze, oszacowalne historie

---

## ⚠️ Uwaga

"?" to **nie jest prawidłowe oszacowanie** dla sprintu.
To sygnał dla zespołu, że **potrzebna jest praca wstępna**.
