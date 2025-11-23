import { getAllProducts } from '@/lib/stryv/products';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'STRYV Product Management Dashboard'
};

export default function AdminDashboard() {
  const products = getAllProducts();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold uppercase tracking-tight text-black mb-2">
            Admin Dashboard
          </h1>
          <p className="text-zinc-500 uppercase tracking-wide text-sm">
            Product Management
          </p>
        </div>

        {/* Products Table */}
        <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-900">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-900">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-900">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-900">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-900">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative w-16 h-16 bg-zinc-100 rounded overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-zinc-600">{product.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold uppercase tracking-tight text-zinc-900">
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-zinc-500 uppercase tracking-wide">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-zinc-900">
                        ৳{product.price.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="inline-flex items-center px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="bg-zinc-50 px-6 py-4 border-t border-zinc-200">
            <p className="text-xs text-zinc-500 uppercase tracking-wide">
              Total Products: <span className="font-bold text-zinc-900">{products.length}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

