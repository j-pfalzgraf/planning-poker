# 1 Story Point – Très Petites Modifications

> **Effort :** 1–2 heures
> **Risque :** Faible
> **Tests :** Test de fumée recommandé
> **Complexité :** Minimale

---

## 📋 Exemple 1 : Remplacer une Icône

### User Story

> En tant qu'**Utilisateur** je veux **voir une icône de sauvegarde moderne**, afin que **l'interface soit plus contemporaine**.

### Contexte

Le bouton "Sauvegarder" utilise actuellement une icône de disquette (`floppy-disk`). Comme les disquettes ne sont plus courantes, elle doit être remplacée par une icône de coche.

### Détails Techniques

```text
Fichier concerné : app/components/SaveButton.vue
Bibliothèque d'icônes : @heroicons/vue
Ancienne icône : FloppyDiskIcon
Nouvelle icône : CheckIcon
```

### Critères d'Acceptation

- [ ] Remplacer l'icône dans `SaveButton.vue` de `FloppyDiskIcon` à `CheckIcon`
- [ ] Mettre à jour l'import de l'icône
- [ ] La taille reste à `w-5 h-5`
- [ ] Vérification visuelle sur desktop et mobile
- [ ] Aucune modification fonctionnelle

### Definition of Done

- [ ] Revue de code effectuée
- [ ] Testé en staging
- [ ] Captures d'écran documentées dans le ticket

---

## 📋 Exemple 2 : Ajouter une Infobulle

### User Story

> En tant que **Client** je veux **comprendre si le prix inclut la TVA**, afin de **ne pas avoir de surprises au moment du paiement**.

### Contexte

L'icône d'information (`ℹ`) à côté du champ prix doit afficher une infobulle avec le texte "TVA incluse" au survol. Le composant infobulle existe déjà dans le projet.

### Détails Techniques

```vue
<template>
  <Tooltip text="TVA incluse">
    <InfoIcon class="w-4 h-4 text-gray-400 cursor-help" />
  </Tooltip>
</template>
```

### Critères d'Acceptation

- [ ] Utiliser le composant infobulle de `@/components/ui/Tooltip.vue`
- [ ] Texte : "TVA incluse"
- [ ] L'infobulle apparaît au survol et au focus (accessibilité)
- [ ] Délai : 200ms avant affichage
- [ ] Position : centre en haut

---

## 📋 Exemple 3 : Ajustement CSS selon la Charte Graphique

### User Story

> En tant que **Responsable de Marque** je veux **ajuster la couleur du bouton à la nouvelle charte graphique**, afin que **tous les produits aient un aspect uniforme**.

### Contexte

Le bouton principal utilise `#0066cc`, selon la nouvelle charte graphique il doit être `#0052a3`.

### Détails Techniques

| Propriété  | Ancien    | Nouveau   |
| ---------- | --------- | --------- |
| Background | `#0066cc` | `#0052a3` |
| Hover      | `#0055b3` | `#003d7a` |

**Fichier :** `tailwind.config.ts`

```typescript
primary: {
  500: '#0052a3', // était : #0066cc
  600: '#003d7a', // était : #0055b3
}
```
