# 8 Story Points – Modifications Importantes

> **Effort :** 2–3 jours
> **Risque :** Moyen à élevé
> **Tests :** Suite de tests complète requise
> **Complexité :** Moyenne-Haute

---

## 📋 Exemple 1 : Notifications par Email

### User Story

> En tant que **nouvel utilisateur** je veux **recevoir un email de confirmation** afin de **vérifier mon adresse email et activer mon compte**.

### Contexte

Après l'inscription, l'utilisateur doit confirmer son adresse email avant de pouvoir utiliser pleinement l'application. Cela augmente la sécurité et réduit les inscriptions spam.

### Architecture Technique

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│   Service   │
│   Inscription│    │   API       │     │   Email     │
└─────────────┘     └──────┬──────┘     └──────┬──────┘
                           │                    │
                           ▼                    ▼
                    ┌─────────────┐     ┌─────────────┐
                    │  Base de    │     │   SMTP/SES  │
                    │  données    │     │             │
                    │  (Token)    │     │             │
                    └─────────────┘     └─────────────┘
```

### Template Email

```html
<!-- templates/email/confirm-registration.html -->
<h1>Bienvenue sur {{appName}} !</h1>
<p>Cliquez sur le bouton pour confirmer votre email :</p>
<a href="{{confirmUrl}}" class="button">Confirmer l'Email</a>
<p><small>Lien valide pendant 24 heures.</small></p>
```

### Endpoints API

| Endpoint                        | Méthode | Description                       |
| ------------------------------- | ------- | --------------------------------- |
| `/api/auth/register`            | POST    | Créer utilisateur + envoyer email |
| `/api/auth/confirm/{token}`     | GET     | Valider token + activer compte    |
| `/api/auth/resend-confirmation` | POST    | Renvoyer email                    |

### Critères d'Acceptation

- [ ] Créer template email (HTML + fallback texte brut)
- [ ] Lien d'activation basé sur token avec chaîne aléatoire de 64 caractères
- [ ] Stocker token dans Redis/BD avec TTL de 24 heures
- [ ] Page d'erreur pour token invalide ou expiré
- [ ] Bouton de renvoi sur la page de connexion (uniquement si non activé)
- [ ] Limitation de débit : Max 3 renvois par heure
- [ ] Journalisation des emails pour débogage

### Aspects Sécurité

- [ ] Le token est cryptographiquement sécurisé
- [ ] Le token est invalidé après utilisation
- [ ] Protection contre le brute-force sur l'endpoint de confirmation

---

## 📋 Exemple 2 : Recherche Plein Texte avec Surlignage

### User Story

> En tant qu'**utilisateur** je veux **rechercher des articles et voir les correspondances surlignées** afin de **trouver rapidement les informations pertinentes**.

### Solution Technique

```typescript
// Recherche avec surlignage
const searchArticles = async (query: string) => {
  const response = await fetch(`/api/articles/search?q=${encodeURIComponent(query)}`);
  return response.json();
};

// Format de réponse
interface SearchResult {
  id: string;
  title: string;
  titleHighlighted: string;  // Avec balises <mark>...</mark>
  excerpt: string;
  excerptHighlighted: string;
  score: number;
}
```

### Critères d'Acceptation

- [ ] Champ de recherche avec debounce (300ms entre les saisies)
