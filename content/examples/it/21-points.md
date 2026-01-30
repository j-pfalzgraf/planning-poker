# 21 Story Point – Modifiche Molto Grandi

> **Impegno:** 1–2 settimane
> **Rischio:** Alto
> **Test:** Suite di test completa + revisione QA

---

## Esempio 1: Permessi Basati sui Ruoli

**Titolo:** Implementare Sistema di Ruoli e Permessi

**Descrizione:**
Introduzione di ruoli (Admin, Manager, Utente) con permessi granulari. Gli elementi UI e gli endpoint API sono protetti di conseguenza.

**Criteri di Accettazione:**

- [ ] Ruoli: Admin, Manager, Utente, Ospite
- [ ] Permessi per funzionalità (CRUD)
- [ ] UI Admin per gestione ruoli
- [ ] Frontend: Visualizzazione condizionale degli elementi
- [ ] Backend: Middleware per autorizzazione
- [ ] Audit log per modifiche ai permessi
- [ ] Migrazione degli utenti esistenti

---

## Esempio 2: Multi-Tenancy

**Titolo:** Introdurre Supporto Multi-Tenant

**Descrizione:**
L'applicazione deve supportare più tenant (aziende) indipendenti. Separazione rigorosa dei dati.

**Criteri di Accettazione:**

- [ ] Tenant ID in tutte le tabelle rilevanti
- [ ] Rilevamento tenant basato su sottodominio o header
- [ ] Switcher tenant per super admin
- [ ] Dati isolati per tenant
- [ ] Configurazione specifica per tenant
- [ ] Migrazione dei dati esistenti

---

## Esempio 3: Internazionalizzazione (i18n)

**Titolo:** Supporto Multi-Lingua Completo (EN, DE, FR)

**Descrizione:**
L'intera applicazione deve essere disponibile in tre lingue. Cambio lingua dinamico senza ricaricamento.

**Criteri di Accettazione:**

- [ ] Tutti i testi UI esternalizzati
- [ ] File di lingua per EN, DE, FR
- [ ] Selettore lingua nell'header
- [ ] Lingua salvabile nelle impostazioni utente
- [ ] Formati data e numeri localizzati
- [ ] Supporto RTL preparato

---

## Perché 21 Punti?

- Modifiche ampie in tutto il sistema
- Impatto sull'architettura
- Alto rischio di regressioni
- Migrazione complessa
- Testing intensivo richiesto
