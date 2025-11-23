# Admin Dashboard Documentation

This document describes the current admin dashboard implementation, planned features, and future enhancements.

## Table of Contents

- [Current Implementation](#current-implementation)
- [Features](#features)
- [Future Enhancements](#future-enhancements)
- [RBAC (Role-Based Access Control)](#rbac-role-based-access-control)
- [Image Upload System](#image-upload-system)
- [Analytics & Reporting](#analytics--reporting)

## Current Implementation

### Overview

The admin dashboard is a **read-only product management interface** built with Next.js Server Components. It provides a foundation for future expansion into full product management, inventory, and analytics.

### Location

- **Route**: `/admin`
- **Component**: `src/app/(admin)/admin/page.tsx`
- **Route Group**: `(admin)` - Organizes admin routes without affecting URL structure

### Current Features

#### 1. Product Listing

**Display:**
- Product table with columns:
  - Image (thumbnail)
  - Product ID
  - Product Name
  - Category
  - Price (BDT)
  - Actions (Edit button)

**Data Source:**
- Static product data from `src/lib/stryv/products.ts`
- Server-side rendering (no client-side fetching)

**Implementation:**
```typescript
const products = getAllProducts();
// Renders table with all products
```

#### 2. Product Statistics

**Display:**
- Total product count
- Shown in table footer

#### 3. Product Edit Links

**Navigation:**
- Each product has an "Edit" button
- Links to `/admin/products/[id]`
- Edit pages are configured but need implementation

### Current Limitations

1. **Read-Only**: No actual editing functionality
2. **Static Data**: Products are hardcoded, not from database
3. **No Authentication**: Admin route is publicly accessible
4. **No Image Upload**: Product images are static files
5. **No Analytics**: No sales or performance metrics
6. **No Inventory**: No stock management

## Features

### Product Management

**Current:**
- ✅ View all products
- ✅ Product listing table
- ✅ Product statistics (count)
- ✅ Navigation to edit pages

**Planned:**
- ⏳ Create new products
- ⏳ Edit existing products
- ⏳ Delete products
- ⏳ Bulk operations
- ⏳ Product variants management

### Product Edit Pages

**Route**: `/admin/products/[id]`

**Current Status:**
- Routes are configured
- Pages exist but need implementation

**Planned Features:**
- Product form (name, price, category, description)
- Image upload/management
- Variant management (sizes, colors)
- Inventory tracking
- SEO fields (meta title, description)
- Publish/unpublish toggle

## Future Enhancements

### 1. RBAC (Role-Based Access Control)

**Purpose**: Multi-user admin system with permission levels

**Planned Roles:**
- **Super Admin**: Full access
- **Admin**: Product management, order management
- **Editor**: Product editing, content management
- **Viewer**: Read-only access

**Features:**
- User authentication (NextAuth.js or similar)
- Permission-based route protection
- Role assignment interface
- Audit logging (who did what, when)

**Implementation Considerations:**
```typescript
// Example middleware
export function middleware(req: NextRequest) {
  const role = getRoleFromSession(req);
  if (!hasPermission(role, req.nextUrl.pathname)) {
    return NextResponse.redirect('/admin/unauthorized');
  }
}
```

### 2. Image Upload System

**Current State:**
- Product images are static files in `public/images/`
- No upload interface
- Manual file management

**Planned Features:**

**Upload Interface:**
- Drag-and-drop image upload
- Multiple images per product
- Image preview
- Crop/resize tools

**Storage Options:**
- **Option 1**: Vercel Blob Storage
- **Option 2**: Cloudinary
- **Option 3**: AWS S3
- **Option 4**: Supabase Storage

**Image Processing:**
- Automatic optimization
- Multiple sizes (thumbnail, medium, large)
- Format conversion (WebP)
- CDN delivery

**Implementation Example:**
```typescript
// Upload handler
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('image') as File;
  
  // Upload to storage
  const url = await uploadToStorage(file);
  
  // Create optimized versions
  await createImageVariants(url);
  
  return NextResponse.json({ url });
}
```

### 3. Analytics & Reporting

**Planned Metrics:**

**Sales Analytics:**
- Revenue (daily, weekly, monthly)
- Order count
- Average order value
- Sales trends (charts)

**Product Performance:**
- Best-selling products
- Low-performing products
- Product views
- Conversion rates

**Customer Analytics:**
- Customer count
- Repeat customer rate
- Customer lifetime value
- Geographic distribution

**Inventory Analytics:**
- Stock levels
- Low stock alerts
- Fast-moving items
- Slow-moving items

**Dashboard Components:**
- Revenue charts (line/bar charts)
- Product performance table
- Sales summary cards
- Recent orders list

**Implementation:**
- Database queries for metrics
- Chart library (Recharts, Chart.js)
- Real-time updates (optional)
- Export functionality (CSV, PDF)

### 4. Order Management

**Planned Features:**
- Order listing
- Order details view
- Order status updates
- Order search/filter
- Order fulfillment workflow
- Shipping label generation

### 5. Inventory Management

**Planned Features:**
- Stock level tracking
- Low stock alerts
- Stock history
- Bulk stock updates
- Stock reservations (during checkout)

## RBAC (Role-Based Access Control)

### Architecture

**Authentication:**
- NextAuth.js or similar
- Session management
- JWT tokens

**Authorization:**
- Role-based permissions
- Route-level protection
- Component-level checks

**Database Schema (Planned):**
```sql
users
  - id
  - email
  - password_hash
  - role (super_admin, admin, editor, viewer)
  - created_at

permissions
  - id
  - name (e.g., "products.edit")
  - description

role_permissions
  - role
  - permission_id
```

### Permission Matrix

| Feature | Super Admin | Admin | Editor | Viewer |
|---------|-------------|-------|--------|--------|
| View Products | ✅ | ✅ | ✅ | ✅ |
| Create Products | ✅ | ✅ | ✅ | ❌ |
| Edit Products | ✅ | ✅ | ✅ | ❌ |
| Delete Products | ✅ | ✅ | ❌ | ❌ |
| View Orders | ✅ | ✅ | ✅ | ✅ |
| Manage Orders | ✅ | ✅ | ❌ | ❌ |
| View Analytics | ✅ | ✅ | ❌ | ❌ |
| Manage Users | ✅ | ❌ | ❌ | ❌ |
| System Settings | ✅ | ❌ | ❌ | ❌ |

### Implementation Steps

1. **Add Authentication**
   - Install NextAuth.js
   - Configure providers
   - Create login page

2. **Add Role Management**
   - Database schema for users/roles
   - Role assignment interface
   - Permission definitions

3. **Protect Routes**
   - Middleware for route protection
   - Server component checks
   - Client component guards

4. **Audit Logging**
   - Log all admin actions
   - Track user activity
   - Generate audit reports

## Image Upload System

### Architecture Options

#### Option 1: Vercel Blob Storage

**Pros:**
- Native Vercel integration
- Simple setup
- Automatic CDN

**Cons:**
- Vercel-specific (vendor lock-in)
- Limited storage options

#### Option 2: Cloudinary

**Pros:**
- Advanced image processing
- Automatic optimization
- Multiple storage options

**Cons:**
- Third-party service
- Additional cost

#### Option 3: Supabase Storage

**Pros:**
- Open source
- Self-hostable
- Integrated with Supabase

**Cons:**
- Requires Supabase setup
- Additional infrastructure

### Upload Flow

```
Admin Uploads Image
    ↓
Client Component (Upload UI)
    ↓
POST /api/admin/upload
    ↓
Server Validates & Processes
    ↓
Upload to Storage
    ↓
Generate Variants (thumb, medium, large)
    ↓
Store URLs in Database
    ↓
Return URLs to Client
```

### Image Processing

**Optimizations:**
- Resize to multiple sizes
- Convert to WebP
- Compress for web
- Generate thumbnails

**Tools:**
- Sharp (Node.js image processing)
- ImageMagick
- Cloudinary transformations

## Analytics & Reporting

### Data Sources

**Current:**
- Static product data
- No order tracking
- No analytics

**Planned:**
- Database for orders
- Database for products
- Analytics events tracking

### Metrics Collection

**Client-Side Events:**
- Product views
- Add to cart
- Checkout initiation
- Payment completion

**Server-Side Events:**
- Order creation
- Payment processing
- Inventory changes

### Dashboard Components

**Revenue Dashboard:**
- Total revenue
- Revenue by period
- Revenue trends
- Top products by revenue

**Product Dashboard:**
- Product views
- Add to cart rate
- Conversion rate
- Stock levels

**Order Dashboard:**
- Order count
- Order status breakdown
- Average order value
- Fulfillment rate

## Development Roadmap

### Phase 1: Core Admin Features
- [ ] Product CRUD operations
- [ ] Basic authentication
- [ ] Image upload system

### Phase 2: Advanced Features
- [ ] RBAC implementation
- [ ] Order management
- [ ] Basic analytics

### Phase 3: Analytics & Reporting
- [ ] Advanced analytics
- [ ] Reporting dashboard
- [ ] Export functionality

### Phase 4: Inventory & Operations
- [ ] Inventory management
- [ ] Stock tracking
- [ ] Fulfillment workflow

---

**Last Updated**: 2024
**Maintained By**: STRYV Development Team

