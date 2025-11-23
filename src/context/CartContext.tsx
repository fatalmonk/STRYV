// context/CartContext.tsx
'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import type { CartItem, Product } from '../lib/stryv/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product & { size?: string }) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product & { size?: string }) => {
    const selectedSize = product.size || product.defaultSize || product.sizes[0] || undefined;
    setItems(prev => {
      // Find existing item with same id and size (handles undefined for backward compatibility)
      const existing = prev.find(
        item => item.id === product.id && 
        (item.selectedSize === selectedSize || (!item.selectedSize && !selectedSize))
      );
      if (existing) {
        return prev.map(item =>
          item.id === product.id && 
          (item.selectedSize === selectedSize || (!item.selectedSize && !selectedSize))
            ? { ...item, quantity: item.quantity + 1, selectedSize: selectedSize || item.selectedSize }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size?: string) => {
    setItems(prev =>
      prev.filter(item => 
        !(item.id === productId && 
          (item.selectedSize === size || (!item.selectedSize && !size)))
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, size?: string) => {
    if (quantity <= 0) {
      setItems(prev =>
        prev.filter(item => 
          !(item.id === productId && 
            (item.selectedSize === size || (!item.selectedSize && !size)))
        )
      );
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === productId && 
        (item.selectedSize === size || (!item.selectedSize && !size))
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const clearCart = () => setItems([]);

  const { cartCount, cartTotal } = useMemo(
    () => ({
      cartCount: items.reduce((acc, item) => acc + item.quantity, 0),
      cartTotal: items.reduce((acc, item) => acc + item.quantity * item.price, 0),
    }),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};