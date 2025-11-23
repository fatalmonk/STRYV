#!/bin/bash

# Quick script to set SSLCommerz env vars using Vercel API
# Usage: VERCEL_API_TOKEN=your_token ./scripts/set-vercel-env-quick.sh

set -e

API_TOKEN=${VERCEL_API_TOKEN:-$AI_GATEWAY_API_KEY}
PROJECT_NAME="stryv-landing"  # Update with your actual Vercel project name

if [ -z "$API_TOKEN" ]; then
    echo "Error: VERCEL_API_TOKEN or AI_GATEWAY_API_KEY must be set"
    exit 1
fi

# Get project ID first
PROJECT_ID=$(curl -s -H "Authorization: Bearer $API_TOKEN" \
    "https://api.vercel.com/v9/projects/$PROJECT_NAME" | \
    grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

if [ -z "$PROJECT_ID" ]; then
    echo "Error: Could not find project. Check project name."
    exit 1
fi

echo "Setting environment variables for project: $PROJECT_NAME"

# Function to set env var via API
set_env() {
    local key=$1
    local value=$2
    local target=$3  # production, preview, or development

    curl -s -X POST "https://api.vercel.com/v10/projects/$PROJECT_ID/env" \
        -H "Authorization: Bearer $API_TOKEN" \
        -H "Content-Type: application/json" \
        -d "{
            \"key\": \"$key\",
            \"value\": \"$value\",
            \"target\": [\"$target\"],
            \"type\": \"encrypted\"
        }" > /dev/null

    echo "✓ Set $key for $target"
}

# Read values (you can also set these as environment variables)
read -p "SSLCommerz Store ID: " STORE_ID
read -sp "SSLCommerz Store Password: " STORE_PASSWORD
echo
read -p "Environment (production/preview/development) [production]: " TARGET
TARGET=${TARGET:-production}

set_env "SSLCOMMERZ_STORE_ID" "$STORE_ID" "$TARGET"
set_env "SSLCOMMERZ_STORE_PASSWORD" "$STORE_PASSWORD" "$TARGET"
set_env "SSLCOMMERZ_IS_LIVE" "false" "$TARGET"
set_env "SSLCOMMERZ_SUCCESS_URL" "/checkout/success" "$TARGET"
set_env "SSLCOMMERZ_FAIL_URL" "/checkout/failed" "$TARGET"
set_env "SSLCOMMERZ_CANCEL_URL" "/checkout/cancelled" "$TARGET"

echo "Done! Redeploy your project for changes to take effect."

