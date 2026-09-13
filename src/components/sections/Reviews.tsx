import React from 'react';
import { motion } from 'framer-motion';
import { REVIEWS } from '../../data/products';
import { Badge } from '../ui/Badge';
import { Star, Quote } from 'lucide-react';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-24 sm:py-32 bg-[#fafafa] border-t border-zinc-200/80 relative overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full ios26-liquid-pill text-[0.6875rem] font-sans font-medium text-zinc-700 tracking-wide mb-4">
              <span>Editorial & Critique</span>
            </div>
            <h2 className="font-headline text-3xl sm:text-5xl font-extrabold text-zinc-950 tracking-tight m-0">
              Recognition in Print
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-zinc-600 max-w-sm leading-relaxed">
            Tested across runway presentations, marathon finish lines, and international industrial design juries.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {REVIEWS.map((rev, idx) => (
            <motion.div
              key={rev.source}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl glass-panel p-8 sm:p-10 flex flex-col justify-between hover:shadow-xl transition-all relative group"
            >
              <Quote className="w-8 h-8 text-zinc-300 absolute top-8 right-8 pointer-events-none group-hover:text-zinc-400 transition-colors" />

              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-amber-500 mb-6">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="font-serif italic text-base sm:text-lg text-zinc-800 leading-relaxed mb-8">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-black/5 flex items-center justify-between">
                <div>
                  <h4 className="font-headline font-bold text-sm tracking-tight text-zinc-950">
                    {rev.source}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-0.5 font-sans">{rev.role}</p>
                </div>
                <span className="text-[11px] font-mono text-zinc-600 bg-zinc-100/90 px-3 py-1 rounded-full border border-black/5">
                  {rev.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
