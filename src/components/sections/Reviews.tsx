import React from 'react';
import { motion } from 'framer-motion';
import { REVIEWS } from '../../data/products';
import { Badge } from '../ui/Badge';
import { Star, Quote } from 'lucide-react';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-24 sm:py-32 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <Badge variant="accent" dot>
              EDITORIAL & CRITIQUE
            </Badge>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mt-3">
              RECOGNITION IN PRINT.
            </h2>
          </div>
          <p className="text-sm font-mono text-zinc-400 max-w-sm">
            TESTED ACROSS RUNWAY PRESENTATIONS, MARATHON FINISH LINES, AND INDUSTRIAL DESIGN JURIES.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REVIEWS.map((rev, idx) => (
            <motion.div
              key={rev.source}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl bg-zinc-900/60 border border-zinc-800/80 p-8 flex flex-col justify-between hover:border-zinc-700 transition-colors relative group"
            >
              <Quote className="w-8 h-8 text-zinc-800 absolute top-6 right-6 pointer-events-none group-hover:text-zinc-700 transition-colors" />

              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-lime-400 mb-6">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="font-serif italic text-base sm:text-lg text-zinc-200 leading-relaxed mb-8">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm tracking-wider text-white uppercase">
                    {rev.source}
                  </h4>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">{rev.role}</p>
                </div>
                <span className="text-[11px] font-mono text-zinc-500 bg-zinc-950 px-2.5 py-1 rounded-full border border-zinc-800">
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
