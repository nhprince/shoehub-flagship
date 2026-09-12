import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ANATOMY_PARTS } from '../../data/products';
import { Badge } from '../ui/Badge';
import { ShieldCheck, Zap } from 'lucide-react';

interface AnatomyProps {
  onPlayTick?: () => void;
}

export const Anatomy: React.FC<AnatomyProps> = ({ onPlayTick }) => {
  const [activePartId, setActivePartId] = useState<string>(ANATOMY_PARTS[1].id); // Default to Carbon Shank

  const activePart = ANATOMY_PARTS.find((p) => p.id === activePartId) || ANATOMY_PARTS[0];

  const handleSelect = (id: string) => {
    setActivePartId(id);
    onPlayTick?.();
  };

  return (
    <section id="anatomy" className="py-24 sm:py-32 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <Badge variant="accent" dot>
              INTERNAL ARCHITECTURE
            </Badge>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mt-3">
              THE ANATOMY OF VELOCITY.
            </h2>
          </div>
          <p className="text-sm font-mono text-zinc-400 max-w-md">
            EXPLODED MULTI-PLY STRATIFICATION. EACH SUB-ASSEMBLY IS ISOLATED AND TOLERANCED TO ±0.02MM.
          </p>
        </div>

        {/* Interactive Layout: Left Selector, Right Exploded Schematic Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Layer Navigation Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
            {ANATOMY_PARTS.map((part) => {
              const isSelected = part.id === activePartId;
              return (
                <button
                  key={part.id}
                  type="button"
                  onClick={() => handleSelect(part.id)}
                  className={`p-5 rounded-2xl text-left transition-all duration-300 border cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-zinc-900 border-zinc-700 shadow-xl'
                      : 'bg-zinc-950/60 border-zinc-800/60 hover:border-zinc-700/80 hover:bg-zinc-900/40'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-lime-400"
                    />
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-500">LAYER {part.number}</span>
                    <span
                      className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-lime-400/20 text-lime-400' : 'text-zinc-500'
                      }`}
                    >
                      {part.metric}
                    </span>
                  </div>
                  <h3
                    className={`font-display text-lg font-bold mt-1 tracking-tight ${
                      isSelected ? 'text-white' : 'text-zinc-300'
                    }`}
                  >
                    {part.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{part.subtitle}</p>
                </button>
              );
            })}
          </div>

          {/* Right Detailed Exploded Visual & Science Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePart.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="h-full rounded-3xl bg-zinc-900/80 border border-zinc-800 p-8 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Visual Technical Schematic Watermark */}
                <div className="absolute top-6 right-8 text-right text-zinc-800 font-mono text-6xl font-black pointer-events-none select-none">
                  {activePart.number}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded bg-zinc-800 text-[10px] font-mono text-lime-400 uppercase tracking-widest">
                      LAB TELEMETRY
                    </span>
                    <span className="text-xs font-mono text-zinc-500">ISO 9001 TESTED</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                    {activePart.title}
                  </h3>
                  <p className="text-sm font-mono text-zinc-400 mt-1">{activePart.subtitle}</p>

                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mt-6 font-sans">
                    {activePart.description}
                  </p>

                  {/* Materials Composition Grid */}
                  <div className="mt-8 pt-6 border-t border-zinc-800">
                    <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">
                      CORE MATERIAL ALLOY
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activePart.materials.map((mat) => (
                        <span
                          key={mat}
                          className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-2"
                        >
                          <ShieldCheck className="w-3 h-3 text-lime-400" />
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Technical Metric Callout */}
                <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-zinc-500 uppercase">
                      {activePart.metricLabel}
                    </div>
                    <div className="text-3xl font-display font-extrabold text-white mt-0.5">
                      {activePart.metric}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-950 px-3.5 py-2 rounded-xl border border-zinc-800">
                    <Zap className="w-4 h-4 text-lime-400" />
                    <span>CALCULATED FORCE VECTOR</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
