'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import { useState } from 'react';
import { CartProvider, useCart } from '../../context/CartContext';
import { momentsCollection, vintageCollection } from '../../lib/stryv/products';
import { testimonials } from '../../lib/stryv/testimonials';

import StryvFooter from './layout/StryvFooter';
import StryvNavbar from './layout/StryvNavbar';
import CartDrawer from './product/CartDrawer';
import CheckoutModal from './product/CheckoutModal';
import MomentsCollectionSection from './sections/MomentsCollectionSection';
import ParallaxStorySection from './sections/ParallaxStorySection';
import StickyHero from './sections/StickyHero';
import TestimonialsSection from './sections/TestimonialsSection';
import VintageCollectionSection from './sections/VintageCollectionSection';

const LandingContent = () => {
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const { addToCart, cartCount, setIsCartOpen } = useCart();

    return (
        <ReactLenis root options={{ duration: 0.7, smoothWheel: true, wheelMultiplier: 1.2 }}>
            <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-black selection:text-white">
                <StryvNavbar
                    cartCount={cartCount}
                    onCartOpen={() => setIsCartOpen(true)}
                />

                <CartDrawer onCheckout={() => setIsCheckoutOpen(true)} />
                <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />

                <StickyHero />

                <div className="relative z-20 bg-white">
                    <ParallaxStorySection
                        image="/images/hero_alt.png"
                        title="Born From Passion"
                        subtitle="We craft apparel that tells your football story. From heart-pounding iconic moments immortalized on tees to casual wear that showcases your devotion."
                    />

                    <VintageCollectionSection
                        products={vintageCollection}
                        onAddToCart={addToCart}
                    />

                    <MomentsCollectionSection
                        products={momentsCollection}
                        onAddToCart={addToCart}
                    />

                    <TestimonialsSection testimonials={testimonials} />

                    <StryvFooter />
                </div>
            </div>
        </ReactLenis>
    );
};

const StryvLandingRoot = () => {
    return (
        <CartProvider>
            <LandingContent />
        </CartProvider>
    );
};

export default StryvLandingRoot;
