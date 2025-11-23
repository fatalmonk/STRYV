'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/stryv/ui/ProductCard';
import { useCart } from '@/context/CartContext';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900 mb-8">
            Your Wishlist
          </h1>
          <div className="flex flex-col items-center justify-center py-16 space-y-6">
            <Heart className="w-16 h-16 text-zinc-300" aria-hidden="true" />
            <p className="text-zinc-500 text-lg">Your wishlist is empty.</p>
            <Link
              href="/"
              className="text-black font-bold uppercase text-sm underline hover:text-zinc-600 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900">
            Your Wishlist
          </h1>
          <p className="text-sm text-zinc-500 uppercase tracking-wide">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlist.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

