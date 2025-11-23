# Vercel Environment Variables Setup Guide

This guide helps you set up SSLCommerz environment variables in your Vercel project.

## Required Environment Variables

Your project needs these SSLCommerz environment variables:

- `SSLCOMMERZ_STORE_ID` - Your SSLCommerz Store ID
- `SSLCOMMERZ_STORE_PASSWORD` - Your SSLCommerz Store Password  
- `SSLCOMMERZ_IS_LIVE` - `"true"` for production, `"false"` for sandbox
- `SSLCOMMERZ_SUCCESS_URL` - `/checkout/success`
- `SSLCOMMERZ_FAIL_URL` - `/checkout/failed`
- `SSLCOMMERZ_CANCEL_URL` - `/checkout/cancelled`

## Method 1: Using Vercel CLI (Recommended)

### Step 1: Login to Vercel
```bash
vercel login
```

### Step 2: Set Environment Variables
```bash
# Set for production
vercel env add SSLCOMMERZ_STORE_ID production
vercel env add SSLCOMMERZ_STORE_PASSWORD production
vercel env add SSLCOMMERZ_IS_LIVE production
vercel env add SSLCOMMERZ_SUCCESS_URL production
vercel env add SSLCOMMERZ_FAIL_URL production
vercel env add SSLCOMMERZ_CANCEL_URL production

# Set for preview (optional)
vercel env add SSLCOMMERZ_STORE_ID preview
vercel env add SSLCOMMERZ_STORE_PASSWORD preview
vercel env add SSLCOMMERZ_IS_LIVE preview
# ... (repeat for other vars)

# Set for development (optional)
vercel env add SSLCOMMERZ_STORE_ID development
vercel env add SSLCOMMERZ_STORE_PASSWORD development
vercel env add SSLCOMMERZ_IS_LIVE development
# ... (repeat for other vars)
```

When prompted, enter the values:
- **Store ID**: Your SSLCommerz store ID
- **Store Password**: Your SSLCommerz store password
- **IS_LIVE**: `false` for sandbox, `true` for production
- **URLs**: Use the default values shown (just press Enter)

### Step 3: Redeploy
```bash
vercel --prod
```

## Method 2: Using Vercel Dashboard

1. Go to your project on [vercel.com](https://vercel.com)
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - Click **Add New**
   - Enter the variable name (e.g., `SSLCOMMERZ_STORE_ID`)
   - Enter the value
   - Select environments (Production, Preview, Development)
   - Click **Save**
4. Repeat for all variables
5. Redeploy your project

## Method 3: Using the Setup Script

We've created a helper script:

```bash
# Interactive script
./scripts/set-vercel-env.sh
```

This script will:
- Check if you're logged into Vercel
- Prompt for SSLCommerz credentials
- Set all required environment variables
- Configure for the environment(s) you choose

## Method 4: Using Vercel API

If you have a Vercel API token:

```bash
export VERCEL_API_TOKEN="your_token_here"
./scripts/set-vercel-env-quick.sh
```

Or use the API directly:

```bash
curl -X POST "https://api.vercel.com/v10/projects/{PROJECT_ID}/env" \
  -H "Authorization: Bearer $VERCEL_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "SSLCOMMERZ_STORE_ID",
    "value": "your_store_id",
    "target": ["production"],
    "type": "encrypted"
  }'
```

## Getting SSLCommerz Credentials

1. Go to [SSLCommerz Merchant Panel](https://merchant.sslcommerz.com/)
2. Login to your account
3. Navigate to **Settings** → **API Credentials**
4. Copy your **Store ID** and **Store Password**
5. For testing, use **Sandbox** credentials
6. For production, use **Live** credentials

## Testing

After setting up environment variables:

1. Make sure `SSLCOMMERZ_IS_LIVE` is set to `"false"` for testing
2. Use SSLCommerz sandbox credentials
3. Try a test checkout
4. Check Vercel function logs if there are errors

## Troubleshooting

### "SSLCommerz configuration error"
- Check that all environment variables are set in Vercel
- Verify you're using the correct Store ID and Password
- Ensure URLs are set correctly (should start with `/`)

### "Failed to initiate payment"
- Check Vercel function logs for detailed error messages
- Verify SSLCommerz credentials are correct
- Ensure `SSLCOMMERZ_IS_LIVE` matches your credentials (sandbox vs live)
- Check that your Store ID and Password are for the same environment

### Environment variables not updating
- Redeploy your project after adding environment variables
- Check that variables are set for the correct environment (production/preview/development)
- Clear Vercel build cache if needed

## Security Notes

- Never commit environment variables to git
- Use Vercel's encrypted environment variables
- Rotate credentials if they're exposed
- Use different credentials for development and production

