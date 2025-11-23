#!/bin/bash

# Script to set SSLCommerz environment variables in Vercel
# Usage: ./scripts/set-vercel-env.sh

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting SSLCommerz environment variables in Vercel...${NC}\n"

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}Error: Vercel CLI is not installed.${NC}"
    echo "Install it with: npm i -g vercel"
    exit 1
fi

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo -e "${RED}Error: Not logged into Vercel.${NC}"
    echo "Login with: vercel login"
    exit 1
fi

# Get project name from package.json or use current directory
PROJECT_NAME=$(node -p "require('./package.json').name" 2>/dev/null || basename "$PWD")

echo -e "${GREEN}Project: ${PROJECT_NAME}${NC}\n"

# Function to set environment variable
set_env_var() {
    local key=$1
    local value=$2
    local env=$3

    if [ -z "$value" ]; then
        echo -e "${YELLOW}Skipping ${key} (not set)${NC}"
        return
    fi

    echo -e "Setting ${GREEN}${key}${NC} for ${env}..."

    if [ "$env" == "all" ]; then
        vercel env add "$key" production < <(echo "$value") 2>/dev/null || true
        vercel env add "$key" preview < <(echo "$value") 2>/dev/null || true
        vercel env add "$key" development < <(echo "$value") 2>/dev/null || true
    else
        vercel env add "$key" "$env" < <(echo "$value") 2>/dev/null || true
    fi

    echo -e "${GREEN}✓${NC} ${key} set for ${env}\n"
}

# Read from .env.local if it exists
if [ -f .env.local ]; then
    echo -e "${GREEN}Reading from .env.local...${NC}\n"
    source .env.local
fi

# Prompt for values if not set
if [ -z "$SSLCOMMERZ_STORE_ID" ]; then
    read -p "Enter SSLCommerz Store ID: " SSLCOMMERZ_STORE_ID
fi

if [ -z "$SSLCOMMERZ_STORE_PASSWORD" ]; then
    read -sp "Enter SSLCommerz Store Password: " SSLCOMMERZ_STORE_PASSWORD
    echo
fi

if [ -z "$SSLCOMMERZ_IS_LIVE" ]; then
    read -p "Is this production? (y/n): " is_prod
    SSLCOMMERZ_IS_LIVE=$([ "$is_prod" = "y" ] && echo "true" || echo "false")
fi

# Set default URLs if not provided
SSLCOMMERZ_SUCCESS_URL=${SSLCOMMERZ_SUCCESS_URL:-"/checkout/success"}
SSLCOMMERZ_FAIL_URL=${SSLCOMMERZ_FAIL_URL:-"/checkout/failed"}
SSLCOMMERZ_CANCEL_URL=${SSLCOMMERZ_CANCEL_URL:-"/checkout/cancelled"}

# Ask which environments to set
echo -e "\n${YELLOW}Which environments should these be set for?${NC}"
echo "1) Production only"
echo "2) Preview only"
echo "3) Development only"
echo "4) All environments"
read -p "Choice (1-4): " env_choice

case $env_choice in
    1) ENV="production" ;;
    2) ENV="preview" ;;
    3) ENV="development" ;;
    4) ENV="all" ;;
    *) ENV="production" ;;
esac

# Set all environment variables
set_env_var "SSLCOMMERZ_STORE_ID" "$SSLCOMMERZ_STORE_ID" "$ENV"
set_env_var "SSLCOMMERZ_STORE_PASSWORD" "$SSLCOMMERZ_STORE_PASSWORD" "$ENV"
set_env_var "SSLCOMMERZ_IS_LIVE" "$SSLCOMMERZ_IS_LIVE" "$ENV"
set_env_var "SSLCOMMERZ_SUCCESS_URL" "$SSLCOMMERZ_SUCCESS_URL" "$ENV"
set_env_var "SSLCOMMERZ_FAIL_URL" "$SSLCOMMERZ_FAIL_URL" "$ENV"
set_env_var "SSLCOMMERZ_CANCEL_URL" "$SSLCOMMERZ_CANCEL_URL" "$ENV"

echo -e "${GREEN}✓ All environment variables set!${NC}\n"
echo -e "${YELLOW}Note: You may need to redeploy for changes to take effect.${NC}"
echo "Redeploy with: vercel --prod"

