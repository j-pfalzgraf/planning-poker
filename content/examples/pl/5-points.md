# 5 Story Pointów – Średnie Zmiany

> **Nakład pracy:** 1–2 dni
> **Ryzyko:** Umiarkowane
> **Testy:** Zalecane testy jednostkowe, integracyjne i E2E
> **Złożoność:** Średnia

---

## 📋 Przykład 1: Eksport CSV dla Zamówień

### Historia Użytkownika

> Jako **administrator sklepu** chcę **eksportować wszystkie wyświetlone zamówienia do CSV**, aby **móc przetwarzać dane w Excelu**.

### Kontekst

Przegląd zamówień obecnie wyświetla do 100 zamówień. Nowy przycisk eksportu powinien pobierać je jako plik CSV. Aktywne filtry powinny być uwzględniane.

### Architektura Techniczna

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   ExportButton  │────▶│   OrderService  │────▶│   CSV-Generator │
│   (Frontend)    │     │   (API Call)    │     │   (Backend)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                                               │
         │◀──────────────── Blob Download ◀──────────────┘
```

### Specyfikacja API

```http
GET /api/orders/export?status=pending&from=2024-01-01
Accept: text/csv

Odpowiedź:
Content-Type: text/csv; charset=utf-8
Content-Disposition: attachment; filename="orders-2024-01-15.csv"
```

### Format CSV

```csv
NrZamówienia;Data;Klient;Pozycje;Suma
ORD-2024-001;15.01.2024;Jan Kowalski;3;149,99 zł
ORD-2024-002;15.01.2024;Anna Nowak;1;29,99 zł
```

### Kryteria Akceptacji

- [ ] Przycisk "Eksportuj do CSV" w prawym górnym rogu przeglądu zamówień
- [ ] Kolumny: Nr zamówienia, Data, Klient, Liczba pozycji, Suma
- [ ] Polskie formatowanie (Data: DD.MM.YYYY, Liczby: 1 234,56)
- [ ] UTF-8 z BOM dla kompatybilności z Excelem
- [ ] Nazwa pliku: `zamowienia-YYYY-MM-DD.csv`
- [ ] Spinner ładowania podczas generowania
- [ ] Obsługa błędów dla > 10 000 wierszy

### Scenariusze Testowe

1. **Happy Path:** Eksport 50 zamówień → CSV poprawny
2. **Pusty eksport:** Brak zamówień → Pokaż komunikat informacyjny
3. **Duże dane:** 5 000 zamówień → Wydajność < 3s
4. **Znaki specjalne:** Imiona klientów z polskimi znakami → poprawnie w Excelu

---

## 📋 Przykład 2: Paginacja po Stronie Serwera

### Historia Użytkownika

> Jako **użytkownik** chcę **nawigować przez duże listy**, aby **strona ładowała się szybko i była przejrzysta**.

### Kontekst

Lista produktów obecnie ładuje wszystkie 5 000+ pozycji naraz, powodując długie czasy ładowania. Należy zaimplementować paginację po stronie serwera z 20 pozycjami na stronę.

### Zmiany API

```typescript
// Nowy endpoint
GET /api/articles?page=1&limit=20&sort=name:asc

// Odpowiedź
{
  "data": [...],
  "meta": {
    "total": 5432,
    "page": 1,
    "limit": 20,
    "totalPages": 272
  }
}
```

### Komponent UI

```
┌────────────────────────────────────────────────┐
```
