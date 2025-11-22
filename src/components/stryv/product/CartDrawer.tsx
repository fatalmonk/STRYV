// components/stryv/product/CartDrawer.tsx
'use client';

import { Minus, Plus, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '../../../context/CartContext';

interface CartDrawerProps {
  onCheckout: () => void;
}

const CartDrawer = ({ onCheckout }: CartDrawerProps) => {
  const { items, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <button
        className="flex-1 bg-black/40"
        onClick={() => setIsCartOpen(false)}
        aria-label="Close cart"
      />

      {/* Drawer */}
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
        <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            <h2 className="font-black uppercase tracking-tight text-sm">Your Cart</h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-zinc-100 rounded-full transition"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-400 space-y-4">
              <ShoppingBag className="w-12 h-12 opacity-20" aria-hidden="true" />
              <p>Your cart is empty.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-black font-bold uppercase text-sm underline hover:text-zinc-600"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-24 bg-zinc-100 rounded-sm overflow-hidden flex-shrink-0 relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-tight">{item.name}</h3>
                    <p className="text-xs text-zinc-500">{item.category}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 border border-zinc-200 rounded-sm px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-black text-zinc-400 transition"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus className="w-3 h-3" aria-hidden="true" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-black text-zinc-400 transition"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus className="w-3 h-3" aria-hidden="true" />
                      </button>
                    </div>
                    <p className="font-bold text-zinc-900">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-zinc-100 bg-zinc-50 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="uppercase tracking-wide text-zinc-500 font-semibold">Subtotal</span>
              <span className="font-bold text-lg">
                ৳{cartTotal.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                onCheckout();
              }}
              className="w-full bg-black text-white font-bold uppercase py-4 hover:bg-zinc-800 transition tracking-widest text-sm"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;