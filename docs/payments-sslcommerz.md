# SSLCommerz Payment Integration

This document describes the SSLCommerz payment gateway integration, IPN handling, security considerations, and test/live mode configuration.

## Table of Contents

- [Overview](#overview)
- [Integration Architecture](#integration-architecture)
- [IPN (Instant Payment Notification)](#ipn-instant-payment-notification)
- [Security Notes](#security-notes)
- [Test vs Live Mode](#test-vs-live-mode)
- [Troubleshooting](#troubleshooting)

## Overview

STRYV uses **SSLCommerz** as the payment gateway, specifically designed for the Bangladesh market. The integration supports:

- Credit/Debit Cards
- Bkash
- Cash on Delivery (COD)
- Bank Transfer

The integration follows SSLCommerz's standard flow:
1. Initiate payment request
2. Redirect user to SSLCommerz hosted checkout
3. Handle payment return (success/fail/cancel)
4. Process IPN for payment confirmation

## Integration Architecture

### Payment Flow

```
┌─────────────┐
│   Client    │
│  (Browser)  │
└──────┬──────┘
       │ 1. POST /api/checkout
       ▼
┌─────────────┐
│   Next.js   │
│  API Route  │
└──────┬──────┘
       │ 2. Initialize SSLCommerz
       │ 3. Generate transaction ID
       │ 4. Prepare payment data
       ▼
┌─────────────┐
│ SSLCommerz  │
│   Gateway   │
└──────┬──────┘
       │ 5. User completes payment
       │ 6. POST to return URLs
       │ 7. POST to IPN URL
       ▼
┌─────────────┐
│   Next.js   │
│  API Routes │
└─────────────┘
```

### API Endpoints

#### 1. Checkout Initiation

**Endpoint**: `POST /api/checkout`

**Request Body**:
```json
{
  "cartItems": [
    {
      "id": "product-1",
      "name": "Product Name",
      "price": 1500,
      "quantity": 2,
      "selectedSize": "M"
    }
  ],
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "01700000000",
    "address": "123 Main St",
    "city": "Dhaka",
    "postcode": "1000",
    "country": "Bangladesh"
  }
}
```

**Response**:
```json
{
  "ok": true,
  "url": "https://sandbox.sslcommerz.com/gwprocess/v4/gw.php?Q=pay&SESSIONKEY=...",
  "sessionId": "TXN1234567890ABC"
}
```

**Implementation**: `src/app/api/checkout/route.ts`

#### 2. Return Handlers

SSLCommerz sends POST requests with form data to these endpoints after payment:

- **Success**: `/api/sslcommerz/return/success`
- **Fail**: `/api/sslcommerz/return/fail`
- **Cancel**: `/api/sslcommerz/return/cancel`

These handlers:
1. Receive form data from SSLCommerz
2. Extract transaction information
3. Redirect user to appropriate frontend page

**Implementation**: `src/app/api/sslcommerz/return/{success|fail|cancel}/route.ts`

#### 3. IPN Handler

**Endpoint**: `POST /api/payment/ipn`

**Purpose**: Server-side payment validation and order status update

**Flow**:
1. SSLCommerz sends POST request with payment status
2. Server validates request using SSLCommerz validation API
3. Server updates order status (currently logs, TODO: database)
4. Returns acknowledgment

**Implementation**: `src/app/api/payment/ipn/route.ts`

## IPN (Instant Payment Notification)

### What is IPN?

IPN is an **asynchronous notification** sent by SSLCommerz to your server after payment processing. It's the **trusted source** for payment confirmation.

### IPN vs Return URLs

| Aspect | Return URLs | IPN |
|--------|-------------|-----|
| **Timing** | Immediate (user redirect) | Asynchronous (server-to-server) |
| **Reliability** | User may close browser | Always delivered |
| **Purpose** | User experience (redirect) | Order confirmation |
| **Validation** | Basic | Full validation with SSLCommerz API |

### IPN Handler Implementation

```typescript
// 1. Receive form data from SSLCommerz
const formData = await req.formData();

// 2. Initialize SSLCommerz SDK
const sslcommerz = new SslCommerzPayment(
  process.env.SSLCOMMERZ_STORE_ID,
  process.env.SSLCOMMERZ_STORE_PASSWORD,
  isLive
);

// 3. Validate the IPN request
const isValid = await sslcommerz.validate(formData);

// 4. Process payment status
if (isValid && status === 'VALID') {
  // Update order status in database
  // Send confirmation email
}
```

### IPN Data Structure

Key fields from SSLCommerz IPN:
- `tran_id` - Transaction ID
- `status` - Payment status (VALID, FAILED, CANCELLED)
- `amount` - Payment amount
- `val_id` - Validation ID (for verification)
- `value_a` - Custom metadata (cart items in our case)

### IPN Validation

The IPN handler validates requests by calling SSLCommerz validation API:

```
GET https://{sandbox|secure}.sslcommerz.com/validator/api/validationserverAPI.php
  ?val_id={val_id}
  &store_id={store_id}
  &store_passwd={store_passwd}
  &v=1
  &format=json
```

**Security**: This ensures the IPN request is legitimate and not spoofed.

## Security Notes

### 1. Environment Variables

**Never commit credentials to git:**
- `SSLCOMMERZ_STORE_ID`
- `SSLCOMMERZ_STORE_PASSWORD`

**Storage:**
- Local: `.env.local` (gitignored)
- Production: Vercel Environment Variables (encrypted)

### 2. Server-Side Processing

**All payment logic runs on the server:**
- Payment initiation (`/api/checkout`)
- IPN validation (`/api/payment/ipn`)
- Return handlers (`/api/sslcommerz/return/*`)

**Client never has access to:**
- Store credentials
- Payment validation logic
- Transaction processing

### 3. Transaction ID Generation

**Unique transaction IDs prevent replay attacks:**
```typescript
const tranId = `TXN${Date.now()}${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
```

**Format**: `TXN{timestamp}{random}`

### 4. IPN Validation

**Always validate IPN requests:**
- Use SSLCommerz validation API
- Verify transaction status server-side
- Don't trust client-side payment status alone

### 5. HTTPS Enforcement

**Production requires HTTPS:**
- SSLCommerz requires HTTPS for live mode
- Vercel automatically provides HTTPS
- Security headers configured in `vercel.json`

### 6. Input Validation

**Validate all inputs:**
- Cart items structure
- Customer information
- Transaction amounts
- Payment status values

## Test vs Live Mode

### Configuration

Set `SSLCOMMERZ_IS_LIVE` environment variable:
- `"false"` - Sandbox/Test mode
- `"true"` - Production/Live mode

### Test Mode (Sandbox)

**URL**: `https://sandbox.sslcommerz.com`

**Test Credentials:**
- Get from SSLCommerz Merchant Panel → Settings → API Credentials → Sandbox

**Test Cards:**
- Use SSLCommerz test card numbers
- No real money is charged

**Use Cases:**
- Development
- Testing payment flows
- Integration testing

### Live Mode (Production)

**URL**: `https://secure.sslcommerz.com`

**Live Credentials:**
- Get from SSLCommerz Merchant Panel → Settings → API Credentials → Live
- **Never use test credentials in production**

**Real Transactions:**
- Real money is charged
- Real customer payments

**Requirements:**
- HTTPS enabled
- Valid SSLCommerz merchant account
- Approved merchant status

### Switching Between Modes

**Local Development:**
```env
# .env.local
SSLCOMMERZ_IS_LIVE=false
```

**Production (Vercel):**
```bash
vercel env add SSLCOMMERZ_IS_LIVE production
# Enter: true
```

### Validation API URLs

**Test Mode:**
```
https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php
```

**Live Mode:**
```
https://secure.sslcommerz.com/validator/api/validationserverAPI.php
```

## Troubleshooting

### Common Issues

#### 1. "SSLCommerz configuration error"

**Cause**: Missing environment variables

**Solution**:
- Check `.env.local` (local) or Vercel environment variables (production)
- Ensure `SSLCOMMERZ_STORE_ID` and `SSLCOMMERZ_STORE_PASSWORD` are set

#### 2. Payment initiation fails

**Cause**: Invalid credentials or wrong mode

**Solution**:
- Verify credentials match the mode (sandbox vs live)
- Check `SSLCOMMERZ_IS_LIVE` value
- Verify credentials in SSLCommerz merchant panel

#### 3. IPN not received

**Cause**: IPN URL not accessible or validation fails

**Solution**:
- Ensure IPN URL is publicly accessible (not localhost)
- Check Vercel function logs
- Verify IPN URL in SSLCommerz merchant panel settings
- Test IPN endpoint manually

#### 4. Return handler redirect fails

**Cause**: Invalid redirect URL or CORS issues

**Solution**:
- Ensure return URLs are absolute (include domain)
- Check `baseUrl` calculation in checkout route
- Verify redirect URLs in SSLCommerz settings

### Debugging

**Enable debug logging:**
```typescript
if (process.env.NODE_ENV !== 'production') {
  console.log('Payment data:', data);
}
```

**Check Vercel Function Logs:**
- Vercel Dashboard → Project → Functions → Logs
- Filter by function name (e.g., `api/checkout`)

**Test IPN Locally:**
- Use ngrok to expose local server
- Update IPN URL in SSLCommerz to ngrok URL
- Test payment flow

## Best Practices

1. **Always validate IPN** - Don't trust return URLs alone
2. **Use unique transaction IDs** - Prevent duplicate payments
3. **Store transaction data** - Log all payment attempts
4. **Handle failures gracefully** - Show user-friendly error messages
5. **Test thoroughly** - Use sandbox mode before going live
6. **Monitor logs** - Track payment success/failure rates
7. **Update order status** - Based on IPN, not return URLs

## Future Enhancements

- [ ] Database integration for order storage
- [ ] Email notifications on payment success
- [ ] Order status tracking page
- [ ] Payment retry mechanism
- [ ] Refund handling
- [ ] Payment analytics dashboard

---

**Last Updated**: 2024
**Maintained By**: STRYV Development Team

