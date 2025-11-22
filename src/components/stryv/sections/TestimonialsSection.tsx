// components/stryv/sections/TestimonialsSection.tsx
'use client';

import type { Testimonial } from '../../../lib/stryv/types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-12">
          A Word From The Fans
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(testimonial => (
            <article key={testimonial.id} className="bg-zinc-100 p-8 rounded-none">
              <div className="flex items-center gap-1 mb-3" aria-hidden="true">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-600 text-lg">★</span>
                ))}
              </div>
              <p className="text-sm text-zinc-600 mb-4">{testimonial.name}</p>
              <h3 className="font-bold text-black mb-3 text-sm">{testimonial.title}</h3>
              <p className="text-zinc-800 text-sm leading-relaxed">
                {testimonial.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;