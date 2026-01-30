# 21 Story Points – Modifications Très Importantes

> **Effort :** 1–2 semaines
> **Risque :** Élevé
> **Tests :** Suite de tests complète + revue QA

---

## Exemple 1 : Permissions Basées sur les Rôles

**Titre :** Implémenter un Système de Rôles et Permissions

**Description :**
Introduction de rôles (Admin, Manager, Utilisateur) avec des permissions granulaires. Les éléments UI et endpoints API sont protégés en conséquence.

**Critères d'Acceptation :**

- [ ] Rôles : Admin, Manager, Utilisateur, Invité
- [ ] Permissions par fonctionnalité (CRUD)
- [ ] Interface admin pour la gestion des rôles
- [ ] Frontend : Affichage conditionnel des éléments
- [ ] Backend : Middleware pour l'autorisation
- [ ] Journal d'audit pour les modifications de permissions
- [ ] Migration des utilisateurs existants

---

## Exemple 2 : Multi-Tenancy

**Titre :** Introduire le Support Multi-Tenant

**Description :**
L'application doit supporter plusieurs tenants indépendants (entreprises). Séparation stricte des données.

**Critères d'Acceptation :**

- [ ] ID Tenant dans toutes les tables concernées
- [ ] Détection du tenant par sous-domaine ou header
- [ ] Sélecteur de tenant pour les super admins
- [ ] Données isolées par tenant
- [ ] Configuration spécifique par tenant
- [ ] Migration des données existantes

---

## Exemple 3 : Internationalisation (i18n)

**Titre :** Support Multi-Langue Complet (EN, DE, FR)

**Description :**
L'application entière doit être disponible en trois langues. Changement de langue dynamique sans rechargement.

**Critères d'Acceptation :**

- [ ] Tous les textes UI externalisés
- [ ] Fichiers de langue pour EN, DE, FR
- [ ] Sélecteur de langue dans l'en-tête
- [ ] Langue enregistrable dans les paramètres utilisateur
- [ ] Formats de date et nombre localisés
- [ ] Support RTL préparé

---

## Pourquoi 21 Points ?

- Modifications étendues sur l'ensemble du système
- Impact sur l'architecture
- Risque élevé de régressions
- Migration complexe
- Tests intensifs requis
