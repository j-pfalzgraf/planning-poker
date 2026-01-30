# 40 Story Points – Modifications Épiques

> **Effort :** 2–4 semaines
> **Risque :** Très élevé
> **Tests :** Régression complète + tests de performance
> ⚠️ **Recommandation :** Diviser en stories plus petites !

---

## Exemple 1 : Collaboration en Temps Réel

**Titre :** Édition Simultanée de Documents

**Description :**
Plusieurs utilisateurs peuvent éditer le même document simultanément. Les modifications sont synchronisées en temps réel (style Google Docs).

**Critères d'Acceptation :**

- [ ] Transformation Opérationnelle ou CRDT
- [ ] Synchronisation basée sur WebSocket
- [ ] Position du curseur des autres utilisateurs visible
- [ ] Résolution des conflits
- [ ] Support hors-ligne avec synchronisation
- [ ] Historique des versions
- [ ] Performance avec 10+ utilisateurs simultanés

---

## Exemple 2 : Moteur de Workflow

**Titre :** Workflow d'Approbation Configurable

**Description :**
Les admins peuvent définir des workflows d'approbation : étapes, conditions, escalades, notifications.

**Critères d'Acceptation :**

- [ ] Éditeur visuel de workflow
- [ ] Étapes : Approbation, Condition, Action
- [ ] Approbateurs basés sur les rôles
- [ ] Escalade en cas de timeout
- [ ] Notifications email et in-app
- [ ] Piste d'audit
- [ ] Chemins parallèles et séquentiels

---

## Exemple 3 : Module de Reporting

**Titre :** Système de Rapports Personnalisés

**Description :**
Les utilisateurs peuvent créer des rapports personnalisés : sélectionner les sources de données, définir les filtres, choisir la visualisation, exporter en PDF/Excel.

**Critères d'Acceptation :**

- [ ] Interface de création de rapports
- [ ] Sélection des sources de données
- [ ] Filtres et regroupements
- [ ] Types de graphiques : Barres, Lignes, Camembert, Tableau
- [ ] Rapports enregistrables
- [ ] Exécution planifiée
- [ ] Export : PDF, Excel, CSV
- [ ] Permissions par rapport

---

## Pourquoi 40 Points ?

- Plusieurs semaines de développement
- Architecture très complexe
- Nombreuses dépendances
- Risque élevé
- **Devrait être découpé en stories plus petites !**
