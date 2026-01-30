# 21 Story Points – Mycket stora ändringar

> **Arbetsinsats:** 1–2 veckor
> **Risk:** Hög
> **Tester:** Omfattande testsvit + QA-granskning

---

## Exempel 1: Rollbaserade behörigheter

**Titel:** Implementera roll- och behörighetssystem

**Beskrivning:**
Införande av roller (Admin, Manager, Användare) med granulära behörigheter. UI-element och API-endpoints skyddas i enlighet med detta.

**Acceptanskriterier:**

- [ ] Roller: Admin, Manager, Användare, Gäst
- [ ] Behörigheter per funktion (CRUD)
- [ ] Admin-UI för rollhantering
- [ ] Frontend: Villkorlig visning av element
- [ ] Backend: Middleware för auktorisering
- [ ] Granskningslogg för behörighetsändringar
- [ ] Migrering av befintliga användare

---

## Exempel 2: Multi-Tenancy

**Titel:** Införa stöd för flera hyresgäster

**Beskrivning:**
Applikationen ska stödja flera oberoende hyresgäster (företag). Strikt dataseparering.

**Acceptanskriterier:**

- [ ] Tenant-ID i alla relevanta tabeller
- [ ] Subdomän- eller header-baserad tenant-detektering
- [ ] Tenant-växlare för superadmins
- [ ] Isolerad data per tenant
- [ ] Tenant-specifik konfiguration
- [ ] Migrering av befintlig data

---

## Exempel 3: Internationalisering (i18n)

**Titel:** Komplett flerspråksstöd (EN, DE, FR)

**Beskrivning:**
Hela applikationen ska vara tillgänglig på tre språk. Dynamisk språkväxling utan omladdning.

**Acceptanskriterier:**

- [ ] Alla UI-texter externaliserade
- [ ] Språkfiler för EN, DE, FR
- [ ] Språkväxlare i header
- [ ] Språk kan sparas i användarinställningar
- [ ] Datum- och talformat lokaliserade
- [ ] RTL-stöd förberett

---

## Varför 21 poäng?

- Breda ändringar över hela systemet
- Arkitekturpåverkan
- Hög risk för regressioner
- Komplex migrering
- Intensiv testning krävs
