import { NextRequest, NextResponse } from 'next/server';

/**
 * SSLCommerz Fail Return Handler
 * User payment failed or was declined
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data: any = Object.fromEntries(formData);

    console.log('FAIL return data:', data);

    const redirectUrl = new URL('/checkout/failed', req.url);
    if (data.tran_id) {
      redirectUrl.searchParams.set('tran_id', data.tran_id.toString());
    }
    if (data.error) {
      redirectUrl.searchParams.set('error', data.error.toString());
    }
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Fail return error:', error);
    return NextResponse.redirect(new URL('/checkout/error', req.url));
  }
}

