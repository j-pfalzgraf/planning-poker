# 3 Story Points – Small to Medium Changes

> **Effort:** 0.5–1 day
> **Risk:** Moderate
> **Tests:** Unit and integration tests recommended

---

## Example 1: Filterable List

**Title:** Filter Task List by Status

**Description:**
The task list should be filterable by status (Open, In Progress, Completed). Filter buttons above the list.

**Acceptance Criteria:**

- [ ] Filter buttons for each status
- [ ] "All" option
- [ ] URL parameter for filter (`?status=open`)
- [ ] Empty state display when 0 results

---

## Example 2: Form with Validation

**Title:** Registration Form with Real-Time Validation

**Description:**
Fields: Email, Password, Password confirmation. Validation on blur and submit.

**Acceptance Criteria:**

- [ ] Validate email format
- [ ] Password minimum 8 characters
- [ ] Passwords must match
- [ ] Display errors inline

---

## Example 3: Simple Drag & Drop Sorting

**Title:** Reorder Tasks via Drag & Drop

**Description:**
Tasks in a list should be reorderable via drag & drop. New order is saved.

**Acceptance Criteria:**

- [ ] Drag handle on each task
- [ ] Visual preview during drag
- [ ] Save after drop
- [ ] Touch support

---

## Why 3 Points?

- Multiple states to manage
- UI and logic changes
- Moderate complexity
- Possible edge cases
