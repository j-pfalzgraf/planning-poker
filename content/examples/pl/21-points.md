# 21 Story Pointów – Bardzo Duże Zmiany

> **Nakład pracy:** 1–2 tygodnie
> **Ryzyko:** Wysokie
> **Testy:** Kompleksowy zestaw testów + przegląd QA

---

## Przykład 1: Uprawnienia Oparte na Rolach

**Tytuł:** Implementacja Systemu Ról i Uprawnień

**Opis:**
Wprowadzenie ról (Admin, Manager, Użytkownik) z granularnymi uprawnieniami. Elementy UI i endpointy API są odpowiednio chronione.

**Kryteria Akceptacji:**

- [ ] Role: Admin, Manager, Użytkownik, Gość
- [ ] Uprawnienia na funkcję (CRUD)
- [ ] Panel administracyjny do zarządzania rolami
- [ ] Frontend: Warunkowe wyświetlanie elementów
- [ ] Backend: Middleware do autoryzacji
- [ ] Log audytu zmian uprawnień
- [ ] Migracja istniejących użytkowników

---

## Przykład 2: Multi-Tenancy

**Tytuł:** Wprowadzenie Wsparcia Multi-Tenant

**Opis:**
Aplikacja powinna obsługiwać wielu niezależnych najemców (firm). Ścisła separacja danych.

**Kryteria Akceptacji:**

- [ ] ID Tenant we wszystkich odpowiednich tabelach
- [ ] Wykrywanie najemcy przez subdomenę lub nagłówek
- [ ] Przełącznik najemców dla super adminów
- [ ] Izolowane dane na najemcę
- [ ] Konfiguracja specyficzna dla najemcy
- [ ] Migracja istniejących danych

---

## Przykład 3: Internacjonalizacja (i18n)

**Tytuł:** Pełne Wsparcie Wielojęzyczne (EN, DE, PL)

**Opis:**
Cała aplikacja powinna być dostępna w trzech językach. Dynamiczne przełączanie języka bez przeładowania.

**Kryteria Akceptacji:**

- [ ] Wszystkie teksty UI wyekstrahowane
- [ ] Pliki językowe dla EN, DE, PL
- [ ] Przełącznik języka w nagłówku
- [ ] Język zapisywalny w ustawieniach użytkownika
- [ ] Formaty daty i liczb zlokalizowane
- [ ] Przygotowane wsparcie RTL

---

## Dlaczego 21 Punktów?

- Szerokie zmiany w całym systemie
- Wpływ na architekturę
- Wysokie ryzyko regresji
- Złożona migracja
- Wymagane intensywne testowanie
