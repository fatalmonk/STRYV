// components/stryv/sections/MomentsCollectionSection.tsx
'use client';

import ProductCard from '../ui/ProductCard';
import type { Product } from '../../../lib/stryv/types';

interface MomentsCollectionSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const MomentsCollectionSection = ({ products, onAddToCart }: MomentsCollectionSectionProps) => {
  return (
    <section id="moments" className="py-24 px-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-3">
            Iconic Moments
          </h2>
          <div className="w-20 h-1 bg-black mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-12">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onAddToCart={onAddToCart}
              variant="compact"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MomentsCollectionSection;