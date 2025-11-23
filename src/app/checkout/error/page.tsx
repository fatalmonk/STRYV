'use client';

import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

function CheckoutErrorContent() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-orange-600" />
          </div>
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tight">Something Went Wrong</h1>
        <p className="text-zinc-600">
          We encountered an error processing your request. Please try again or contact support if the problem persists.
        </p>
        <div className="bg-zinc-50 p-4 rounded-sm">
          <p className="text-xs text-zinc-500 uppercase tracking-wide">Error Code</p>
          <p className="text-sm font-mono font-bold mt-1">CHECKOUT_ERROR</p>
        </div>
        <p className="text-sm text-zinc-500">
          If you were charged, please contact our support team with your transaction details.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            href="/cart"
            className="flex-1 bg-black text-white font-bold uppercase py-3 hover:bg-zinc-800 transition tracking-widest text-sm"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="flex-1 bg-zinc-100 text-black font-bold uppercase py-3 hover:bg-zinc-200 transition tracking-widest text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-50">
        <div className="text-center">
          <p className="text-zinc-600">Loading...</p>
        </div>
      </div>
    }>
      <CheckoutErrorContent />
    </Suspense>
  );
}

