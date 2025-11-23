import { getProductById } from '@/lib/stryv/products';
import { notFound } from 'next/navigation';
import ProductEditClient from './product-edit-client';

interface ProductEditPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductEditPageProps) {
  const product = getProductById(params.id);
  
  return {
    title: product ? `Edit ${product.name}` : 'Product Not Found',
    description: 'Edit product details'
  };
}

export default function ProductEditPage({ params }: ProductEditPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold uppercase tracking-tight text-black mb-2">
            Edit Product
          </h1>
          <p className="text-zinc-500 uppercase tracking-wide text-sm">
            {product.name}
          </p>
        </div>

        {/* Edit Form Client Component */}
        <ProductEditClient product={product} />
      </div>
    </div>
  );
}

