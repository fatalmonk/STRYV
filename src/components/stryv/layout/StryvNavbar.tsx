// components/stryv/layout/StryvNavbar.tsx
'use client';

import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StryvNavbarProps {
  cartCount: number;
  onCartOpen: () => void;
}

const StryvNavbar = ({ cartCount, onCartOpen }: StryvNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="sticky top-0 w-full z-50 bg-black text-white border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>

          {/* Logo */}
          <div className="text-2xl font-black tracking-tighter uppercase flex-1 md:flex-none text-center md:text-left">
            STRYV
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 text-sm font-bold uppercase tracking-wide text-zinc-300">
            <a href="#vintage" className="hover:text-white transition">
              Vintage
            </a>
            <a href="#moments" className="hover:text-white transition">
              Moments
            </a>
            <a href="#story" className="hover:text-white transition">
              Our Story
            </a>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button
              className="hidden md:block hover:text-zinc-300 transition"
              aria-label="Search"
            >
              <Search className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              className="hidden md:block hover:text-zinc-300 transition"
              aria-label="Account"
            >
              <User className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              className="relative group hover:text-zinc-300 transition"
              onClick={onCartOpen}
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-white text-black rounded-full text-[10px] flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black text-white pt-24 px-6">
          <div className="flex flex-col space-y-6 text-2xl font-bold uppercase tracking-tight">
            <a href="#vintage" onClick={() => setIsMenuOpen(false)}>
              Vintage
            </a>
            <a href="#moments" onClick={() => setIsMenuOpen(false)}>
              Moments
            </a>
            <a href="#story" onClick={() => setIsMenuOpen(false)}>
              Our Story
            </a>
            <div className="pt-6 border-t border-zinc-800 flex flex-col space-y-4 text-sm text-zinc-400">
              <button className="text-left">Account</button>
              <button className="text-left">Search</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StryvNavbar;