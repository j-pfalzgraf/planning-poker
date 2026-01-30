# 100 Story Points – Monumentala ändringar

> **Arbetsinsats:** 1–3 månader
> **Risk:** Extremt hög
> **Tester:** Komplett regression, prestanda- och säkerhetstester
> ⚠️ **VARNING:** Måste delas upp i epics/stories!

---

## Exempel 1: Komplett arkitekturmigrering

**Titel:** Migrering från monolit till mikrotjänster

**Beskrivning:**
Den befintliga monolitiska applikationen ska migreras till en mikrotjänstarkitektur.

**Acceptanskriterier:**

- [ ] Tjänstegränser definierade
- [ ] API Gateway implementerad
- [ ] Tjänster: Auth, User, Orders, Products, Notifications
- [ ] Eventbaserad kommunikation (Kafka/RabbitMQ)
- [ ] Distribuerad spårning
- [ ] Container-orkestrering (K8s)
- [ ] CI/CD per tjänst
- [ ] Datamigrering
- [ ] Gradvis ersättning (Strangler Pattern)

---

## Exempel 2: Mobilapp (Plattformsoberoende)

**Titel:** Native mobilapp för iOS och Android

**Beskrivning:**
Utveckling av en komplett mobilapp med alla kärnfunktioner från webbapplikationen.

**Acceptanskriterier:**

- [ ] React Native / Flutter-app
- [ ] Funktionsparitet med webb (kärnfunktioner)
- [ ] Push-notifikationer
- [ ] Offline-läge
- [ ] Biometrisk autentisering
- [ ] App Store-deployment (iOS + Android)
- [ ] Djuplänkning
- [ ] Analysintegration

---

## Exempel 3: Enterprise SSO & Compliance

**Titel:** Enterprise-säkerhetspaket

**Beskrivning:**
Implementation av enterprise-säkerhetsfunktioner: SAML/OIDC SSO, SCIM-provisioning, granskningsloggar, GDPR-efterlevnadsverktyg.

**Acceptanskriterier:**

- [ ] SAML 2.0 och OIDC-stöd
- [ ] SCIM för användarprovisioning
- [ ] Granskningslogg för alla åtgärder
- [ ] Dataexport (GDPR Art. 20)
- [ ] Dataradering (GDPR Art. 17)
- [ ] SOC 2-efterlevnadsdokumentation
- [ ] Penetrationstest godkänt

---

## Varför 100 poäng?

- **För stor för en story!**
- Måste delas upp i epics med många stories
- Månaders utvecklingstid
- Arkitekturtransformation
- Högsta risk
- Kräver dedikerat team

---

## ⚠️ Viktig notering

En story med 100 poäng är **inte en story** – det är ett **projekt** eller **epic**.

**Rekommenderat tillvägagångssätt:**

1. Dela upp i epics
2. Dela upp epics i stories (max 13 poäng)
3. Leverera iterativt
4. Validera regelbundet
