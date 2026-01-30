# 0 Story Points – Trivial Changes

> **Effort:** Minimal, often under 15 minutes
> **Risk:** Almost none
> **Tests:** Usually not required
> **Complexity:** None

---

## 📋 Example 1: Enable Feature Flag

### User Story

> As a **Product Owner** I want to **enable the Dark Mode feature**, so that **our users can start using it immediately**.

### Background

The Dark Mode feature is fully implemented and tested, but was held back for the last release. Now it should be activated by changing a feature flag.

### Implementation

```json
// config/features.json
{
  "darkMode": true,  // ← Change: false → true
  "betaFeatures": false,
  "newCheckout": true
}
```

### Acceptance Criteria

- [ ] Set feature flag in `config/features.json` to `true`
- [ ] Create and merge PR
- [ ] Trigger deployment
- [ ] Test Dark Mode in production

### Risk Assessment

| Aspect      | Rating             |
| ----------- | ------------------ |
| Code change | 1 line             |
| Tests       | Smoke test         |
| Rollback    | Reset feature flag |

---

## 📋 Example 2: Adjust Environment Variable

### User Story

> As a **DevOps Engineer** I want to **increase the API timeout**, so that **slow API requests no longer fail**.

### Context

Some API calls to a slow third-party service are timing out. The current timeout of 5 seconds should be increased to 10 seconds.

### Change

```bash
# .env.production
API_TIMEOUT=10000  # was: 5000
```

### Acceptance Criteria

- [ ] Set `API_TIMEOUT=10000` in `.env.production`
- [ ] No code changes required
- [ ] Redeploy to activate
- [ ] Monitor for timeout errors

---

## 📋 Example 3: Fix Typo

### User Story

> As a **User** I want to **see correct text in the app**, so that **the product looks professional**.

### Problem

The website footer shows **"Contcat"** instead of **"Contact"**.

### Solution

```vue
<!-- app/components/Footer.vue -->
<template>
  <footer>
    <a href="/contact">Contact</a>  <!-- was: Contcat -->
  </footer>
</template>
```

### Acceptance Criteria

- [ ] Fix typo in `Footer.vue`
- [ ] Check for same error in other places
- [ ] Visually verify in browser

---

## ✅ Why 0 Points?

| Criterion | Assessment                       |
| --------- | -------------------------------- |
| Logic     | No logic affected                |
| Isolation | Atomic and isolated              |
| Risk      | Almost none                      |
| Time      | Can be done during a meeting     |
| Review    | Minimal, almost self-explanatory |

> 💡 **Tip:** 0-point stories are great for onboarding new team members or as a "warm-up" in the morning.
