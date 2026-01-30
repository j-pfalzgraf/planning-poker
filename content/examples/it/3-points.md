# 3 Story Point – Modifiche da Piccole a Medie

> **Impegno:** 0,5–1 giorno
> **Rischio:** Moderato
> **Test:** Unit test e integration test consigliati

---

## Esempio 1: Lista Filtrabile

**Titolo:** Filtrare Lista Attività per Stato

**Descrizione:**
La lista delle attività deve essere filtrabile per stato (Aperto, In Corso, Completato). Pulsanti filtro sopra la lista.

**Criteri di Accettazione:**

- [ ] Pulsanti filtro per ogni stato
- [ ] Opzione "Tutti"
- [ ] Parametro URL per il filtro (`?status=open`)
- [ ] Visualizzazione stato vuoto quando 0 risultati

---

## Esempio 2: Form con Validazione

**Titolo:** Form di Registrazione con Validazione in Tempo Reale

**Descrizione:**
Campi: Email, Password, Conferma password. Validazione su blur e submit.

**Criteri di Accettazione:**

- [ ] Validare formato email
- [ ] Password minimo 8 caratteri
- [ ] Le password devono corrispondere
- [ ] Visualizzare errori inline

---

## Esempio 3: Ordinamento Drag & Drop Semplice

**Titolo:** Riordinare Attività tramite Drag & Drop

**Descrizione:**
Le attività in una lista devono essere riordinabili tramite drag & drop. Il nuovo ordine viene salvato.

**Criteri di Accettazione:**

- [ ] Maniglia di trascinamento su ogni attività
- [ ] Anteprima visiva durante il trascinamento
- [ ] Salvataggio dopo il rilascio
- [ ] Supporto touch

---

## Perché 3 Punti?

- Più stati da gestire
- Modifiche UI e logica
- Complessità moderata
- Possibili casi limite
