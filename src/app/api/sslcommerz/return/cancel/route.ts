import { NextRequest, NextResponse } from 'next/server';

interface SSLCommerzReturnData {
  tran_id?: string;
  [key: string]: FormDataEntryValue | undefined;
}

/**
 * SSLCommerz Cancel Return Handler
 * User cancelled the payment
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData) as SSLCommerzReturnData;

    // eslint-disable-next-line no-console
    console.log('CANCEL return data:', data);

    const redirectUrl = new URL('/checkout/cancelled', req.url);
    if (data.tran_id) {
      redirectUrl.searchParams.set('tran_id', data.tran_id.toString());
    }
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Cancel return error:', error);
    return NextResponse.redirect(new URL('/checkout/error', req.url));
  }
}

