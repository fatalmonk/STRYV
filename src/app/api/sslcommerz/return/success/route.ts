import { NextRequest, NextResponse } from 'next/server';

interface SSLCommerzReturnData {
  status?: string;
  tran_id?: string;
  [key: string]: FormDataEntryValue | undefined;
}

/**
 * SSLCommerz Success Return Handler
 * User just paid → SSLCommerz redirected → confirm payload → redirect to thank-you page
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData) as SSLCommerzReturnData;

    // eslint-disable-next-line no-console
    console.log('SUCCESS return data:', data);

    // Basic validation
    if (!data.status || data.status !== 'VALID') {
      return NextResponse.redirect(new URL('/checkout/error', req.url));
    }

    // Redirect user to thank-you page with transaction ID
    const redirectUrl = new URL('/checkout/success', req.url);
    if (data.tran_id) {
      redirectUrl.searchParams.set('tran_id', data.tran_id.toString());
    }
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Success return error:', error);
    return NextResponse.redirect(new URL('/checkout/error', req.url));
  }
}

