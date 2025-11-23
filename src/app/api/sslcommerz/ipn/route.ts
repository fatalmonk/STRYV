import { NextRequest, NextResponse } from 'next/server';

/**
 * SSLCommerz IPN (Instant Payment Notification) Handler
 * Server-to-server verification - SSLCommerz sends validation even if user closes browser
 * 
 * IMPORTANT: This endpoint MUST always return 200 OK, otherwise SSLCommerz will blacklist your domain
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data: any = Object.fromEntries(formData);

    console.log('IPN received:', data);

    // Validate SSLCommerz credentials
    if (!process.env.SSLCOMMERZ_STORE_ID || !process.env.SSLCOMMERZ_STORE_PASSWORD) {
      console.error('SSLCommerz credentials are not set');
      // Still return 200 to avoid blacklisting
      return NextResponse.json({ ok: false, error: 'Configuration error' });
    }

    // Determine if we're in live or sandbox mode
    const isLive = process.env.SSLCOMMERZ_IS_LIVE === 'true';
    const baseUrl = isLive 
      ? 'https://securepay.sslcommerz.com'
      : 'https://sandbox.sslcommerz.com';

    // Validate with SSLCommerz
    const validationUrl = `${baseUrl}/validator/api/validationserverAPI.php?val_id=${data.val_id}&store_id=${process.env.SSLCOMMERZ_STORE_ID}&store_passwd=${process.env.SSLCOMMERZ_STORE_PASSWORD}&v=1&format=json`;

    const response = await fetch(validationUrl);
    const result = await response.json();

    console.log('IPN validation result:', result);

    if (result.status === 'VALID' || result.status === 'VALIDATED') {
      // Payment is valid
      // TODO: Save order to database here
      // Example:
      // await saveOrder({
      //   transactionId: data.tran_id,
      //   amount: data.amount,
      //   status: 'paid',
      //   customerInfo: { ... }
      // });
      
      console.log('Payment validated successfully:', {
        tran_id: data.tran_id,
        amount: data.amount,
        status: result.status
      });

      return NextResponse.json({ ok: true, valid: true });
    } else {
      // Payment validation failed
      console.warn('Payment validation failed:', result);
      return NextResponse.json({ ok: false, valid: false });
    }
  } catch (error) {
    console.error('IPN error:', error);
    // Always return 200 OK to prevent SSLCommerz from blacklisting
    return NextResponse.json({ ok: false, error: true });
  }
}

