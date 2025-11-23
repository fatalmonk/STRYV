'use client';

import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const tranId = searchParams.get('tran_id');

  useEffect(() => {
    // Clear cart on successful payment
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tight">Payment Successful!</h1>
        <p className="text-zinc-600">
          Thank you for your purchase. Your payment has been processed successfully.
        </p>
        {tranId && (
          <div className="bg-zinc-50 p-4 rounded-sm">
            <p className="text-xs text-zinc-500 uppercase tracking-wide">Transaction ID</p>
            <p className="text-sm font-mono font-bold mt-1">{tranId}</p>
          </div>
        )}
        <p className="text-sm text-zinc-500">
          You will receive an email confirmation shortly with your order details.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            href="/"
            className="flex-1 bg-black text-white font-bold uppercase py-3 hover:bg-zinc-800 transition tracking-widest text-sm"
          >
            Continue Shopping
          </Link>
          <Link
            href="/cart"
            className="flex-1 bg-zinc-100 text-black font-bold uppercase py-3 hover:bg-zinc-200 transition tracking-widest text-sm"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

