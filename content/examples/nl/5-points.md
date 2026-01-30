# 5 Story Points – Middelgrote Wijzigingen

> **Inspanning:** 1–2 dagen
> **Risico:** Matig
> **Tests:** Unit, integratie en E2E tests aanbevolen
> **Complexiteit:** Gemiddeld

---

## 📋 Voorbeeld 1: CSV Export voor Bestellingen

### User Story

> Als **webshop beheerder** wil ik **alle weergegeven bestellingen als CSV exporteren** zodat **ik de gegevens in Excel kan verwerken**.

### Achtergrond

Het bestellingenoverzicht toont momenteel maximaal 100 bestellingen. Een nieuwe exportknop moet deze als CSV-bestand downloaden. Actieve filters moeten worden gerespecteerd.

### Technische Architectuur

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   ExportButton  │────▶│   OrderService  │────▶│   CSV-Generator │
│   (Frontend)    │     │   (API Call)    │     │   (Backend)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                                               │
         │◀──────────────── Blob Download ◀──────────────┘
```

### API Specificatie

```http
GET /api/orders/export?status=pending&from=2024-01-01
Accept: text/csv

Response:
Content-Type: text/csv; charset=utf-8
Content-Disposition: attachment; filename="orders-2024-01-15.csv"
```

### CSV Formaat

```csv
OrderNo;Datum;Klant;Artikelen;Totaal
ORD-2024-001;15/01/2024;Jan Jansen;3;€149,99
ORD-2024-002;15/01/2024;Marie de Vries;1;€29,99
```

### Acceptatiecriteria

- [ ] Knop "Exporteren als CSV" rechtsboven in het bestellingenoverzicht
- [ ] Kolommen: Bestelnr, Datum, Klant, Aantal Artikelen, Totaal
- [ ] NL opmaak (Datum: DD/MM/JJJJ, Getallen: 1.234,56)
- [ ] UTF-8 met BOM voor Excel compatibiliteit
- [ ] Bestandsnaam: `orders-JJJJ-MM-DD.csv`
- [ ] Laadspinner tijdens generatie
- [ ] Foutafhandeling voor > 10.000 rijen

### Test Scenario's

1. **Happy Path:** Exporteer 50 bestellingen → CSV correct
2. **Lege Export:** Geen bestellingen → Toon infobericht
3. **Grote Data:** 5.000 bestellingen → Prestatie < 3s
4. **Speciale Tekens:** Klantnamen met accenten → correct in Excel

---

## 📋 Voorbeeld 2: Server-Side Paginering

### User Story

> Als **gebruiker** wil ik **door grote lijsten kunnen navigeren** zodat **de pagina snel laadt en overzichtelijk blijft**.

### Achtergrond

De productlijst laadt momenteel alle 5.000+ items tegelijk, wat lange laadtijden veroorzaakt. Server-side paginering met 20 items per pagina moet worden geïmplementeerd.

### API Wijzigingen

```typescript
// Nieuw endpoint
GET /api/articles?page=1&limit=20&sort=name:asc

// Response
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

### UI Component

```
┌────────────────────────────────────────────────┐
│  ◀ Terug   1  2  3  ...  271  272   Volgende ▶ │
│             Toont 1-20 van 5.432 items         │
└────────────────────────────────────────────────┘
```

### Acceptatiecriteria

- [ ] Backend: Endpoint met `page`, `limit`, `sort` parameters
- [ ] Frontend: Paginering component met paginanummers
- [ ] URL Sync: `?page=2` wordt weerspiegeld in URL
- [ ] Deep Link: Directe toegang tot pagina 5 werkt
- [ ] Laadstatus tijdens paginawisseling (skeleton)
- [ ] Spring naar pagina 1 bij filterwijziging
- [ ] Mobiel: Vereenvoudigde paginering (alleen Vorige/Volgende)

---

## 📋 Voorbeeld 3: Profielfoto Upload

### User Story

> Als **geregistreerde gebruiker** wil ik **een profielfoto uploaden** zodat **mijn profiel er persoonlijker uitziet**.

### Acceptatiecriteria

- [ ] Drag & drop of bestandsselectie
- [ ] Toegestane formaten: JPG, PNG, WebP
- [ ] Maximale grootte: 5 MB
- [ ] Preview voor upload (bijsnijdoptie)
- [ ] Voortgangsindicator tijdens upload
- [ ] Server-side: Resize naar max 400x400px
- [ ] Oude afbeelding wordt automatisch verwijderd
- [ ] Fallback: Initialen avatar wanneer geen afbeelding

### Foutafhandeling

| Fout             | Bericht                                   |
| ---------------- | ----------------------------------------- |
| Verkeerd formaat | "Alleen JPG, PNG of WebP toegestaan"      |
| Te groot         | "De afbeelding moet 5 MB of kleiner zijn" |
| Upload mislukt   | "Upload mislukt. Probeer het opnieuw."    |

---

## ✅ Waarom 5 Punten?

| Criterium    | Beoordeling                     |
| ------------ | ------------------------------- |
| Architectuur | Frontend + Backend              |
| Componenten  | 3–5 nieuwe/gewijzigde bestanden |
| Logica       | Matige complexiteit             |
| Tests        | Unit + Integratie nodig         |
| Risico       | Beheersbaar                     |
