# 100 Story Points – Monumentale Änderungen

> **Aufwand:** 1–3 Monate
> **Risiko:** Extrem hoch
> **Tests:** Vollständige Regression, Performance- und Sicherheitstests
> ⚠️ **WARNUNG:** Muss in Epics/Stories aufgeteilt werden!

---

## Beispiel 1: Komplette Architektur-Migration

**Titel:** Monolith zu Microservices-Migration

**Beschreibung:**
Die bestehende monolithische Anwendung soll auf eine Microservices-Architektur migriert werden.

**Akzeptanzkriterien:**

- [ ] Service-Grenzen definiert
- [ ] API Gateway implementiert
- [ ] Services: Auth, User, Orders, Products, Notifications
- [ ] Event-basierte Kommunikation (Kafka/RabbitMQ)
- [ ] Distributed Tracing
- [ ] Container-Orchestrierung (K8s)
- [ ] CI/CD pro Service
- [ ] Datenmigration
- [ ] Schrittweise Ablösung (Strangler Pattern)

---

## Beispiel 2: Mobile App (Cross-Platform)

**Titel:** Native Mobile App für iOS und Android

**Beschreibung:**
Entwicklung einer vollständigen mobilen App mit allen Kernfunktionen der Web-Anwendung.

**Akzeptanzkriterien:**

- [ ] React Native / Flutter App
- [ ] Feature-Parität mit Web (Kernfunktionen)
- [ ] Push-Benachrichtigungen
- [ ] Offline-Modus
- [ ] Biometrische Authentifizierung
- [ ] App-Store-Veröffentlichung (iOS + Android)
- [ ] Deep Linking
- [ ] Analytics-Integration

---

## Beispiel 3: Enterprise SSO & Compliance

**Titel:** Enterprise-Sicherheitspaket

**Beschreibung:**
Implementierung von Enterprise-Sicherheitsfunktionen: SAML/OIDC SSO, SCIM-Provisioning, Audit-Logs, DSGVO-Compliance-Tools.

**Akzeptanzkriterien:**

- [ ] SAML 2.0 und OIDC-Unterstützung
- [ ] SCIM für Nutzer-Provisioning
- [ ] Audit-Log aller Aktionen
- [ ] Datenexport (DSGVO Art. 20)
- [ ] Datenlöschung (DSGVO Art. 17)
- [ ] SOC-2-Compliance-Dokumentation
- [ ] Penetrationstest bestanden

---

## Warum 100 Punkte?

- **Zu groß für eine Story!**
- Muss in Epics mit vielen Stories aufgeteilt werden
- Monate an Entwicklungszeit
- Architektur-Transformation
- Höchstes Risiko
- Erfordert dediziertes Team

---

## ⚠️ Wichtiger Hinweis

Eine Story mit 100 Punkten ist **keine Story** – sie ist ein **Projekt** oder **Epic**.

**Empfohlenes Vorgehen:**

1. In Epics aufteilen
2. Epics in Stories splitten (max. 13 Punkte)
3. Iterativ liefern
4. Regelmäßig validieren
