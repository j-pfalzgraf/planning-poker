# 2 Story Points – Petites Modifications

> **Effort :** Une demi-journée
> **Risque :** Faible à modéré
> **Tests :** Tests unitaires recommandés

---

## Exemple 1 : Nouveau Champ de Formulaire

**Titre :** Champ Numéro de Téléphone Optionnel dans le Formulaire de Contact

**Description :**
Un champ de saisie optionnel pour le numéro de téléphone doit être ajouté au formulaire de contact. Validation du format pour les numéros français/internationaux.

**Critères d'Acceptation :**

- [ ] Nouveau champ `phone` dans le formulaire
- [ ] Libellé : "Téléphone (optionnel)"
- [ ] Validation : Uniquement chiffres, +, -, espaces autorisés
- [ ] Le champ est envoyé au backend

---

## Exemple 2 : Ajouter une Option de Tri

**Titre :** Trier la Liste de Produits par Prix

**Description :**
Une option de tri "Prix croissant/décroissant" doit être ajoutée à la vue d'ensemble des produits.

**Critères d'Acceptation :**

- [ ] Liste déroulante avec options de tri
- [ ] Tri côté client
- [ ] Tri actif visuellement mis en évidence

---

## Exemple 3 : Dialogue de Confirmation

**Titre :** Afficher un Dialogue de Confirmation lors de la Suppression

**Description :**
Avant de supprimer une entrée, une modale doit apparaître : "Êtes-vous sûr de vouloir supprimer ?"

**Critères d'Acceptation :**

- [ ] Modale avec "Oui" / "Annuler"
- [ ] Suppression uniquement sur confirmation
- [ ] La modale peut être fermée avec ESC

---

## Pourquoi 2 Points ?

- Plusieurs composants concernés
- Logique simple
- Effort de test gérable
- Faible risque d'effets de bord
