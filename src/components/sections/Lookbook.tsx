import React from 'react';
import { motion } from 'framer-motion';
import { LOOKBOOK } from '../../data/products';
import { MapPin } from 'lucide-react';

export const Lookbook: React.FC = () => {
  return (
    <section id="lookbook" className="py-20 sm:py-28 bg-zinc-950 border-t border-zinc-900/80 relative">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[0.6875rem] font-sans font-medium text-zinc-400 tracking-wide block mb-1">
              Field Dispatch
            </span>
            <h2 className="font-headline text-2xl sm:text-4xl font-bold text-white tracking-tight m-0">
              Movement in Situ
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-zinc-400 max-w-sm">
            Documented across athletes, architects, and alpinists moving from rain-slicked asphalt to mountain ridge terrain.
          </p>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Item 1: Large Featured Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-8 group relative rounded-2xl overflow-hidden bg-zinc-900 min-h-[420px] flex flex-col justify-end p-6 sm:p-8 border border-white/5"
          >
            <img
              src={LOOKBOOK[0].image}
              alt={LOOKBOOK[0].title}
              className="absolute inset-0 w-full h-full object-cover filter contrast-105 brightness-75 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="relative z-10 space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-sans text-lime-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>{LOOKBOOK[0].location}</span>
                <span>•</span>
                <span>{LOOKBOOK[0].season}</span>
              </div>
              <h3 className="font-headline text-xl sm:text-2xl font-bold text-white tracking-tight">
                {LOOKBOOK[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans italic leading-relaxed">
                "{LOOKBOOK[0].quote}"
              </p>
            </div>
          </motion.div>

          {/* Item 2: Vertical Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-4 group relative rounded-2xl overflow-hidden bg-zinc-900 min-h-[420px] flex flex-col justify-end p-6 sm:p-8 border border-white/5"
          >
            <img
              src={LOOKBOOK[1].image}
              alt={LOOKBOOK[1].title}
              className="absolute inset-0 w-full h-full object-cover filter contrast-105 brightness-75 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-sans text-lime-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>{LOOKBOOK[1].location}</span>
              </div>
              <h3 className="font-headline text-lg sm:text-xl font-bold text-white tracking-tight">
                {LOOKBOOK[1].title}
              </h3>
              <p className="text-xs text-zinc-300 font-sans italic leading-relaxed">
                "{LOOKBOOK[1].quote}"
              </p>
            </div>
          </motion.div>

          {/* Item 3: Full Width Atelier Craft Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-12 group relative rounded-2xl overflow-hidden bg-zinc-900 min-h-[340px] flex flex-col justify-end p-6 sm:p-10 border border-white/5"
          >
            <img
              src={LOOKBOOK[2].image}
              alt={LOOKBOOK[2].title}
              className="absolute inset-0 w-full h-full object-cover filter contrast-105 brightness-60 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

            <div className="relative z-10 space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-sans text-lime-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>{LOOKBOOK[2].location}</span>
                <span>•</span>
                <span>{LOOKBOOK[2].season}</span>
              </div>
              <h3 className="font-headline text-xl sm:text-3xl font-bold text-white tracking-tight">
                {LOOKBOOK[2].title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans italic leading-relaxed">
                "{LOOKBOOK[2].quote}"
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
