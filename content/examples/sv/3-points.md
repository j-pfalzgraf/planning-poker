# 3 Story Points – Små till medelstora ändringar

> **Arbetsinsats:** 0,5–1 dag
> **Risk:** Måttlig
> **Tester:** Enhets- och integrationstester rekommenderas

---

## Exempel 1: Filterbar lista

**Titel:** Filtrera uppgiftslista efter status

**Beskrivning:**
Uppgiftslistan ska kunna filtreras efter status (Öppen, Pågående, Slutförd). Filterknappar ovanför listan.

**Acceptanskriterier:**

- [ ] Filterknappar för varje status
- [ ] "Alla"-alternativ
- [ ] URL-parameter för filter (`?status=open`)
- [ ] Visning av tomt tillstånd vid 0 resultat

---

## Exempel 2: Formulär med validering

**Titel:** Registreringsformulär med realtidsvalidering

**Beskrivning:**
Fält: E-post, Lösenord, Bekräfta lösenord. Validering vid blur och submit.

**Acceptanskriterier:**

- [ ] Validera e-postformat
- [ ] Lösenord minst 8 tecken
- [ ] Lösenorden måste matcha
- [ ] Visa fel inline

---

## Exempel 3: Enkel dra och släpp-sortering

**Titel:** Ordna om uppgifter via dra och släpp

**Beskrivning:**
Uppgifter i en lista ska kunna ordnas om via dra och släpp. Ny ordning sparas.

**Acceptanskriterier:**

- [ ] Draghandtag på varje uppgift
- [ ] Visuell förhandsgranskning under dragning
- [ ] Spara efter släpp
- [ ] Touch-stöd

---

## Varför 3 poäng?

- Flera tillstånd att hantera
- UI- och logikändringar
- Måttlig komplexitet
- Möjliga kantfall
