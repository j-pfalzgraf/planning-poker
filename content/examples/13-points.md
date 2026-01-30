# 13 Story Points – Large Changes

> **Effort:** 3–5 days
> **Risk:** High
> **Tests:** Full test coverage required
> **Complexity:** High

---

## 📋 Example 1: Multi-Step Onboarding Wizard

### Epic

> As a **new customer** I want to **be guided through a setup process** so that **I can use the system productively as quickly as possible**.

### Background

New customers currently have to find all settings manually. A 4-step wizard should guide them through the most important steps and reduce time-to-value.

### Wizard Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Step 1    │───▶│   Step 2    │───▶│   Step 3    │───▶│   Step 4    │
│  Company    │    │  Contact    │    │  Payment    │    │  Summary    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      │                  │                  │                  │
      ▼                  ▼                  ▼                  ▼
   Validation        Validation        Validation         Submit
   save              save              save               all data
```

### Step Details

| Step              | Fields                | Validation                |
| ----------------- | --------------------- | ------------------------- |
| 1. Company Data   | Name, Address, Tax ID | Required, Tax ID format   |
| 2. Contact Person | Name, Email, Phone    | Email format, Required    |
| 3. Payment Method | ACH or Credit Card    | Account/Card number check |
| 4. Summary        | All data (read-only)  | Confirmation              |

### Technical Components

```typescript
// State management
interface OnboardingState {
  currentStep: 1 | 2 | 3 | 4;
  company: CompanyData | null;
  contact: ContactData | null;
  payment: PaymentData | null;
  isDirty: boolean;
  errors: Record<string, string[]>;
}

// Intermediate storage
const STORAGE_KEY = 'onboarding_draft';
localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
```

### Acceptance Criteria

- [ ] Progress indicator shows current step (1/4, 2/4, ...)
- [ ] Validation per step on Next click
- [ ] Back navigation without data loss
- [ ] Auto-save to LocalStorage every 30s and on blur
- [ ] Warning when leaving page with unsaved data
- [ ] Final summary with edit links to each step
- [ ] Error handling on submit (retry logic)
- [ ] Mobile-optimized (vertical stepper)
- [ ] Keyboard navigation (Tab, Enter)

### Test Scenarios

1. **Happy Path:** Fill all steps → Successfully completed
2. **Validation Error:** Invalid account number → Show error
3. **Abort:** Close tab at step 2 → Restore data on reopen
4. **Network Error:** Submit fails → Show retry button

---

## 📋 Example 2: Customizable Dashboard with Widgets

### User Story

> As a **power user** I want to **personalize my dashboard with widgets** so that **I can see the information important to me at a glance**.

### Feature Scope

- **Widget Library:** 8 predefined widgets
- **Drag & Drop:** Free positioning
- **Resize:** Change size via handle
- **Persistence:** Layout is saved

### Available Widgets

| Widget        | Sizes         | Data Source              |
| ------------- | ------------- | ------------------------ |
| Revenue Chart | 1x1, 2x1, 2x2 | `/api/stats/revenue`     |
| Recent Orders | 1x2, 2x2      | `/api/orders?limit=10`   |
| Task List     | 1x1, 1x2      | `/api/tasks?status=open` |
| KPI Tiles     | 1x1, 2x1      | `/api/stats/kpis`        |
| Calendar      | 2x2           | `/api/events`            |
| Team Activity | 1x2           | `/api/activity`          |
| Quick Actions | 1x1           | static                   |
| Notes         | 1x1, 1x2      | `/api/notes`             |

### Grid System

```
┌──────────┬──────────┬──────────┬──────────┐
│  Widget  │  Widget  │       Widget        │
│   1x1    │   1x1    │        2x1          │
├──────────┼──────────┼──────────┬──────────┤
│       Widget        │  Widget  │  Widget  │
│        2x1          │   1x1    │   1x1    │
├──────────┬──────────┼──────────┴──────────┤
│  Widget  │  Widget  │       Widget        │
│   1x2    │   1x2    │        2x2          │
│          │          │                     │
└──────────┴──────────┴─────────────────────┘
```

### Acceptance Criteria

- [ ] Widget library with preview cards
- [ ] Drag & drop for positioning (react-grid-layout or vue-grid-layout)
- [ ] Resize via corner handles
- [ ] Collision detection (widgets don't overlap)
- [ ] Layout saved to DB (debounced, 500ms after change)
- [ ] Reset to default layout (button + confirmation)
- [ ] Responsive: Grid adapts to viewport
- [ ] Loading skeleton for each widget

---

## 📋 Example 3: In-App Notification Center

### User Story

> As a **user** I want to **see all relevant notifications in one place** so that **I don't miss anything important**.

### Component Architecture

```
┌─────────────────────────────────────────────────┐
│                    Header                        │
│  Logo   Nav   Nav   Nav   [🔔 3]   Avatar       │
└─────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │  Notification       │
                    │  Dropdown           │
                    │  ┌───────────────┐  │
                    │  │ New Order     │  │
                    │  │ 2 min ago     │  │
                    │  ├───────────────┤  │
                    │  │ Task Complete │  │
                    │  │ 1 hour ago    │  │
                    │  └───────────────┘  │
                    │  [Mark all as read] │
                    │  [View all →]       │
                    └─────────────────────┘
```

### Data Model

```typescript
interface Notification {
  id: string;
  type: 'order' | 'task' | 'system' | 'mention';
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
}
```

### Acceptance Criteria

- [ ] Bell icon with badge (unread counter, max 99+)
- [ ] Dropdown with last 10 notifications
- [ ] Mark as read (individual or all)
- [ ] Click on notification → navigate to relevant page
- [ ] Real-time updates via WebSocket
- [ ] Persistence in database
- [ ] Sound on new notification (optional, configurable)
- [ ] "All notifications" page with pagination and filtering

---

## ✅ Why 13 Points?

| Criterion    | Assessment                     |
| ------------ | ------------------------------ |
| Architecture | Multiple systems integrated    |
| State        | Complex state management       |
| Components   | 10+ new/changed files          |
| Persistence  | Database + API endpoints       |
| Tests        | High testing effort            |
| Risk         | Edge cases and error scenarios |
