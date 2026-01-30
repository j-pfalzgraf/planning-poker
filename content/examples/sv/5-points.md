# 5 Story Points – Medelstora ändringar

> **Arbetsinsats:** 1–2 dagar
> **Risk:** Måttlig
> **Tester:** Enhets-, integrations- och E2E-tester rekommenderas
> **Komplexitet:** Medel

---

## 📋 Exempel 1: CSV-export för ordrar

### User Story

> Som **butiksadministratör** vill jag **exportera alla visade ordrar som CSV** så att **jag kan bearbeta data i Excel**.

### Bakgrund

Orderöversikten visar för närvarande upp till 100 ordrar. En ny exportknapp ska ladda ner dessa som en CSV-fil. Aktiva filter ska respekteras.

### Teknisk arkitektur

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   ExportButton  │────▶│   OrderService  │────▶│   CSV-Generator │
│   (Frontend)    │     │   (API-anrop)   │     │   (Backend)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                                               │
         │◀──────────────── Blob-nedladdning ◀───────────┘
```

### API-specifikation

```http
GET /api/orders/export?status=pending&from=2024-01-01
Accept: text/csv

Svar:
Content-Type: text/csv; charset=utf-8
Content-Disposition: attachment; filename="orders-2024-01-15.csv"
```

### CSV-format

```csv
OrderNr;Datum;Kund;Artiklar;Totalt
ORD-2024-001;2024-01-15;Johan Andersson;3;1 499,99 kr
ORD-2024-002;2024-01-15;Anna Svensson;1;299,99 kr
```

### Acceptanskriterier

- [ ] Knapp "Exportera som CSV" uppe till höger i orderöversikten
- [ ] Kolumner: Ordernr, Datum, Kund, Antal artiklar, Totalt
- [ ] Svenskt format (Datum: ÅÅÅÅ-MM-DD, Tal: 1 234,56)
- [ ] UTF-8 med BOM för Excel-kompatibilitet
- [ ] Filnamn: `orders-ÅÅÅÅ-MM-DD.csv`
- [ ] Laddningsindikator under generering
- [ ] Felhantering för > 10 000 rader

### Testscenarier

1. **Happy Path:** Exportera 50 ordrar → CSV korrekt
2. **Tom export:** Inga ordrar → Visa informationsmeddelande
3. **Stora data:** 5 000 ordrar → Prestanda < 3s
4. **Specialtecken:** Kundnamn med accenter → korrekt i Excel

---

## 📋 Exempel 2: Server-side paginering

### User Story

> Som **användare** vill jag **navigera genom stora listor** så att **sidan laddar snabbt och förblir överskådlig**.

### Bakgrund

Produktlistan laddar för närvarande alla 5 000+ artiklar på en gång, vilket orsakar långa laddningstider. Server-side paginering med 20 artiklar per sida ska implementeras.

### API-ändringar

```typescript
// Ny endpoint
GET /api/articles?page=1&limit=20&sort=name:asc

// Svar
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

### UI-komponent

```
┌────────────────────────────────────────────────┐
│  ◀ Tillbaka   1  2  3  ...  271  272   Nästa ▶ │
│             Visar 1-20 av 5 432 artiklar       │
└────────────────────────────────────────────────┘
```

### Acceptanskriterier

- [ ] Backend: Endpoint med `page`, `limit`, `sort`-parametrar
- [ ] Frontend: Pagineringskomponent med sidnummer
- [ ] URL-synk: `?page=2` reflekteras i URL
- [ ] Djuplänk: Direktåtkomst till sida 5 fungerar
- [ ] Laddningstillstånd vid sidbyte (skeleton)
- [ ] Hoppa till sida 1 vid filterändring
- [ ] Mobil: Förenklad paginering (endast Föregående/Nästa)

---

## 📋 Exempel 3: Profilbildsuppladdning

### User Story

> Som **registrerad användare** vill jag **ladda upp en profilbild** så att **min profil ser mer personlig ut**.

### Acceptanskriterier

- [ ] Dra och släpp eller filval
- [ ] Tillåtna format: JPG, PNG, WebP
- [ ] Maximal storlek: 5 MB
- [ ] Förhandsgranskning före uppladdning (beskärningsalternativ)
- [ ] Förloppsindikator under uppladdning
- [ ] Serversida: Ändra storlek till max 400x400px
- [ ] Gammal bild raderas automatiskt
- [ ] Fallback: Initialer-avatar när ingen bild finns

### Felhantering

| Fel                      | Meddelande                                 |
| ------------------------ | ------------------------------------------ |
| Fel format               | "Endast JPG, PNG eller WebP tillåtet"      |
| För stor                 | "Bilden måste vara 5 MB eller mindre"      |
| Uppladdning misslyckades | "Uppladdningen misslyckades. Försök igen." |

---

## ✅ Varför 5 poäng?

| Kriterium   | Bedömning                           |
| ----------- | ----------------------------------- |
| Arkitektur  | Frontend + Backend                  |
| Komponenter | 3–5 nya/ändrade filer               |
| Logik       | Måttlig komplexitet                 |
| Tester      | Enhets- + integrationstester behövs |
| Risk        | Hanterbar                           |
