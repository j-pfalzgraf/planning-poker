# 8 Story Pointów – Większe Zmiany

> **Nakład pracy:** 2–3 dni
> **Ryzyko:** Średnie do wysokiego
> **Testy:** Wymagany kompleksowy zestaw testów
> **Złożoność:** Średnio-wysoka

---

## 📋 Przykład 1: Powiadomienia Email

### Historia Użytkownika

> Jako **nowy użytkownik** chcę **otrzymać email potwierdzający**, aby **móc zweryfikować mój adres email i aktywować konto**.

### Kontekst

Po rejestracji użytkownik musi potwierdzić swój adres email, zanim będzie mógł w pełni korzystać z aplikacji. Zwiększa to bezpieczeństwo i redukuje rejestracje spamowe.

### Architektura Techniczna

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│   Email     │
│   Rejestr.  │     │   API       │     │   Service   │
└─────────────┘     └──────┬──────┘     └──────┬──────┘
                           │                    │
                           ▼                    ▼
                    ┌─────────────┐     ┌─────────────┐
                    │  Baza Danych│     │   SMTP/SES  │
                    │  (Token)    │     │             │
                    └─────────────┘     └─────────────┘
```

### Szablon Email

```html
<!-- templates/email/confirm-registration.html -->
<h1>Witaj w {{appName}}!</h1>
<p>Kliknij przycisk, aby potwierdzić swój email:</p>
<a href="{{confirmUrl}}" class="button">Potwierdź Email</a>
<p><small>Link ważny przez 24 godziny.</small></p>
```

### Endpointy API

| Endpoint                        | Metoda | Opis                              |
| ------------------------------- | ------ | --------------------------------- |
| `/api/auth/register`            | POST   | Utwórz użytkownika + wyślij email |
| `/api/auth/confirm/{token}`     | GET    | Zweryfikuj token + aktywuj konto  |
| `/api/auth/resend-confirmation` | POST   | Wyślij ponownie email             |

### Kryteria Akceptacji

- [ ] Utwórz szablon email (HTML + wersja tekstowa)
- [ ] Link aktywacyjny oparty na tokenie z 64-znakowym losowym ciągiem
- [ ] Przechowuj token w Redis/DB z TTL 24 godziny
- [ ] Strona błędu dla nieprawidłowego lub wygasłego tokena
- [ ] Przycisk ponownego wysłania na stronie logowania (tylko jeśli nieaktywowany)
- [ ] Rate limiting: Maks 3 ponowne wysłania na godzinę
- [ ] Logowanie emaili do debugowania

### Aspekty Bezpieczeństwa

- [ ] Token jest kryptograficznie bezpieczny
- [ ] Token jest unieważniany po użyciu
- [ ] Ochrona przed brute-force na endpoincie potwierdzenia

---

## 📋 Przykład 2: Wyszukiwanie Pełnotekstowe z Podświetlaniem

### Historia Użytkownika

> Jako **użytkownik** chcę **wyszukiwać artykuły i widzieć podświetlone dopasowania**, aby **szybko znaleźć istotne informacje**.

### Rozwiązanie Techniczne

```typescript
// Wyszukiwanie z podświetlaniem
const searchArticles = async (query: string) => {
  const response = await fetch(`/api/articles/search?q=${encodeURIComponent(query)}`);
  return response.json();
};

// Format odpowiedzi
interface SearchResult {
  id: string;
  title: string;
  titleHighlighted: string;  // Z tagami <mark>...</mark>
  excerpt: string;
  excerptHighlighted: string;
  score: number;
}
```

### Kryteria Akceptacji

- [ ] Pole wyszukiwania z debounce (300ms między wpisywaniami)
