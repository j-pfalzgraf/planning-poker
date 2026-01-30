# 5 Story Point – Modifiche Medie

> **Impegno:** 1–2 giorni
> **Rischio:** Moderato
> **Test:** Unit, integration ed E2E test consigliati
> **Complessità:** Media

---

## 📋 Esempio 1: Esportazione CSV per Ordini

### User Story

> Come **amministratore del negozio** voglio **esportare tutti gli ordini visualizzati come CSV** così che **possa elaborare i dati in Excel**.

### Contesto

La panoramica ordini attualmente visualizza fino a 100 ordini. Un nuovo pulsante di esportazione deve scaricarli come file CSV. I filtri attivi devono essere rispettati.

### Architettura Tecnica

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   ExportButton  │────▶│   OrderService  │────▶│   CSV-Generator │
│   (Frontend)    │     │   (API Call)    │     │   (Backend)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                                               │
         │◀──────────────── Blob Download ◀──────────────┘
```

### Specifica API

```http
GET /api/orders/export?status=pending&from=2024-01-01
Accept: text/csv

Response:
Content-Type: text/csv; charset=utf-8
Content-Disposition: attachment; filename="orders-2024-01-15.csv"
```

### Formato CSV

```csv
NumOrdine;Data;Cliente;Articoli;Totale
ORD-2024-001;15/01/2024;Mario Rossi;3;€149,99
ORD-2024-002;15/01/2024;Giulia Bianchi;1;€29,99
```

### Criteri di Accettazione

- [ ] Pulsante "Esporta come CSV" in alto a destra della panoramica ordini
- [ ] Colonne: N. Ordine, Data, Cliente, Numero Articoli, Totale
- [ ] Formato italiano (Data: GG/MM/AAAA, Numeri: 1.234,56)
- [ ] UTF-8 con BOM per compatibilità Excel
- [ ] Nome file: `ordini-AAAA-MM-GG.csv`
- [ ] Spinner di caricamento durante la generazione
- [ ] Gestione errori per > 10.000 righe

### Scenari di Test

1. **Happy Path:** Esporta 50 ordini → CSV corretto
2. **Esportazione Vuota:** Nessun ordine → Mostra messaggio info
3. **Dati Grandi:** 5.000 ordini → Performance < 3s
4. **Caratteri Speciali:** Nomi clienti con accenti → corretti in Excel

---

## 📋 Esempio 2: Paginazione Lato Server

### User Story

> Come **utente** voglio **navigare attraverso liste grandi** così che **la pagina si carichi velocemente e rimanga organizzata**.

### Contesto

La lista prodotti attualmente carica tutti gli oltre 5.000 articoli in una volta, causando tempi di caricamento lunghi. Deve essere implementata la paginazione lato server con 20 articoli per pagina.

### Modifiche API

```typescript
// Nuovo endpoint
GET /api/articles?page=1&limit=20&sort=name:asc

// Risposta
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

### Componente UI

```
┌────────────────────────────────────────────────┐
│  ◀ Indietro   1  2  3  ...  271  272   Avanti ▶ │
│           Mostrando 1-20 di 5.432 articoli      │
└────────────────────────────────────────────────┘
```

### Criteri di Accettazione

- [ ] Backend: Endpoint con parametri `page`, `limit`, `sort`
- [ ] Frontend: Componente paginazione con numeri di pagina
- [ ] Sync URL: `?page=2` è riflesso nell'URL
- [ ] Deep Link: Accesso diretto a pagina 5 funziona
- [ ] Stato di caricamento durante cambio pagina (skeleton)
- [ ] Salto a pagina 1 su cambio filtro
- [ ] Mobile: Paginazione semplificata (solo Precedente/Successivo)

---

## 📋 Esempio 3: Caricamento Immagine Profilo

### User Story

> Come **utente registrato** voglio **caricare un'immagine profilo** così che **il mio profilo appaia più personale**.

### Criteri di Accettazione

- [ ] Drag & drop o selezione file
- [ ] Formati consentiti: JPG, PNG, WebP
- [ ] Dimensione massima: 5 MB
- [ ] Anteprima prima del caricamento (opzione ritaglio)
- [ ] Indicatore di progresso durante il caricamento
- [ ] Lato server: Ridimensionamento a max 400x400px
- [ ] La vecchia immagine viene eliminata automaticamente
- [ ] Fallback: Avatar con iniziali quando nessuna immagine

### Gestione Errori

| Errore              | Messaggio                            |
| ------------------- | ------------------------------------ |
| Formato errato      | "Solo JPG, PNG o WebP consentiti"    |
| Troppo grande       | "L'immagine deve essere 5 MB o meno" |
| Caricamento fallito | "Caricamento fallito. Riprova."      |

---

## ✅ Perché 5 Punti?

| Criterio     | Valutazione                  |
| ------------ | ---------------------------- |
| Architettura | Frontend + Backend           |
| Componenti   | 3–5 file nuovi/modificati    |
| Logica       | Complessità moderata         |
| Test         | Unit + Integration necessari |
| Rischio      | Gestibile                    |
