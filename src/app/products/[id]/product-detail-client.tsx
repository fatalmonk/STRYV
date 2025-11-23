'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import type { Product } from '@/lib/stryv/types';
import SizeSelector from '@/components/stryv/ui/SizeSelector';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.defaultSize || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : '') || ''
  );

  const handleAddToCart = () => {
    if (!selectedSize) {
      return;
    }
    addToCart({ ...product, size: selectedSize } as Product & { size: string });
  };

  const handleWishlistToggle = () => {
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900">
              {product.name}
            </h1>
            <p className="text-sm uppercase tracking-wide text-zinc-500 font-semibold">
              {product.category}
            </p>
          </div>
          <button
            onClick={handleWishlistToggle}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors flex-shrink-0"
            aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          >
            <Heart
              className={`w-6 h-6 transition-colors ${
                wishlisted ? 'fill-red-500 text-red-500' : 'text-zinc-700'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-3xl font-bold text-zinc-900">
          ৳{product.price.toLocaleString()}
        </p>
        <p className="text-zinc-600 leading-relaxed max-w-2xl">
          Short description placeholder for {product.name}. This premium piece captures the essence
          of football heritage with modern streetwear aesthetics.
        </p>
      </div>

      <SizeSelector
        sizes={product.sizes}
        selected={selectedSize}
        onChange={setSelectedSize}
      />

      <button
        onClick={handleAddToCart}
        disabled={!selectedSize}
        className="w-full md:w-auto px-8 py-4 bg-black text-white font-bold uppercase tracking-widest text-sm hover:bg-zinc-800 transition disabled:bg-zinc-400 disabled:cursor-not-allowed"
        aria-label={`Add ${product.name} to cart`}
      >
        Add to Cart
      </button>
    </div>
  );
}
