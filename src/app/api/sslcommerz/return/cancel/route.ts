import { NextRequest, NextResponse } from 'next/server';

/**
 * SSLCommerz Cancel Return Handler
 * User cancelled the payment
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data: any = Object.fromEntries(formData);

    console.log('CANCEL return data:', data);

    const redirectUrl = new URL('/checkout/cancelled', req.url);
    if (data.tran_id) {
      redirectUrl.searchParams.set('tran_id', data.tran_id.toString());
    }
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Cancel return error:', error);
    return NextResponse.redirect(new URL('/checkout/error', req.url));
  }
}

