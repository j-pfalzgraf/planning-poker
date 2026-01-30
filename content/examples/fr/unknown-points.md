# ? Story Points – Effort Inconnu

> **Effort :** Ne peut pas être estimé
> **Risque :** Inconnu
> **Action :** Spike/Recherche nécessaire

---

## Quand Utilise-t-on "?" ?

La carte "?" signale qu'une story **ne peut pas être estimée** car :

- Les exigences sont floues
- La faisabilité technique est incertaine
- Trop d'inconnues existent
- Plus de contexte est nécessaire

---

## Exemple 1 : Exigences Floues

**Titre :** Import de Données depuis le Système Legacy

**Description :**
Les données de l'ancien système doivent être importées.

**Pourquoi "?" :**

- Quel est le format des données ?
- Combien d'enregistrements ?
- Quels champs sont mappés ?
- Y a-t-il des règles de validation ?

**Prochaine Étape :**
Réunion avec le stakeholder pour clarifier les exigences.

---

## Exemple 2 : Incertitude Technique

**Titre :** Intégration avec API Tierce

**Description :**
Se connecter à l'API du fournisseur XY.

**Pourquoi "?" :**

- Documentation API non consultée
- Méthode d'authentification inconnue
- Limites de débit inconnues
- Accès sandbox manquant

**Prochaine Étape :**
Spike : Consulter la documentation API, tester le sandbox.

---

## Exemple 3 : Question de Faisabilité

**Titre :** Optimisation des Performances de Recherche

**Description :**
La recherche doit être plus rapide.

**Pourquoi "?" :**

- Performance actuelle non mesurée
- Objectif non défini (quelle vitesse ?)
- Cause racine du problème inconnue

**Prochaine Étape :**
Effectuer une analyse de performance, collecter des métriques.

---

## Approche Recommandée

1. **Reporter la story** – Ne pas ajouter au sprint
2. **Planifier un spike** – Recherche timeboxée (ex. 4h, 1 jour)
3. **Documenter les conclusions** – Consigner les découvertes
4. **Ré-estimer la story** – Estimer à nouveau avec les nouvelles connaissances
5. **Éventuellement diviser** – Découper en stories plus petites et estimables

---

## ⚠️ Note

"?" n'est **pas une estimation valide** pour le sprint.
C'est un signal à l'équipe qu'un **travail préparatoire est nécessaire**.
