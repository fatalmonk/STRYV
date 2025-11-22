// components/stryv/ui/ProductCard.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Product } from '../../../lib/stryv/types';

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
  variant?: 'default' | 'compact';
}

const ProductCard = ({ product, index, onAddToCart, variant = 'default' }: ProductCardProps) => {
  const isCompact = variant === 'compact';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
    >
      <div className={`relative ${isCompact ? 'aspect-[4/5]' : 'aspect-[4/5]'} bg-zinc-100 mb-6 overflow-hidden`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition duration-700"
          sizes={isCompact ? '(min-width: 1024px) 20vw, 50vw' : '(min-width: 1024px) 25vw, 50vw'}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition duration-300">
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-black text-white py-3 font-bold uppercase text-xs tracking-widest hover:bg-zinc-800 transition"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="text-center space-y-1">
        <h3 className={`font-bold uppercase tracking-tight ${isCompact ? 'text-sm' : 'text-lg'}`}>
          {product.name}
        </h3>
        <p className={`text-zinc-500 uppercase tracking-wide ${isCompact ? 'text-[10px]' : 'text-xs'}`}>
          {product.category}
        </p>
        <p className="font-bold text-zinc-900 mt-2">৳{product.price.toLocaleString()}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;