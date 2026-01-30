# 5 Story Points – Medium Changes

> **Effort:** 1–2 days
> **Risk:** Moderate
> **Tests:** Unit, integration, and E2E tests recommended
> **Complexity:** Medium

---

## 📋 Example 1: CSV Export for Orders

### User Story

> As a **shop administrator** I want to **export all displayed orders as CSV** so that **I can process the data in Excel**.

### Background

The order overview currently displays up to 100 orders. A new export button should download these as a CSV file. Active filters should be respected.

### Technical Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   ExportButton  │────▶│   OrderService  │────▶│   CSV-Generator │
│   (Frontend)    │     │   (API Call)    │     │   (Backend)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                                               │
         │◀──────────────── Blob Download ◀──────────────┘
```

### API Specification

```http
GET /api/orders/export?status=pending&from=2024-01-01
Accept: text/csv

Response:
Content-Type: text/csv; charset=utf-8
Content-Disposition: attachment; filename="orders-2024-01-15.csv"
```

### CSV Format

```csv
OrderNo;Date;Customer;Items;Total
ORD-2024-001;01/15/2024;John Smith;3;$149.99
ORD-2024-002;01/15/2024;Jane Doe;1;$29.99
```

### Acceptance Criteria

- [ ] Button "Export as CSV" in the top right of the order overview
- [ ] Columns: Order No, Date, Customer, Number of Items, Total
- [ ] US formatting (Date: MM/DD/YYYY, Numbers: 1,234.56)
- [ ] UTF-8 with BOM for Excel compatibility
- [ ] Filename: `orders-YYYY-MM-DD.csv`
- [ ] Loading spinner during generation
- [ ] Error handling for > 10,000 rows

### Test Scenarios

1. **Happy Path:** Export 50 orders → CSV correct
2. **Empty Export:** No orders → Show info message
3. **Large Data:** 5,000 orders → Performance < 3s
4. **Special Characters:** Customer names with accents → correct in Excel

---

## 📋 Example 2: Server-Side Pagination

### User Story

> As a **user** I want to **navigate through large lists** so that **the page loads quickly and stays organized**.

### Background

The product list currently loads all 5,000+ items at once, causing long load times. Server-side pagination with 20 items per page should be implemented.

### API Changes

```typescript
// New endpoint
GET /api/articles?page=1&limit=20&sort=name:asc

// Response
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

### UI Component

```
┌────────────────────────────────────────────────┐
│  ◀ Back   1  2  3  ...  271  272   Next ▶      │
│             Showing 1-20 of 5,432 items        │
└────────────────────────────────────────────────┘
```

### Acceptance Criteria

- [ ] Backend: Endpoint with `page`, `limit`, `sort` parameters
- [ ] Frontend: Pagination component with page numbers
- [ ] URL Sync: `?page=2` is reflected in URL
- [ ] Deep Link: Direct access to page 5 works
- [ ] Loading state during page change (skeleton)
- [ ] Jump to page 1 on filter change
- [ ] Mobile: Simplified pagination (only Previous/Next)

---

## 📋 Example 3: Profile Picture Upload

### User Story

> As a **registered user** I want to **upload a profile picture** so that **my profile looks more personal**.

### Acceptance Criteria

- [ ] Drag & drop or file selection
- [ ] Allowed formats: JPG, PNG, WebP
- [ ] Maximum size: 5 MB
- [ ] Preview before upload (crop option)
- [ ] Progress indicator during upload
- [ ] Server-side: Resize to max 400x400px
- [ ] Old image is automatically deleted
- [ ] Fallback: Initials avatar when no image

### Error Handling

| Error         | Message                            |
| ------------- | ---------------------------------- |
| Wrong format  | "Only JPG, PNG or WebP allowed"    |
| Too large     | "The image must be 5 MB or less"   |
| Upload failed | "Upload failed. Please try again." |

---

## ✅ Why 5 Points?

| Criterion    | Assessment                |
| ------------ | ------------------------- |
| Architecture | Frontend + Backend        |
| Components   | 3–5 new/changed files     |
| Logic        | Moderate complexity       |
| Tests        | Unit + Integration needed |
| Risk         | Manageable                |
