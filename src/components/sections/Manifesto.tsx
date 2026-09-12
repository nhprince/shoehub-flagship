import React from 'react';
import { motion } from 'framer-motion';
import { BRAND_METRICS } from '../../data/products';

export const Manifesto: React.FC = () => {
  return (
    <section id="architecture" className="py-20 sm:py-28 bg-zinc-950 border-t border-zinc-900/80 relative">
      <div className="section-container">
        {/* Editorial Brand Statement */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full ios26-liquid-pill text-[0.6875rem] font-sans font-medium text-zinc-400 tracking-wide mb-4">
            <span>The Philosophy</span>
          </div>

          <h2 className="font-headline text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.15]">
            We reject the compromise between raw velocity and quiet luxury.
          </h2>

          <p className="mt-6 text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            For decades, footwear has forced an artificial choice: loud athletic gear saturated with synthetic plastics, or rigid luxury dress shoes with zero biomechanical propulsion.
          </p>

          <p className="mt-3 text-xs sm:text-sm text-zinc-500 font-sans leading-relaxed">
            ShoeHub bridges that chasm. We fuse aerospace carbon composites, supercritical nitrogen foam chemistry, and seamless circular knit with architectural restraint. No gaudy branding. Just pure kinetic momentum.
          </p>
        </div>

        {/* 4 Compact Telemetry Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {BRAND_METRICS.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-5 rounded-2xl glass-panel flex flex-col justify-between hover:border-white/15 transition-all"
            >
              <div>
                <span className="text-[0.625rem] font-mono text-zinc-500 uppercase tracking-wider">
                  {metric.label}
                </span>
                <div className="font-headline text-2xl sm:text-3xl font-bold text-white mt-1.5 tracking-tight">
                  {metric.value}
                </div>
              </div>
              <p className="text-[0.6875rem] text-zinc-400 mt-3 leading-normal">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
