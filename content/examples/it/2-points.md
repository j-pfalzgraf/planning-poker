# 2 Story Point – Modifiche Piccole

> **Impegno:** Mezza giornata
> **Rischio:** Da basso a moderato
> **Test:** Unit test consigliati

---

## Esempio 1: Nuovo Campo Form

**Titolo:** Campo Numero di Telefono Opzionale nel Form di Contatto

**Descrizione:**
Un campo di input opzionale per il numero di telefono deve essere aggiunto al form di contatto. Validazione del formato per numeri italiani/internazionali.

**Criteri di Accettazione:**

- [ ] Nuovo campo `phone` nel form
- [ ] Etichetta: "Telefono (opzionale)"
- [ ] Validazione: Solo numeri, +, -, spazi consentiti
- [ ] Il campo viene inviato al backend

---

## Esempio 2: Aggiungere Opzione di Ordinamento

**Titolo:** Ordinare Lista Prodotti per Prezzo

**Descrizione:**
Un'opzione di ordinamento "Prezzo crescente/decrescente" deve essere aggiunta alla panoramica prodotti.

**Criteri di Accettazione:**

- [ ] Dropdown con opzioni di ordinamento
- [ ] Ordinamento lato client
- [ ] Ordinamento attivo evidenziato visivamente

---

## Esempio 3: Finestra di Conferma

**Titolo:** Mostrare Finestra di Conferma all'Eliminazione

**Descrizione:**
Prima di eliminare una voce, deve apparire una modale: "Sei sicuro di voler eliminare?"

**Criteri di Accettazione:**

- [ ] Modale con "Sì" / "Annulla"
- [ ] Eliminazione solo su conferma
