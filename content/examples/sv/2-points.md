# 2 Story Points – Små ändringar

> **Arbetsinsats:** En halv dag
> **Risk:** Låg till måttlig
> **Tester:** Enhetstester rekommenderas

---

## Exempel 1: Nytt formulärfält

**Titel:** Valfritt telefonnummerfält i kontaktformuläret

**Beskrivning:**
Ett valfritt inmatningsfält för telefonnummer ska läggas till i kontaktformuläret. Formatvalidering för amerikanska/internationella nummer.

**Acceptanskriterier:**

- [ ] Nytt `phone`-fält i formuläret
- [ ] Etikett: "Telefon (valfritt)"
- [ ] Validering: Endast siffror, +, -, mellanslag tillåtna
- [ ] Fältet skickas till backend

---

## Exempel 2: Lägg till sorteringsalternativ

**Titel:** Sortera produktlista efter pris

**Beskrivning:**
Ett sorteringsalternativ "Pris stigande/fallande" ska läggas till i produktöversikten.

**Acceptanskriterier:**

- [ ] Dropdown med sorteringsalternativ
- [ ] Sortering på klientsidan
- [ ] Aktiv sortering visuellt markerad

---

## Exempel 3: Bekräftelsedialog

**Titel:** Visa bekräftelsedialog vid radering

**Beskrivning:**
Innan en post raderas ska en modal visas: "Är du säker på att du vill radera?"

**Acceptanskriterier:**

- [ ] Modal med "Ja" / "Avbryt"
- [ ] Radering endast vid bekräftelse
