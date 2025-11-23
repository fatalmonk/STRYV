# Quick Setup: SSLCommerz Environment Variables

## Using Your Vercel API Key

You can set environment variables using the Vercel CLI with your API key:

```bash
# Set the API token
export VERCEL_TOKEN="vck_2HuFmPNtM3FGlqdjUS2YbBZMJZeKlrwCymRPHUpIF1hPMtPwED3VyTNQ"

# Or use the AI_GATEWAY_API_KEY if it's the same
export VERCEL_TOKEN="$AI_GATEWAY_API_KEY"
```

## Quick Commands

### Option 1: Use Vercel CLI (Easiest)

```bash
# Login (if not already)
vercel login

# Set variables interactively
vercel env add SSLCOMMERZ_STORE_ID production
vercel env add SSLCOMMERZ_STORE_PASSWORD production
vercel env add SSLCOMMERZ_IS_LIVE production
vercel env add SSLCOMMERZ_SUCCESS_URL production
vercel env add SSLCOMMERZ_FAIL_URL production
vercel env add SSLCOMMERZ_CANCEL_URL production
```

When prompted, enter:
- **Store ID**: Your SSLCommerz store ID
- **Store Password**: Your SSLCommerz store password
- **IS_LIVE**: `false` (for sandbox) or `true` (for production)
- **URLs**: Press Enter to use defaults (`/checkout/success`, etc.)

### Option 2: Use the Helper Script

```bash
# Make sure you're in the project directory
cd /Users/mac.alvi/Desktop/Projects/STRYV

# Run the interactive script
./scripts/set-vercel-env.sh
```

### Option 3: Set via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable manually

## After Setting Variables

**Important**: Redeploy your project for changes to take effect:

```bash
vercel --prod
```

Or trigger a redeploy from the Vercel dashboard.

## Test Your Setup

1. Make sure `SSLCOMMERZ_IS_LIVE` is `false` for testing
2. Use SSLCommerz sandbox credentials
3. Try a test checkout
4. Check Vercel function logs if errors occur

## Current Status

✅ Project is linked to Vercel
✅ Vercel CLI is installed (v48.6.0)
✅ You're logged in as: anwaralvi18-9269

You're ready to set environment variables!

