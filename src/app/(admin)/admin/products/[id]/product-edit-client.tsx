'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/stryv/types';

interface ProductEditClientProps {
  product: Product;
}

export default function ProductEditClient({ product }: ProductEditClientProps) {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price.toString(),
    category: product.category,
    image: product.image
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Mock save - console.log the updated product object
    const updatedProduct: Product = {
      id: product.id,
      name: formData.name,
      price: parseFloat(formData.price) || 0,
      category: formData.category,
      image: formData.image,
      sizes: product.sizes || []
    };

    // eslint-disable-next-line no-console
    console.log('Updated Product:', updatedProduct);

    // Simulate API call delay
    setTimeout(() => {
      setIsSaving(false);
      alert('Product saved! (Check console for updated product object)');
    }, 500);
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* Image Preview */}
        <div className="space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-900">
            Product Image Preview
          </label>
          <div className="relative w-full aspect-[4/5] max-w-md bg-zinc-100 rounded-lg overflow-hidden">
            <Image
              src={formData.image}
              alt={formData.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Image URL Input */}
        <div className="space-y-2">
          <label
            htmlFor="image"
            className="block text-xs font-bold uppercase tracking-wider text-zinc-900"
          >
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
            placeholder="/images/product_1.jpg"
          />
        </div>

        {/* Product Name Input */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-xs font-bold uppercase tracking-wider text-zinc-900"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm uppercase tracking-tight"
            placeholder="Product Name"
            required
          />
        </div>

        {/* Category Input */}
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-xs font-bold uppercase tracking-wider text-zinc-900"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm uppercase tracking-wide"
            placeholder="Category"
            required
          />
        </div>

        {/* Price Input */}
        <div className="space-y-2">
          <label
            htmlFor="price"
            className="block text-xs font-bold uppercase tracking-wider text-zinc-900"
          >
            Price (৳)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
            placeholder="0"
            min="0"
            step="0.01"
            required
          />
        </div>

        {/* Product ID (Read-only) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-900">
            Product ID
          </label>
          <input
            type="text"
            value={product.id}
            disabled
            className="w-full px-4 py-3 border border-zinc-200 bg-zinc-50 rounded-lg text-sm font-mono text-zinc-500 cursor-not-allowed"
          />
          <p className="text-xs text-zinc-400 italic">Product ID cannot be changed</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-6 border-t border-zinc-200">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
          <Link
            href="/admin"
            className="px-6 py-3 border border-zinc-300 text-zinc-900 text-xs font-bold uppercase tracking-wider hover:bg-zinc-50 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

