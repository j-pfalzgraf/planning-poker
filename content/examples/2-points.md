# 2 Story Points – Small Changes

> **Effort:** Half a day
> **Risk:** Low to moderate
> **Tests:** Unit tests recommended

---

## Example 1: New Form Field

**Title:** Optional Phone Number Field in Contact Form

**Description:**
An optional input field for phone number should be added to the contact form. Format validation for US/international numbers.

**Acceptance Criteria:**

- [ ] New `phone` field in the form
- [ ] Label: "Phone (optional)"
- [ ] Validation: Only numbers, +, -, spaces allowed
- [ ] Field is submitted to the backend

---

## Example 2: Add Sorting Option

**Title:** Sort Product List by Price

**Description:**
A sorting option "Price ascending/descending" should be added to the product overview.

**Acceptance Criteria:**

- [ ] Dropdown with sorting options
- [ ] Client-side sorting
- [ ] Active sorting visually highlighted

---

## Example 3: Confirmation Dialog

**Title:** Show Confirmation Dialog When Deleting

**Description:**
Before deleting an entry, a modal should appear: "Are you sure you want to delete?"

**Acceptance Criteria:**

- [ ] Modal with "Yes" / "Cancel"
- [ ] Deletion only on confirmation
- [ ] Modal can be closed with ESC

---

## Why 2 Points?

- Multiple components affected
- Simple logic
- Manageable testing effort
- Low risk of side effects
