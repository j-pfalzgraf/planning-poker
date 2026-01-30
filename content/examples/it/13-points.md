# 13 Story Point – Modifiche Grandi

> **Impegno:** 3–5 giorni
> **Rischio:** Alto
> **Test:** Copertura test completa richiesta
> **Complessità:** Alta

---

## 📋 Esempio 1: Wizard di Onboarding Multi-Step

### Epic

> Come **nuovo cliente** voglio **essere guidato attraverso un processo di configurazione** così che **possa usare il sistema in modo produttivo il più rapidamente possibile**.

### Contesto

Attualmente i nuovi clienti devono trovare tutte le impostazioni manualmente. Un wizard a 4 step dovrebbe guidarli attraverso i passaggi più importanti e ridurre il time-to-value.

### Flusso del Wizard

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Step 1    │───▶│   Step 2    │───▶│   Step 3    │───▶│   Step 4    │
│  Azienda    │    │  Contatto   │    │  Pagamento  │    │  Riepilogo  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      │                  │                  │                  │
      ▼                  ▼                  ▼                  ▼
   Validazione       Validazione       Validazione         Invio
   salva             salva             salva               tutti i dati
```

### Dettagli degli Step

| Step                   | Campi                       | Validazione                 |
| ---------------------- | --------------------------- | --------------------------- |
| 1. Dati Azienda        | Nome, Indirizzo, P.IVA      | Obbligatorio, Formato P.IVA |
| 2. Persona di Contatto | Nome, Email, Telefono       | Formato email, Obbligatorio |
| 3. Metodo di Pagamento | Bonifico o Carta di Credito | Verifica numero conto/carta |
| 4. Riepilogo           | Tutti i dati (sola lettura) | Conferma                    |

### Componenti Tecnici

```typescript
// Gestione stato
interface OnboardingState {
  currentStep: 1 | 2 | 3 | 4;
  company: CompanyData | null;
  contact: ContactData | null;
  payment: PaymentData | null;
  isDirty: boolean;
  errors: Record<string, string[]>;
}

// Salvataggio intermedio
const STORAGE_KEY = 'onboarding_draft';
localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
```

### Criteri di Accettazione

- [ ] Indicatore di progresso mostra lo step corrente (1/4, 2/4, ...)
- [ ] Validazione per step al click su Avanti
- [ ] Navigazione indietro senza perdita dati
- [ ] Auto-salvataggio in LocalStorage ogni 30s e su blur
- [ ] Avviso quando si lascia la pagina con dati non salvati
- [ ] Riepilogo finale con link di modifica per ogni step
- [ ] Gestione errori all'invio (logica di retry)
- [ ] Ottimizzato per mobile (stepper verticale)
- [ ] Navigazione da tastiera (Tab, Enter)

### Scenari di Test

1. **Happy Path:** Compila tutti gli step → Completato con successo
2. **Errore di Validazione:** Numero conto invalido → Mostra errore
3. **Abbandono:** Chiudi tab allo step 2 → Ripristina dati alla riapertura
4. **Errore di Rete:** Invio fallisce → Mostra pulsante riprova

---

## 📋 Esempio 2: Dashboard Personalizzabile con Widget

### User Story

> Come **power user** voglio **personalizzare la mia dashboard con widget** così che **possa vedere le informazioni importanti per me a colpo d'occhio**.

### Ambito della Funzionalità

- **Libreria Widget:** 8 widget predefiniti
- **Drag & Drop:** Posizionamento libero
- **Ridimensionamento:** Cambia dimensione tramite handle
- **Persistenza:** Il layout viene salvato

### Widget Disponibili

| Widget         | Dimensioni    | Fonte Dati               |
| -------------- | ------------- | ------------------------ |
| Grafico Ricavi | 1x1, 2x1, 2x2 | `/api/stats/revenue`     |
| Ordini Recenti | 1x2, 2x2      | `/api/orders?limit=10`   |
| Lista Attività | 1x1, 1x2      | `/api/tasks?status=open` |
| Tile KPI       | 1x1, 2x1      | `/api/stats/kpis`        |
| Calendario     | 2x2           | `/api/events`            |
| Attività Team  | 1x2           | `/api/activity`          |
| Azioni Rapide  | 1x1           | statico                  |
| Note           | 1x1, 1x2      | `/api/notes`             |

### Sistema Griglia

```
┌──────────┬──────────┬──────────┬──────────┐
│  Widget  │  Widget  │       Widget        │
│   1x1    │   1x1    │        2x1          │
├──────────┼──────────┼──────────┬──────────┤
│       Widget        │  Widget  │  Widget  │
│        2x1          │   1x1    │   1x1    │
├──────────┬──────────┼──────────┴──────────┤
│  Widget  │  Widget  │       Widget        │
│   1x2    │   1x2    │        2x2          │
│          │          │                     │
└──────────┴──────────┴─────────────────────┘
```

### Criteri di Accettazione

- [ ] Libreria widget con card di anteprima
- [ ] Drag & drop per posizionamento (react-grid-layout o vue-grid-layout)
- [ ] Ridimensionamento tramite handle agli angoli
- [ ] Rilevamento collisioni (i widget non si sovrappongono)
- [ ] Layout salvato in DB (debounced, 500ms dopo modifica)
- [ ] Reset a layout predefinito (pulsante + conferma)
- [ ] Responsive: La griglia si adatta al viewport
- [ ] Skeleton di caricamento per ogni widget

---

## 📋 Esempio 3: Centro Notifiche In-App

### User Story

> Come **utente** voglio **vedere tutte le notifiche rilevanti in un unico posto** così che **non mi perda nulla di importante**.

### Architettura Componenti

```
┌─────────────────────────────────────────────────┐
│                    Header                        │
│  Logo   Nav   Nav   Nav   [🔔 3]   Avatar       │
└─────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │  Notifiche          │
                    │  Dropdown           │
                    │  ┌───────────────┐  │
                    │  │ Nuovo Ordine  │  │
                    │  │ 2 min fa      │  │
                    │  ├───────────────┤  │
                    │  │ Attività      │  │
                    │  │ Completata    │  │
                    │  │ 1 ora fa      │  │
                    │  └───────────────┘  │
                    │  [Segna tutto letto]│
                    │  [Vedi tutto →]     │
                    └─────────────────────┘
```

### Modello Dati

```typescript
interface Notification {
  id: string;
  type: 'order' | 'task' | 'system' | 'mention';
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
}
```

### Criteri di Accettazione

- [ ] Icona campanella con badge (contatore non letti, max 99+)
- [ ] Dropdown con ultime 10 notifiche
- [ ] Segna come letto (singolo o tutti)
- [ ] Click su notifica → naviga alla pagina rilevante
- [ ] Aggiornamenti in tempo reale via WebSocket
- [ ] Persistenza in database
- [ ] Suono su nuova notifica (opzionale, configurabile)
- [ ] Pagina "Tutte le notifiche" con paginazione e filtri

---

## ✅ Perché 13 Punti?

| Criterio     | Valutazione                     |
| ------------ | ------------------------------- |
| Architettura | Più sistemi integrati           |
| Stato        | Gestione stato complessa        |
| Componenti   | 10+ file nuovi/modificati       |
| Persistenza  | Database + endpoint API         |
| Test         | Alto sforzo di testing          |
| Rischio      | Casi limite e scenari di errore |
