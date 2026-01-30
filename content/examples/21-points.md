# 21 Story Points – Very Large Changes

> **Effort:** 1–2 weeks
> **Risk:** High
> **Tests:** Comprehensive test suite + QA review

---

## Example 1: Role-Based Permissions

**Title:** Implement Role and Permission System

**Description:**
Introduction of roles (Admin, Manager, User) with granular permissions. UI elements and API endpoints are protected accordingly.

**Acceptance Criteria:**

- [ ] Roles: Admin, Manager, User, Guest
- [ ] Permissions per feature (CRUD)
- [ ] Admin UI for role management
- [ ] Frontend: Conditional display of elements
- [ ] Backend: Middleware for authorization
- [ ] Audit log for permission changes
- [ ] Migration of existing users

---

## Example 2: Multi-Tenancy

**Title:** Introduce Multi-Tenant Support

**Description:**
The application should support multiple independent tenants (companies). Strict data separation.

**Acceptance Criteria:**

- [ ] Tenant ID in all relevant tables
- [ ] Subdomain or header-based tenant detection
- [ ] Tenant switcher for super admins
- [ ] Isolated data per tenant
- [ ] Tenant-specific configuration
- [ ] Migration of existing data

---

## Example 3: Internationalization (i18n)

**Title:** Complete Multi-Language Support (EN, DE, FR)

**Description:**
The entire application should be available in three languages. Dynamic language switching without reload.

**Acceptance Criteria:**

- [ ] All UI texts externalized
- [ ] Language files for EN, DE, FR
- [ ] Language switcher in header
- [ ] Language saveable in user settings
- [ ] Date and number formats localized
- [ ] RTL support prepared

---

## Why 21 Points?

- Broad changes across the entire system
- Architecture impact
- High risk of regressions
- Complex migration
- Intensive testing required
