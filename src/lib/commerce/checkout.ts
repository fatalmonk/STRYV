'use client';

import type { CartItem } from '@/lib/stryv/types';

interface CustomerInfo {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postcode?: string;
  country?: string;
}

/**
 * Initiates SSLCommerz Checkout for the given cart items.
 * Redirects the user to SSLCommerz's hosted checkout page.
 * 
 * @param cartItems - Array of cart items to checkout
 * @param customerInfo - Optional customer information (name, email, phone, address, etc.)
 * @throws Error if the checkout request fails
 */
export async function beginCheckout(
  cartItems: CartItem[],
  customerInfo?: CustomerInfo
): Promise<void> {
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItems, customerInfo }),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.error || 'Failed to initiate checkout');
    }

    if (!data.url) {
      throw new Error('No checkout URL received from server');
    }

    // Redirect to SSLCommerz Checkout
    window.location.href = data.url;
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
}

