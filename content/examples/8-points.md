````markdown
# 8 Story Points – Larger Changes

> **Effort:** 2–3 days
> **Risk:** Medium to high
> **Tests:** Comprehensive test suite required
> **Complexity:** Medium-High

---

## 📋 Example 1: Email Notifications

### User Story

> As a **new user** I want to **receive a confirmation email** so that **I can verify my email address and activate my account**.

### Background

After registration, the user must confirm their email address before they can fully use the application. This increases security and reduces spam registrations.

### Technical Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│   Email     │
│   Register  │     │   API       │     │   Service   │
└─────────────┘     └──────┬──────┘     └──────┬──────┘
                           │                    │
                           ▼                    ▼
                    ┌─────────────┐     ┌─────────────┐
                    │  Database   │     │   SMTP/SES  │
                    │  (Token)    │     │             │
                    └─────────────┘     └─────────────┘
```

### Email Template

```html
<!-- templates/email/confirm-registration.html -->
<h1>Welcome to {{appName}}!</h1>
<p>Click the button to confirm your email:</p>
<a href="{{confirmUrl}}" class="button">Confirm Email</a>
<p><small>Link valid for 24 hours.</small></p>
```

### API Endpoints

| Endpoint                        | Method | Description                       |
| ------------------------------- | ------ | --------------------------------- |
| `/api/auth/register`            | POST   | Create user + send email          |
| `/api/auth/confirm/{token}`     | GET    | Validate token + activate account |
| `/api/auth/resend-confirmation` | POST   | Resend email                      |

### Acceptance Criteria

- [ ] Create email template (HTML + plain text fallback)
- [ ] Token-based activation link with 64-character random string
- [ ] Store token in Redis/DB with 24-hour TTL
- [ ] Error page for invalid or expired token
- [ ] Resend button on login page (only if not activated)
- [ ] Rate limiting: Max 3 resends per hour
- [ ] Email logging for debugging

### Security Aspects

- [ ] Token is cryptographically secure
- [ ] Token is invalidated after use
- [ ] Brute-force protection on confirm endpoint

---

## 📋 Example 2: Full-Text Search with Highlighting

### User Story

> As a **user** I want to **search articles and see highlighted matches** so that **I can quickly find relevant information**.

### Technical Solution

```typescript
// Search with highlighting
const searchArticles = async (query: string) => {
  const response = await fetch(`/api/articles/search?q=${encodeURIComponent(query)}`);
  return response.json();
};

// Response format
interface SearchResult {
  id: string;
  title: string;
  titleHighlighted: string;  // With <mark>...</mark> tags
  excerpt: string;
  excerptHighlighted: string;
  score: number;
}
```

### Acceptance Criteria

- [ ] Search field with debounce (300ms between inputs)
- [ ] Search in title and description
- [ ] Highlighting of search terms with `<mark>` tags
- [ ] Minimum 2 characters required for search
- [ ] Empty state display when 0 results
- [ ] "Load more" button for > 20 results
- [ ] Performance: < 200ms for 10,000+ articles (index required)

---

## 📋 Example 3: Comment System

### User Story

> As a **blog reader** I want to **write comments and reply to others** so that **I can participate in the discussion**.

### Data Model

```typescript
interface Comment {
  id: string;
  postId: string;
  parentId: string | null;  // null = top-level comment
  authorId: string;
  authorName: string;
  content: string;          // max 1000 characters
  createdAt: Date;
  updatedAt: Date | null;
  isDeleted: boolean;
}
```

### UI Structure

```
┌─────────────────────────────────────────────────┐
│ 💬 3 Comments                                    │
├─────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────┐ │
│ │ 👤 John Smith · 2 hours ago                │ │
│ │ "Great article! Thanks for the tips."      │ │
│ │ [Reply] [Edit] [Delete]                    │ │
│ │                                             │ │
│ │   ┌─────────────────────────────────────┐   │ │
│ │   │ 👤 Jane D. · 1 hour ago            │   │ │
│ │   │ "Agreed, very helpful!"            │   │ │
│ │   │ [Reply]                             │   │ │
│ │   └─────────────────────────────────────┘   │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### Acceptance Criteria

- [ ] Write comment (max 1000 characters, character counter)
- [ ] Nested replies (1 level deep)
- [ ] Edit own comments (with "edited" badge)
- [ ] Delete own comments (soft delete, shows "[deleted]")
- [ ] Relative timestamps ("5 minutes ago", "yesterday")
- [ ] Avatar + author name
- [ ] Real-time updates optional (WebSocket for live comments)

---

## ✅ Why 8 Points?

| Criterion    | Assessment                             |
| ------------ | -------------------------------------- |
| Architecture | Multiple systems integrated            |
| Complexity   | Frontend + Backend + external services |
| Security     | Security aspects to consider           |
| Tests        | Comprehensive test suite needed        |
| Risk         | Increased risk due to dependencies     |
````
