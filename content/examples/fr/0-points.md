# 0 Story Point – Modifications Triviales

> **Effort :** Minimal, souvent moins de 15 minutes
> **Risque :** Quasi nul
> **Tests :** Généralement non requis
> **Complexité :** Aucune

---

## 📋 Exemple 1 : Activer un Feature Flag

### User Story

> En tant que **Product Owner** je veux **activer la fonctionnalité Mode Sombre**, afin que **nos utilisateurs puissent l'utiliser immédiatement**.

### Contexte

La fonctionnalité Mode Sombre est entièrement implémentée et testée, mais a été retenue lors de la dernière release. Elle doit maintenant être activée en modifiant un feature flag.

### Implémentation

```json
// config/features.json
{
  "darkMode": true,  // ← Modification : false → true
  "betaFeatures": false,
  "newCheckout": true
}
```

### Critères d'Acceptation

- [ ] Définir le feature flag dans `config/features.json` à `true`
- [ ] Créer et fusionner la PR
- [ ] Déclencher le déploiement
- [ ] Tester le Mode Sombre en production

### Évaluation des Risques

| Aspect       | Évaluation            |
| ------------ | --------------------- |
| Modification | 1 ligne               |
| Tests        | Test de fumée         |
| Rollback     | Réinitialiser le flag |

---

## 📋 Exemple 2 : Modifier une Variable d'Environnement

### User Story

> En tant qu'**Ingénieur DevOps** je veux **augmenter le timeout de l'API**, afin que **les requêtes API lentes n'échouent plus**.

### Contexte

Certains appels API vers un service tiers lent expirent. Le timeout actuel de 5 secondes doit être augmenté à 10 secondes.

### Modification

```bash
# .env.production
API_TIMEOUT=10000  # était : 5000
```

### Critères d'Acceptation

- [ ] Définir `API_TIMEOUT=10000` dans `.env.production`
- [ ] Aucune modification de code requise
- [ ] Redéployer pour activer
- [ ] Surveiller les erreurs de timeout

---

## 📋 Exemple 3 : Corriger une Faute de Frappe

### User Story

> En tant qu'**Utilisateur** je veux **voir un texte correct dans l'application**, afin que **le produit paraisse professionnel**.

### Problème

Le pied de page du site affiche **"Contcat"** au lieu de **"Contact"**.

### Solution

```vue
<!-- app/components/Footer.vue -->
<template>
  <footer>
    <a href="/contact">Contact</a>  <!-- était : Contcat -->
  </footer>
</template>
```

### Critères d'Acceptation

- [ ] Corriger la faute de frappe dans `Footer.vue`
- [ ] Vérifier si la même erreur existe ailleurs
- [ ] Vérifier visuellement dans le navigateur
