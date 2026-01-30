# ? Story Points – Okänd arbetsinsats

> **Arbetsinsats:** Kan inte uppskattas
> **Risk:** Okänd
> **Åtgärd:** Spike/Research krävs

---

## När används "?"?

"?"-kortet signalerar att en story **inte kan uppskattas** eftersom:

- Kraven är oklara
- Teknisk genomförbarhet är osäker
- Det finns för många okända faktorer
- Mer kontext behövs

---

## Exempel 1: Oklara krav

**Titel:** Dataimport från äldre system

**Beskrivning:**
Data från det gamla systemet ska importeras.

**Varför "?":**

- Vilket format har datan?
- Hur många poster?
- Vilka fält ska mappas?
- Finns det valideringsregler?

**Nästa steg:**
Möte med intressent för att klargöra kraven.

---

## Exempel 2: Teknisk osäkerhet

**Titel:** Integration med tredje parts API

**Beskrivning:**
Anslut till leverantör XY:s API.

**Varför "?":**

- API-dokumentation inte granskad
- Autentiseringsmetod oklar
- Rate limits okända
- Sandbox-åtkomst saknas

**Nästa steg:**
Spike: Granska API-dokumentation, testa sandbox.

---

## Exempel 3: Genomförbarhetsfråga

**Titel:** Optimering av sökprestanda

**Beskrivning:**
Sökningen ska bli snabbare.

**Varför "?":**

- Nuvarande prestanda inte mätt
- Mål inte definierat (hur snabbt?)
- Rotorsak till problemet okänd

**Nästa steg:**
Utför prestandaanalys, samla in mätvärden.

---

## Rekommenderat tillvägagångssätt

1. **Skjut upp storyn** – Lägg inte till i sprinten
2. **Planera en spike** – Tidsbegränsad research (t.ex. 4h, 1 dag)
3. **Dokumentera fynd** – Registrera insikter
4. **Uppskatta storyn igen** – Uppskatta igen med ny kunskap
5. **Dela eventuellt** – Bryt ner i mindre, uppskattningsbara stories

---

## ⚠️ Notering

"?" är **inte en giltig uppskattning** för sprinten.
Det är en signal till teamet att **förarbete behövs**.
