# 21 Story Points – Zeer Grote Wijzigingen

> **Inspanning:** 1–2 weken
> **Risico:** Hoog
> **Tests:** Uitgebreide testsuite + QA review

---

## Voorbeeld 1: Rolgebaseerde Permissies

**Titel:** Implementeer Rol- en Permissiesysteem

**Beschrijving:**
Introductie van rollen (Admin, Manager, Gebruiker) met gedetailleerde permissies. UI-elementen en API endpoints worden dienovereenkomstig beveiligd.

**Acceptatiecriteria:**

- [ ] Rollen: Admin, Manager, Gebruiker, Gast
- [ ] Permissies per functie (CRUD)
- [ ] Admin UI voor rolbeheer
- [ ] Frontend: Conditionele weergave van elementen
- [ ] Backend: Middleware voor autorisatie
- [ ] Audit log voor permissiewijzigingen
- [ ] Migratie van bestaande gebruikers

---

## Voorbeeld 2: Multi-Tenancy

**Titel:** Introduceer Multi-Tenant Ondersteuning

**Beschrijving:**
De applicatie moet meerdere onafhankelijke tenants (bedrijven) ondersteunen. Strikte gegevensscheiding.

**Acceptatiecriteria:**

- [ ] Tenant ID in alle relevante tabellen
- [ ] Subdomein of header-gebaseerde tenant detectie
- [ ] Tenant wisselaar voor super admins
- [ ] Geïsoleerde gegevens per tenant
- [ ] Tenant-specifieke configuratie
- [ ] Migratie van bestaande gegevens

---

## Voorbeeld 3: Internationalisatie (i18n)

**Titel:** Volledige Meertalige Ondersteuning (EN, DE, FR)

**Beschrijving:**
De gehele applicatie moet beschikbaar zijn in drie talen. Dynamisch wisselen van taal zonder herladen.

**Acceptatiecriteria:**

- [ ] Alle UI-teksten geëxternaliseerd
- [ ] Taalbestanden voor EN, DE, FR
- [ ] Taalwisselaar in header
- [ ] Taal opslaanbaar in gebruikersinstellingen
- [ ] Datum- en getalformaten gelokaliseerd
- [ ] RTL ondersteuning voorbereid

---

## Waarom 21 Punten?

- Brede wijzigingen door het gehele systeem
- Impact op architectuur
- Hoog risico op regressies
- Complexe migratie
- Intensief testen vereist
