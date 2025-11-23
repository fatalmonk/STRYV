import { NextRequest, NextResponse } from 'next/server';
import type { CartItem } from '@/lib/stryv/types';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const SSLCommerzPayment = require('sslcommerz');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cartItems, customerInfo } = body;

    // Validate required fields
    if (!cartItems || !Array.isArray(cartItems)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid request: cartItems is required and must be an array' },
        { status: 400 }
      );
    }

    // Validate cart items structure
    for (const item of cartItems) {
      if (!item.id || !item.name || typeof item.price !== 'number' || typeof item.quantity !== 'number') {
        return NextResponse.json(
          { ok: false, error: 'Invalid cart item structure' },
          { status: 400 }
        );
      }
    }

    // Validate environment variables
    if (!process.env.SSLCOMMERZ_STORE_ID || !process.env.SSLCOMMERZ_STORE_PASSWORD) {
      console.error('SSLCommerz credentials are not set');
      return NextResponse.json(
        { ok: false, error: 'SSLCommerz configuration error' },
        { status: 500 }
      );
    }

    if (!process.env.SSLCOMMERZ_SUCCESS_URL || !process.env.SSLCOMMERZ_FAIL_URL || !process.env.SSLCOMMERZ_CANCEL_URL) {
      console.error('SSLCommerz URLs are not set');
      return NextResponse.json(
        { ok: false, error: 'SSLCommerz configuration error' },
        { status: 500 }
      );
    }

    // Calculate total amount
    const totalAmount = cartItems.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0
    );

    // Generate unique transaction ID
    const tranId = `TXN${Date.now()}${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    // Initialize SSLCommerz
    const isLive = process.env.SSLCOMMERZ_IS_LIVE === 'true';
    const sslcommerz = new SSLCommerzPayment(
      process.env.SSLCOMMERZ_STORE_ID,
      process.env.SSLCOMMERZ_STORE_PASSWORD,
      isLive
    );

    // Get base URL from request
    const baseUrl = req.nextUrl.origin;

    // Prepare payment data
    const paymentData = {
      total_amount: totalAmount,
      currency: 'BDT',
      tran_id: tranId,
      success_url: `${baseUrl}${process.env.SSLCOMMERZ_SUCCESS_URL}`,
      fail_url: `${baseUrl}${process.env.SSLCOMMERZ_FAIL_URL}`,
      cancel_url: `${baseUrl}${process.env.SSLCOMMERZ_CANCEL_URL}`,
      ipn_url: `${baseUrl}/api/payment/ipn`,
      shipping_method: 'Courier',
      product_name: cartItems.length === 1 
        ? cartItems[0].name 
        : `${cartItems.length} Items`,
      product_category: 'General',
      product_profile: 'general',
      cus_name: customerInfo?.name || 'Customer',
      cus_email: customerInfo?.email || 'customer@example.com',
      cus_add1: customerInfo?.address || 'Dhaka',
      cus_city: customerInfo?.city || 'Dhaka',
      cus_postcode: customerInfo?.postcode || '1000',
      cus_country: customerInfo?.country || 'Bangladesh',
      cus_phone: customerInfo?.phone || '01700000000',
      // Additional metadata
      value_a: JSON.stringify(cartItems.map((item: CartItem) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }))),
    };

    // Initiate payment
    const response = await sslcommerz.init(paymentData);

    if (response.status === 'SUCCESS' && response.GatewayPageURL) {
      return NextResponse.json({
        ok: true,
        url: response.GatewayPageURL,
        sessionId: tranId,
      });
    } else {
      console.error('SSLCommerz initiation failed:', response);
      return NextResponse.json(
        { ok: false, error: 'Failed to initiate payment' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

