# 3 Story Points – Modifications Petites à Moyennes

> **Effort :** 0,5–1 jour
> **Risque :** Modéré
> **Tests :** Tests unitaires et d'intégration recommandés

---

## Exemple 1 : Liste Filtrable

**Titre :** Filtrer la Liste des Tâches par Statut

**Description :**
La liste des tâches doit être filtrable par statut (Ouvert, En cours, Terminé). Boutons de filtre au-dessus de la liste.

**Critères d'Acceptation :**

- [ ] Boutons de filtre pour chaque statut
- [ ] Option "Tous"
- [ ] Paramètre URL pour le filtre (`?status=open`)
- [ ] Affichage d'état vide quand 0 résultat

---

## Exemple 2 : Formulaire avec Validation

**Titre :** Formulaire d'Inscription avec Validation en Temps Réel

**Description :**
Champs : Email, Mot de passe, Confirmation du mot de passe. Validation au blur et à la soumission.

**Critères d'Acceptation :**

- [ ] Valider le format email
- [ ] Mot de passe minimum 8 caractères
- [ ] Les mots de passe doivent correspondre
- [ ] Afficher les erreurs en ligne

---

## Exemple 3 : Tri Simple par Glisser-Déposer

**Titre :** Réorganiser les Tâches par Glisser-Déposer

**Description :**
Les tâches dans une liste doivent être réorganisables par glisser-déposer. Le nouvel ordre est sauvegardé.

**Critères d'Acceptation :**

- [ ] Poignée de glissement sur chaque tâche
- [ ] Aperçu visuel pendant le glissement
- [ ] Sauvegarde après le dépôt
- [ ] Support tactile

---

## Pourquoi 3 Points ?

- Plusieurs états à gérer
- Modifications UI et logique
- Complexité modérée
- Cas limites possibles
