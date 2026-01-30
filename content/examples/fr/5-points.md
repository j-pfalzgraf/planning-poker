# 5 Story Points – Modifications Moyennes

> **Effort :** 1–2 jours
> **Risque :** Modéré
> **Tests :** Tests unitaires, d'intégration et E2E recommandés
> **Complexité :** Moyenne

---

## 📋 Exemple 1 : Export CSV pour les Commandes

### User Story

> En tant qu'**administrateur de boutique** je veux **exporter toutes les commandes affichées en CSV** afin de **pouvoir traiter les données dans Excel**.

### Contexte

L'aperçu des commandes affiche actuellement jusqu'à 100 commandes. Un nouveau bouton d'export doit les télécharger en fichier CSV. Les filtres actifs doivent être respectés.

### Architecture Technique

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   ExportButton  │────▶│   OrderService  │────▶│   CSV-Generator │
│   (Frontend)    │     │   (Appel API)   │     │   (Backend)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                                               │
         │◀──────────────── Téléchargement Blob ◀────────┘
```

### Spécification API

```http
GET /api/orders/export?status=pending&from=2024-01-01
Accept: text/csv

Réponse :
Content-Type: text/csv; charset=utf-8
Content-Disposition: attachment; filename="commandes-2024-01-15.csv"
```

### Format CSV

```csv
NumCommande;Date;Client;Articles;Total
ORD-2024-001;15/01/2024;Jean Dupont;3;149,99 €
ORD-2024-002;15/01/2024;Marie Martin;1;29,99 €
```

### Critères d'Acceptation

- [ ] Bouton "Exporter en CSV" en haut à droite de l'aperçu des commandes
- [ ] Colonnes : N° Commande, Date, Client, Nombre d'Articles, Total
- [ ] Formatage français (Date : JJ/MM/AAAA, Nombres : 1 234,56)
- [ ] UTF-8 avec BOM pour compatibilité Excel
- [ ] Nom de fichier : `commandes-AAAA-MM-JJ.csv`
- [ ] Spinner de chargement pendant la génération
- [ ] Gestion d'erreur pour > 10 000 lignes

### Scénarios de Test

1. **Cas nominal :** Export de 50 commandes → CSV correct
2. **Export vide :** Aucune commande → Afficher message d'information
3. **Gros volume :** 5 000 commandes → Performance < 3s
4. **Caractères spéciaux :** Noms de clients avec accents → correct dans Excel

---

## 📋 Exemple 2 : Pagination Côté Serveur

### User Story

> En tant qu'**utilisateur** je veux **naviguer dans de grandes listes** afin que **la page se charge rapidement et reste organisée**.

### Contexte

La liste de produits charge actuellement tous les 5 000+ articles en une fois, causant des temps de chargement longs. Une pagination côté serveur avec 20 articles par page doit être implémentée.

### Modifications API

```typescript
// Nouvel endpoint
GET /api/articles?page=1&limit=20&sort=name:asc

// Réponse
{
  "data": [...],
  "meta": {
    "total": 5432,
    "page": 1,
    "limit": 20,
    "totalPages": 272
  }
}
```

### Composant UI

```
┌────────────────────────────────────────────────┐
│  [◀ Précédent]  Page 1 sur 272  [Suivant ▶]   │
└────────────────────────────────────────────────┘
```
