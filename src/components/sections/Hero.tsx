import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Cpu, Wind, Layers } from 'lucide-react';
import { ShoeCanvas3D } from '../3d/ShoeCanvas3D';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { HERO_COLORWAYS, PRODUCTS } from '../../data/products';
import type { Colorway } from '../../types';

interface HeroProps {
  onAddToCart: (colorway: Colorway) => void;
  onPlayTick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onAddToCart, onPlayTick }) => {
  const [selectedColorway, setSelectedColorway] = useState<Colorway>(HERO_COLORWAYS[0]);
  const heroShoe = PRODUCTS[0];

  const handleColorwaySelect = (cw: Colorway) => {
    setSelectedColorway(cw);
    onPlayTick?.();
  };

  const handleScrollToAnatomy = () => {
    const el = document.querySelector('#anatomy');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100svh] pt-24 pb-12 flex flex-col justify-between overflow-hidden bg-zinc-950 luxury-noise">
      {/* Subtle atmospheric ambient glow behind the shoe */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 pointer-events-none transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle, ${selectedColorway.accentColor || '#bef264'} 0%, transparent 70%)`,
        }}
      />

      {/* Hero Header Typography */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <Badge variant="accent" dot>
              FLAGSHIP SPEED PLATFORM // V.01
            </Badge>
          </motion.div>

          {/* Main Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-[0.95]"
          >
            PRECISION IN <span className="text-zinc-400 italic font-serif">MOTION.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base md:text-lg text-zinc-400 font-sans max-w-2xl leading-relaxed"
          >
            Crafted at the threshold of biological kinetic energy and quiet luxury.
            Featuring a full-chassis carbon propulsion fork and nitrogen-infused foam.
          </motion.p>
        </div>
      </div>

      {/* Main Interactive 3D Stage */}
      <div className="relative w-full h-[48vh] sm:h-[54vh] my-2 z-10 flex items-center justify-center">
        <ShoeCanvas3D colorway={selectedColorway} />

        {/* Telemetry HUD Side Spec Cards (Desktop) */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 font-mono z-10">
          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md w-44">
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase">
              <Activity className="w-3.5 h-3.5 text-lime-400" />
              <span>TOTAL MASS</span>
            </div>
            <div className="text-xl font-bold text-white mt-1">218g</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Ultra-light monocoque</div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md w-44">
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase">
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
              <span>PROPULSION</span>
            </div>
            <div className="text-xl font-bold text-white mt-1">CARBON-HEX</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Dual-axis arch shank</div>
          </div>
        </div>

        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 font-mono z-10 text-right">
          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md w-44">
            <div className="flex items-center justify-end gap-2 text-[10px] text-zinc-500 uppercase">
              <span>CUSHIONING</span>
              <Wind className="w-3.5 h-3.5 text-lime-400" />
            </div>
            <div className="text-xl font-bold text-white mt-1">280 BAR</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Supercritical Nitrogen</div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md w-44">
            <div className="flex items-center justify-end gap-2 text-[10px] text-zinc-500 uppercase">
              <span>NATURAL DROP</span>
              <Layers className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl font-bold text-white mt-1">6.0 MM</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Biomechanical baseline</div>
          </div>
        </div>
      </div>

      {/* Hero Interactive Footer Controls */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-zinc-900">
          {/* Colorway Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline">
              COLORWAY:
            </span>
            <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 p-1.5 rounded-full backdrop-blur-md">
              {HERO_COLORWAYS.map((cw) => (
                <button
                  key={cw.id}
                  type="button"
                  onClick={() => handleColorwaySelect(cw)}
                  className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                    selectedColorway.id === cw.id
                      ? 'bg-zinc-800 text-white shadow-md'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                  aria-label={`Select ${cw.name} colorway`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/20 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: cw.hex }}
                  />
                  <span className="text-xs font-mono">{cw.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            <Button
              variant="outline"
              size="md"
              onClick={handleScrollToAnatomy}
              className="flex-1 sm:flex-initial"
            >
              EXPLORE ANATOMY
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => onAddToCart(selectedColorway)}
              icon={<ArrowRight className="w-4 h-4" />}
              className="flex-1 sm:flex-initial"
            >
              ORDER AERO-01 (${heroShoe.price})
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
