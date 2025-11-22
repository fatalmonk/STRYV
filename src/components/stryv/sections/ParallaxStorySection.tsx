// components/stryv/sections/ParallaxStorySection.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

interface ParallaxStorySectionProps {
  image: string;
  title: string;
  subtitle: string;
}

const ParallaxStorySection = ({ image, title, subtitle }: ParallaxStorySectionProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <section id="story">
      <div ref={ref} className="relative h-[80vh] overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0 will-change-transform"
        >
          <div className="relative w-full h-full">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        </motion.div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl mt-6 max-w-2xl mx-auto font-medium text-zinc-200"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ParallaxStorySection;