import React from 'react';
import { motion } from 'framer-motion';
import { LOOKBOOK } from '../../data/products';
import { MapPin } from 'lucide-react';

export const Lookbook: React.FC = () => {
  return (
    <section id="lookbook" className="py-24 sm:py-32 bg-[#fafafa] border-t border-zinc-200/80 relative">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-5">
          <div>
            <span className="text-[0.6875rem] font-sans font-medium text-zinc-500 tracking-wide block mb-1.5">
              Field Dispatch
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl font-extrabold text-zinc-950 tracking-tight m-0">
              Movement in Situ
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-zinc-600 max-w-sm leading-relaxed">
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
            className="md:col-span-8 group relative rounded-3xl overflow-hidden bg-zinc-100 min-h-[440px] flex flex-col justify-end p-7 sm:p-10 border border-black/5 shadow-md"
          >
            <img
              src={LOOKBOOK[0].image}
              alt={LOOKBOOK[0].title}
              className="absolute inset-0 w-full h-full object-cover filter contrast-105 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            <div className="relative z-10 space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-sans text-emerald-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>{LOOKBOOK[0].location}</span>
                <span>•</span>
                <span>{LOOKBOOK[0].season}</span>
              </div>
              <h3 className="font-headline text-xl sm:text-2xl font-bold text-white tracking-tight">
                {LOOKBOOK[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-200 font-sans italic leading-relaxed">
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
            className="md:col-span-4 group relative rounded-3xl overflow-hidden bg-zinc-100 min-h-[440px] flex flex-col justify-end p-7 sm:p-10 border border-black/5 shadow-md"
          >
            <img
              src={LOOKBOOK[1].image}
              alt={LOOKBOOK[1].title}
              className="absolute inset-0 w-full h-full object-cover filter contrast-105 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-sans text-emerald-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>{LOOKBOOK[1].location}</span>
              </div>
              <h3 className="font-headline text-lg sm:text-xl font-bold text-white tracking-tight">
                {LOOKBOOK[1].title}
              </h3>
              <p className="text-xs text-zinc-200 font-sans italic leading-relaxed">
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
            className="md:col-span-12 group relative rounded-3xl overflow-hidden bg-zinc-100 min-h-[360px] flex flex-col justify-end p-7 sm:p-12 border border-black/5 shadow-md"
          >
            <img
              src={LOOKBOOK[2].image}
              alt={LOOKBOOK[2].title}
              className="absolute inset-0 w-full h-full object-cover filter contrast-105 brightness-80 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="relative z-10 space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-sans text-emerald-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>{LOOKBOOK[2].location}</span>
              </div>
              <h3 className="font-headline text-xl sm:text-2xl font-bold text-white tracking-tight">
                {LOOKBOOK[2].title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-200 font-sans italic leading-relaxed">
                "{LOOKBOOK[2].quote}"
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
