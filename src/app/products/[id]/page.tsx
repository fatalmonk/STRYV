import { getAllProducts, getProductById } from '@/lib/stryv/products';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ProductDetailClient from './product-detail-client';

export async function generateStaticParams() {
  const allProducts = getAllProducts();
  return allProducts.map((product) => ({ id: product.id }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <section className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="relative w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden mb-6 bg-zinc-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
          priority
        />
      </div>
      <ProductDetailClient product={product} />
    </section>
  );
}
