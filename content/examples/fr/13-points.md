# 13 Story Points – Modifications Majeures

> **Effort :** 3–5 jours
> **Risque :** Élevé
> **Tests :** Couverture de tests complète requise
> **Complexité :** Élevée

---

## 📋 Exemple 1 : Assistant d'Onboarding Multi-Étapes

### Epic

> En tant que **nouveau client** je veux **être guidé à travers un processus de configuration** afin de **pouvoir utiliser le système de manière productive le plus rapidement possible**.

### Contexte

Les nouveaux clients doivent actuellement trouver tous les paramètres manuellement. Un assistant en 4 étapes doit les guider à travers les étapes les plus importantes et réduire le time-to-value.

### Flux de l'Assistant

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Étape 1   │───▶│   Étape 2   │───▶│   Étape 3   │───▶│   Étape 4   │
│  Entreprise │    │  Contact    │    │  Paiement   │    │  Résumé     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      │                  │                  │                  │
      ▼                  ▼                  ▼                  ▼
   Validation        Validation        Validation         Soumettre
   sauvegarder       sauvegarder       sauvegarder        toutes les données
```

### Détail des Étapes

| Étape                 | Champs                   | Validation                    |
| --------------------- | ------------------------ | ----------------------------- |
| 1. Données Entreprise | Nom, Adresse, N° TVA     | Requis, Format N° TVA         |
| 2. Personne Contact   | Nom, Email, Téléphone    | Format email, Requis          |
| 3. Mode de Paiement   | Virement ou Carte        | Vérification numéro compte/CB |
| 4. Résumé             | Toutes données (lecture) | Confirmation                  |

### Composants Techniques

```typescript
// Gestion d'état
interface OnboardingState {
  currentStep: 1 | 2 | 3 | 4;
  company: CompanyData | null;
  contact: ContactData | null;
  payment: PaymentData | null;
  isDirty: boolean;
  errors: Record<string, string[]>;
}

// Stockage intermédiaire
const STORAGE_KEY = 'onboarding_draft';
localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
```

### Critères d'Acceptation

- [ ] Indicateur de progression affiche l'étape actuelle (1/4, 2/4, ...)
- [ ] Validation par étape au clic sur Suivant
- [ ] Navigation retour sans perte de données
- [ ] Sauvegarde auto dans LocalStorage toutes les 30s et au blur
- [ ] Avertissement en quittant la page avec données non sauvegardées
- [ ] Résumé final avec liens d'édition vers chaque étape
- [ ] Gestion d'erreur à la soumission (logique de retry)
- [ ] Optimisé mobile (stepper vertical)
- [ ] Navigation clavier (Tab, Entrée)

### Scénarios de Test

1. **Cas nominal :** Remplir toutes les étapes → Terminé avec succès
2. **Erreur de validation :** Numéro de compte invalide → Afficher erreur
3. **Abandon :** Fermer l'onglet à l'étape 2 → Restaurer données à la réouverture
4. **Erreur réseau :** Échec de soumission → Afficher bouton réessayer

---

## 📋 Exemple 2 : Tableau de Bord Personnalisable avec Widgets

### User Story

> En tant qu'**utilisateur avancé** je veux **personnaliser mon tableau de bord avec des widgets** afin de **voir les informations importantes pour moi en un coup d'œil**.

### Périmètre Fonctionnel

- **Bibliothèque de Widgets :** 8 widgets prédéfinis
- **Glisser-Déposer :** Positionnement libre
- **Redimensionnement :** Modifier la taille via poignée
- **Persistance :** La disposition est sauvegardée

### Widgets Disponibles

| Widget             | Tailles       | Source de Données        |
| ------------------ | ------------- | ------------------------ |
| Graphique Revenus  | 1x1, 2x1, 2x2 | `/api/stats/revenue`     |
| Commandes Récentes | 1x2, 2x2      | `/api/orders?limit=10`   |
| Liste de Tâches    | 1x1, 1x2      | `/api/tasks?status=open` |
