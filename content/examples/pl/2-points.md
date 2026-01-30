# 2 Story Pointy – Małe Zmiany

> **Nakład pracy:** Pół dnia
> **Ryzyko:** Niskie do umiarkowanego
> **Testy:** Zalecane testy jednostkowe

---

## Przykład 1: Nowe Pole Formularza

**Tytuł:** Opcjonalne Pole Numeru Telefonu w Formularzu Kontaktowym

**Opis:**
Do formularza kontaktowego należy dodać opcjonalne pole na numer telefonu. Walidacja formatu dla numerów krajowych/międzynarodowych.

**Kryteria Akceptacji:**

- [ ] Nowe pole `phone` w formularzu
- [ ] Etykieta: "Telefon (opcjonalnie)"
- [ ] Walidacja: Dozwolone tylko cyfry, +, -, spacje
- [ ] Pole jest przesyłane do backendu

---

## Przykład 2: Dodanie Opcji Sortowania

**Tytuł:** Sortowanie Listy Produktów według Ceny

**Opis:**
Do przeglądu produktów należy dodać opcję sortowania "Cena rosnąco/malejąco".

**Kryteria Akceptacji:**

- [ ] Dropdown z opcjami sortowania
- [ ] Sortowanie po stronie klienta
- [ ] Aktywne sortowanie wizualnie wyróżnione

---

## Przykład 3: Dialog Potwierdzenia

**Tytuł:** Wyświetlenie Dialogu Potwierdzenia przy Usuwaniu

**Opis:**
Przed usunięciem wpisu powinien pojawić się modal: "Czy na pewno chcesz usunąć?"

**Kryteria Akceptacji:**

- [ ] Modal z "Tak" / "Anuluj"
- [ ] Usunięcie tylko po potwierdzeniu
- [ ] Modal można zamknąć klawiszem ESC

---

## Dlaczego 2 Punkty?

- Kilka komponentów do edycji
- Prosta logika
- Umiarkowany nakład testowania
- Niskie ryzyko efektów ubocznych
