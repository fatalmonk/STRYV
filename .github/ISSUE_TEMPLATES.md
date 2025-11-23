# GitHub Issues to Create

Use this file as a reference to create GitHub issues for the roadmap items. Each issue should be created with the appropriate label (`feat`, `perf`, or `ops`).

## Issue 1: Deeper Product Variants

**Title**: `feat: Deeper Product Variants (size/fit/color logic)`

**Labels**: `feat`

**Body**:
```markdown
## Description

Implement enhanced product variant system with deeper size/fit/color logic.

## Features

- Enhanced size/fit/color selection logic
- Variant-specific pricing
- Variant inventory tracking
- Multi-variant product display
- Variant selection UI improvements

## Related

See [ROADMAP.md](../ROADMAP.md) for context.

## Acceptance Criteria

- [ ] Variant selection works for size, fit, and color
- [ ] Variant-specific pricing is displayed correctly
- [ ] Inventory is tracked per variant
- [ ] Product display shows all available variants
- [ ] Cart handles variant-specific items correctly
```

---

## Issue 2: Inventory & Stock Management

**Title**: `feat: Inventory & Stock Management`

**Labels**: `feat`

**Body**:
```markdown
## Description

Implement real-time inventory and stock management system.

## Features

- Real-time stock tracking
- Low stock alerts
- Out-of-stock handling
- Stock reservation during checkout
- Stock history tracking

## Related

See [ROADMAP.md](../ROADMAP.md) and [docs/admin.md](../docs/admin.md) for context.

## Acceptance Criteria

- [ ] Stock levels are tracked in real-time
- [ ] Low stock alerts are sent to admins
- [ ] Products show out-of-stock status
- [ ] Stock is reserved during checkout process
- [ ] Stock history is logged for audit
```

---

## Issue 3: Drop Scheduling

**Title**: `feat: Drop Scheduling (time-based releases)`

**Labels**: `feat`

**Body**:
```markdown
## Description

Implement drop scheduling system for time-based product releases.

## Features

- Time-based product releases
- Scheduled availability
- Countdown timers
- Pre-order functionality
- Drop announcement system

## Related

See [ROADMAP.md](../ROADMAP.md) for context.

## Acceptance Criteria

- [ ] Products can be scheduled for release
- [ ] Countdown timers display correctly
- [ ] Pre-orders are handled properly
- [ ] Drop announcements are sent
- [ ] Products become available at scheduled time
```

---

## Issue 4: Enhanced Admin Analytics

**Title**: `feat: Enhanced Admin Analytics`

**Labels**: `feat`

**Body**:
```markdown
## Description

Build comprehensive analytics dashboard for admin users.

## Features

- Sales dashboard with revenue metrics
- Product performance metrics
- Customer analytics
- Revenue reporting
- Export functionality (CSV, PDF)

## Related

See [ROADMAP.md](../ROADMAP.md) and [docs/admin.md](../docs/admin.md) for context.

## Acceptance Criteria

- [ ] Sales dashboard displays revenue metrics
- [ ] Product performance is tracked and displayed
- [ ] Customer analytics are available
- [ ] Reports can be exported
- [ ] Charts and visualizations are implemented
```

---

## Issue 5: Admin Image Upload System

**Title**: `feat: Admin Image Upload System`

**Labels**: `feat`

**Body**:
```markdown
## Description

Implement image upload system for admin product management.

## Features

- Admin image upload interface
- Image optimization pipeline
- Multiple image support per product
- CDN integration
- Image management UI

## Related

See [ROADMAP.md](../ROADMAP.md) and [docs/admin.md](../docs/admin.md) for context.

## Acceptance Criteria

- [ ] Admins can upload product images
- [ ] Images are automatically optimized
- [ ] Multiple images per product are supported
- [ ] Images are served via CDN
- [ ] Image management UI is intuitive
```

---

## Issue 6: Role-Based Access Control (RBAC)

**Title**: `feat: Role-Based Access Control (RBAC)`

**Labels**: `feat`

**Body**:
```markdown
## Description

Implement multi-user admin system with role-based permissions.

## Features

- Multi-user admin system
- Permission levels (admin, editor, viewer)
- Audit logging
- User management interface
- Route-level protection

## Related

See [ROADMAP.md](../ROADMAP.md) and [docs/admin.md](../docs/admin.md) for detailed architecture.

## Acceptance Criteria

- [ ] Multiple user roles are supported
- [ ] Permissions are enforced at route level
- [ ] User management interface exists
- [ ] Audit logs track all admin actions
- [ ] Authentication is secure
```

---

## Issue 7: Customer Accounts & Order History

**Title**: `feat: Customer Accounts & Order History`

**Labels**: `feat`

**Body**:
```markdown
## Description

Implement customer account system with order history tracking.

## Features

- User registration/login
- Order history
- Saved addresses
- Account preferences
- Order status tracking

## Related

See [ROADMAP.md](../ROADMAP.md) for context.

## Acceptance Criteria

- [ ] Users can register and login
- [ ] Order history is displayed
- [ ] Users can save multiple addresses
- [ ] Account preferences can be updated
- [ ] Order status is tracked and displayed
```

---

## How to Create These Issues

### Option 1: GitHub Web Interface

1. Go to https://github.com/fatalmonk/STRYV/issues
2. Click "New Issue"
3. Copy the title and body from above
4. Add the appropriate label (`feat`)
5. Submit

### Option 2: GitHub CLI

```bash
gh issue create \
  --title "feat: Deeper Product Variants (size/fit/color logic)" \
  --body "$(cat .github/ISSUE_TEMPLATES.md | sed -n '/## Issue 1:/,/^---$/p')" \
  --label "feat"
```

### Option 3: Bulk Create Script

Create a script to automate issue creation using the GitHub API or CLI.

