# STRYV Architecture Documentation

This document describes the technical architecture, data flow, rendering strategy, and checkout pipeline of the STRYV e-commerce platform.

## Table of Contents

- [Overview](#overview)
- [Data Flow](#data-flow)
- [Rendering Strategy](#rendering-strategy)
- [Checkout Pipeline](#checkout-pipeline)
- [State Management](#state-management)
- [API Architecture](#api-architecture)

## Overview

STRYV is built on **Next.js 14** using the **App Router**, providing a hybrid rendering approach that combines:
- **Static Site Generation (SSG)** for product pages
- **Server Components** for initial page loads
- **Client Components** for interactive features
- **API Routes** for serverless backend functionality

## Data Flow

### Product Data Flow

```
Static Product Data (lib/stryv/products.ts)
    ↓
Server Component (app/products/[id]/page.tsx)
    ↓
generateStaticParams() → Pre-renders all product pages at build time
    ↓
Client Component (product-detail-client.tsx)
    ↓
Cart/Wishlist Context → localStorage persistence
```

### Cart Data Flow

```
User Action (Add to Cart)
    ↓
CartContext.addToCart()
    ↓
React State Update
    ↓
localStorage Sync (persistent storage)
    ↓
UI Update (CartDrawer, CartBadge)
```

### Checkout Data Flow

```
CheckoutModal (Client)
    ↓
beginCheckout() → POST /api/checkout
    ↓
Server validates & prepares SSLCommerz request
    ↓
Returns payment gateway URL
    ↓
Client redirects to SSLCommerz
    ↓
User completes payment
    ↓
SSLCommerz POST to /api/sslcommerz/return/{success|fail|cancel}
    ↓
Server redirects to frontend result page
    ↓
SSLCommerz IPN → /api/payment/ipn (async validation)
```

## Rendering Strategy

### Static Generation (SSG)

**Product Pages** (`/products/[id]`):
- Pre-rendered at build time via `generateStaticParams()`
- All products are statically generated
- Fast initial load, SEO-optimized
- No database queries at runtime

**Implementation:**
```typescript
export async function generateStaticParams() {
  const allProducts = getAllProducts();
  return allProducts.map((product) => ({ id: product.id }));
}
```

### Server Components

**Landing Page** (`app/page.tsx`):
- Server component by default
- Fetches product data at request time
- Passes data to client components for interactivity

**Admin Dashboard** (`app/(admin)/admin/page.tsx`):
- Server component
- Reads product data directly
- No client-side data fetching needed

### Client Components

**Interactive Features:**
- `StryvLandingRoot` - Landing page with animations
- `CartDrawer` - Cart management UI
- `CheckoutModal` - Checkout form
- `ProductCard` - Add to cart interactions
- `CartContext` / `WishlistContext` - State management

**Hydration Strategy:**
- Client components hydrate after initial server render
- Context providers wrap the application
- localStorage sync happens after hydration to prevent SSR mismatch

## Checkout Pipeline

### Step-by-Step Flow

1. **Cart Preparation**
   - User adds items to cart (stored in Context + localStorage)
   - Cart items include: `id`, `name`, `price`, `quantity`, `selectedSize`

2. **Checkout Initiation**
   - User clicks "Checkout" in CartDrawer
   - `CheckoutModal` opens
   - User fills customer information form

3. **Payment Request** (`POST /api/checkout`)
   ```
   Request:
   {
     cartItems: CartItem[],
     customerInfo: {
       name, email, phone, address, city, postcode, country
     }
   }
   
   Server:
   - Validates cart items
   - Validates SSLCommerz credentials
   - Calculates total amount
   - Generates unique transaction ID
   - Initializes SSLCommerz SDK
   - Prepares payment data
   - Calls sslcommerz.init()
   
   Response:
   {
     ok: true,
     url: "https://sandbox.sslcommerz.com/...",
     sessionId: "TXN..."
   }
   ```

4. **Payment Gateway Redirect**
   - Client redirects to `response.url`
   - User completes payment on SSLCommerz
   - SSLCommerz processes payment

5. **Return Handlers** (POST from SSLCommerz)
   - `/api/sslcommerz/return/success` → Redirects to `/checkout/success`
   - `/api/sslcommerz/return/fail` → Redirects to `/checkout/failed`
   - `/api/sslcommerz/return/cancel` → Redirects to `/checkout/cancelled`

6. **IPN Handler** (Async, called by SSLCommerz)
   - `/api/payment/ipn` receives POST with payment status
   - Validates request using SSLCommerz validation API
   - Updates order status (currently logs, TODO: database integration)
   - Returns acknowledgment

### Security Considerations

- **Transaction ID Generation**: Unique IDs prevent replay attacks
- **Server-Side Validation**: All payment logic on server
- **IPN Validation**: Verifies payment status with SSLCommerz API
- **Environment Variables**: Credentials never exposed to client
- **HTTPS**: Enforced in production

## State Management

### React Context API

**CartContext** (`src/context/CartContext.tsx`):
- Global cart state
- Methods: `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`
- Persists to `localStorage` key: `stryv_cart`
- Hydration-safe (waits for client mount)

**WishlistContext** (`src/context/WishlistContext.tsx`):
- Global wishlist state
- Methods: `addToWishlist`, `removeFromWishlist`, `isWishlisted`
- Persists to `localStorage` key: `stryv_wishlist`
- Hydration-safe

### Persistence Strategy

```typescript
// Hydration pattern
const [isHydrated, setIsHydrated] = useState(false);

useEffect(() => {
  // Load from localStorage on mount
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    setState(JSON.parse(stored));
  }
  setIsHydrated(true);
}, []);

useEffect(() => {
  // Save to localStorage after hydration
  if (isHydrated) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}, [state, isHydrated]);
```

## API Architecture

### API Routes Structure

```
/api/
├── checkout/
│   └── route.ts          # POST - Initiate payment
├── payment/
│   └── ipn/
│       └── route.ts      # POST - IPN handler
└── sslcommerz/
    ├── ipn/
    │   └── route.ts      # POST - Alternative IPN (legacy?)
    └── return/
        ├── success/      # POST - Success redirect
        ├── fail/         # POST - Fail redirect
        └── cancel/       # POST - Cancel redirect
```

### Request/Response Patterns

**Checkout API:**
- **Method**: POST
- **Content-Type**: application/json
- **Validation**: Server-side validation of cart items and customer info
- **Error Handling**: Returns structured error responses

**IPN Handler:**
- **Method**: POST
- **Content-Type**: application/x-www-form-urlencoded (FormData)
- **Validation**: SSLCommerz validation API call
- **Idempotency**: Should handle duplicate IPN calls

### Environment Variables

Required for payment integration:
- `SSLCOMMERZ_STORE_ID` - Merchant store ID
- `SSLCOMMERZ_STORE_PASSWORD` - Store password
- `SSLCOMMERZ_IS_LIVE` - "true" for production, "false" for sandbox

## Performance Optimizations

1. **Static Generation**: Product pages pre-rendered at build time
2. **Image Optimization**: Next.js Image component with automatic optimization
3. **Code Splitting**: Automatic via Next.js App Router
4. **Client-Side Caching**: localStorage for cart/wishlist
5. **Serverless Functions**: API routes scale automatically on Vercel

## Future Architecture Considerations

- **Database Integration**: Currently using static data, future: database for products, orders, users
- **Order Management**: Database schema for orders, order status tracking
- **Email Notifications**: Integration for order confirmations
- **Caching Strategy**: Redis for session management, product caching
- **CDN**: Static assets served via Vercel Edge Network

---

**Last Updated**: 2024
**Maintained By**: STRYV Development Team

