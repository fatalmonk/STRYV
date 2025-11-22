// components/stryv/sections/VintageCollectionSection.tsx
'use client';

import ProductCard from '../ui/ProductCard';
import type { Product } from '../../../lib/stryv/types';

interface VintageCollectionSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const VintageCollectionSection = ({ products, onAddToCart }: VintageCollectionSectionProps) => {
  return (
    <section id="vintage" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-3">
          Vintage Collection
        </h2>
        <div className="w-20 h-1 bg-black mx-auto" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default VintageCollectionSection;