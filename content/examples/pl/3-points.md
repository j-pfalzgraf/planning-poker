# 3 Story Pointy – Małe do Średnich Zmiany

> **Nakład pracy:** 0,5–1 dzień
> **Ryzyko:** Umiarkowane
> **Testy:** Zalecane testy jednostkowe i integracyjne

---

## Przykład 1: Lista z Filtrowaniem

**Tytuł:** Filtrowanie Listy Zadań według Statusu

**Opis:**
Lista zadań powinna być filtrowalna według statusu (Otwarte, W toku, Ukończone). Przyciski filtrów nad listą.

**Kryteria Akceptacji:**

- [ ] Przyciski filtrów dla każdego statusu
- [ ] Opcja "Wszystkie"
- [ ] Parametr URL dla filtra (`?status=open`)
- [ ] Wyświetlenie pustego stanu gdy 0 wyników

---

## Przykład 2: Formularz z Walidacją

**Tytuł:** Formularz Rejestracji z Walidacją w Czasie Rzeczywistym

**Opis:**
Pola: Email, Hasło, Potwierdzenie hasła. Walidacja przy opuszczeniu pola i wysłaniu.

**Kryteria Akceptacji:**

- [ ] Walidacja formatu email
- [ ] Hasło minimum 8 znaków
- [ ] Hasła muszą się zgadzać
- [ ] Wyświetlanie błędów inline

---

## Przykład 3: Proste Sortowanie Drag & Drop

**Tytuł:** Zmiana Kolejności Zadań przez Drag & Drop

**Opis:**
Zadania na liście powinny być przestawialne przez przeciąganie. Nowa kolejność jest zapisywana.

**Kryteria Akceptacji:**

- [ ] Uchwyt do przeciągania przy każdym zadaniu
- [ ] Podgląd wizualny podczas przeciągania
- [ ] Zapis po upuszczeniu
- [ ] Obsługa dotyku

---

## Dlaczego 3 Punkty?

- Wiele stanów do zarządzania
- Zmiany w UI i logice
- Umiarkowana złożoność
- Możliwe przypadki brzegowe
