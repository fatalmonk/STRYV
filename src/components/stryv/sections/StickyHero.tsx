// components/stryv/sections/StickyHero.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const StickyHero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <div ref={containerRef} className="h-screen relative flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ scale }}
        className="fixed inset-0 w-full h-full z-0 will-change-transform"
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/hero.png"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </motion.div>

      <div className="relative z-10 text-center text-white px-6 mt-20">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-none"
        >
          STRYV
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-xl md:text-3xl font-medium mt-6 tracking-wide uppercase text-zinc-200"
        >
          Where Legends Are Made
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-12"
        >
          <a
            href="#vintage"
            className="bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-200 transition transform hover:scale-105 inline-block"
          >
            Shop The Drop
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default StickyHero;