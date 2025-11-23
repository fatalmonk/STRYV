import { NextRequest, NextResponse } from 'next/server';

/**
 * SSLCommerz IPN (Instant Payment Notification) Handler
 * Server-to-server verification - SSLCommerz sends validation even if user closes browser
 * 
 * IMPORTANT: This endpoint MUST always return 200 OK, otherwise SSLCommerz will blacklist your domain
 */
interface SSLCommerzIPNData {
  val_id?: string;
  tran_id?: string;
  amount?: string;
  status?: string;
  [key: string]: FormDataEntryValue | undefined;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData) as SSLCommerzIPNData;

    // eslint-disable-next-line no-console
    console.log('IPN received:', data);

    // Validate SSLCommerz credentials
    if (!process.env.SSLCOMMERZ_STORE_ID || !process.env.SSLCOMMERZ_STORE_PASSWORD) {
      // eslint-disable-next-line no-console
      console.error('SSLCommerz credentials are not set');
      // Still return 200 to avoid blacklisting
      return NextResponse.json({ ok: false, error: 'Configuration error' });
    }

    // Check if val_id is present
    if (!data.val_id) {
      // eslint-disable-next-line no-console
      console.warn('IPN received without val_id');
      return NextResponse.json({ ok: false, error: 'Missing val_id' });
    }

    // Determine if we're in live or sandbox mode
    const isLive = process.env.SSLCOMMERZ_IS_LIVE === 'true';
    const baseUrl = isLive 
      ? 'https://securepay.sslcommerz.com'
      : 'https://sandbox.sslcommerz.com';

    // Validate with SSLCommerz
    const validationUrl = `${baseUrl}/validator/api/validationserverAPI.php?val_id=${data.val_id}&store_id=${process.env.SSLCOMMERZ_STORE_ID}&store_passwd=${process.env.SSLCOMMERZ_STORE_PASSWORD}&v=1&format=json`;

    const response = await fetch(validationUrl);
    const result = await response.json() as { status?: string };

    // eslint-disable-next-line no-console
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
      
      // eslint-disable-next-line no-console
      console.log('Payment validated successfully:', {
        tran_id: data.tran_id,
        amount: data.amount,
        status: result.status
      });

      return NextResponse.json({ ok: true, valid: true });
    } else {
      // Payment validation failed
      // eslint-disable-next-line no-console
      console.warn('Payment validation failed:', result);
      return NextResponse.json({ ok: false, valid: false });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('IPN error:', error);
    // Always return 200 OK to prevent SSLCommerz from blacklisting
    return NextResponse.json({ ok: false, error: true });
  }
}

