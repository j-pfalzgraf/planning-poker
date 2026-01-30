# 40 Story Pointów – Epickie Zmiany

> **Nakład pracy:** 2–4 tygodnie
> **Ryzyko:** Bardzo wysokie
> **Testy:** Pełna regresja + testy wydajnościowe
> ⚠️ **Zalecenie:** Podziel na mniejsze historie!

---

## Przykład 1: Współpraca w Czasie Rzeczywistym

**Tytuł:** Jednoczesna Edycja Dokumentu

**Opis:**
Wielu użytkowników może jednocześnie edytować ten sam dokument. Zmiany są synchronizowane w czasie rzeczywistym (styl Google Docs).

**Kryteria Akceptacji:**

- [ ] Operational Transformation lub CRDT
- [ ] Synchronizacja oparta na WebSocket
- [ ] Widoczna pozycja kursora innych użytkowników
- [ ] Rozwiązywanie konfliktów
- [ ] Wsparcie offline z synchronizacją
- [ ] Historia wersji
- [ ] Wydajność z 10+ równoczesnymi użytkownikami

---

## Przykład 2: Silnik Workflow

**Tytuł:** Konfigurowalny Workflow Zatwierdzania

**Opis:**
Admini mogą definiować workflow zatwierdzania: kroki, warunki, eskalacje, powiadomienia.

**Kryteria Akceptacji:**

- [ ] Wizualny edytor workflow
- [ ] Kroki: Zatwierdzenie, Warunek, Akcja
- [ ] Zatwierdzający według roli
- [ ] Eskalacja przy timeout
- [ ] Powiadomienia email i w aplikacji
- [ ] Ścieżka audytu
- [ ] Ścieżki równoległe i sekwencyjne

---

## Przykład 3: Moduł Raportowania

**Tytuł:** System Niestandardowych Raportów

**Opis:**
Użytkownicy mogą tworzyć niestandardowe raporty: wybierać źródła danych, ustawiać filtry, wybierać wizualizację, eksportować do PDF/Excel.

**Kryteria Akceptacji:**

- [ ] UI do budowania raportów
- [ ] Wybór źródła danych
- [ ] Filtry i grupowanie
- [ ] Typy wykresów: Słupkowy, Liniowy, Kołowy, Tabela
- [ ] Zapisywalne raporty
- [ ] Zaplanowane wykonanie
- [ ] Eksport: PDF, Excel, CSV
- [ ] Uprawnienia na raport

---

## Dlaczego 40 Punktów?

- Wiele tygodni czasu rozwoju
- Wysoce złożona architektura
- Wiele zależności
- Wysokie ryzyko
- **Powinno być podzielone na mniejsze historie!**
