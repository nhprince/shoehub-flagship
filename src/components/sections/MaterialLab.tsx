import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Microscope } from 'lucide-react';

interface Material {
  id: string;
  name: string;
  category: string;
  origin: string;
  description: string;
  tensile: number; // 0-100
  density: number; // 0-100
  hydrophobic: number; // 0-100
  resilience: number; // 0-100
  molecularFormula: string;
}

const MATERIALS: Material[] = [
  {
    id: 'aeroweave',
    name: 'Aeroweave™ 2.0',
    category: 'Circular Bio-Monofilament',
    origin: 'Osaka, Japan',
    description: 'Extruded from post-consumer ocean polymers and intertwined with liquid-crystal polymers. Zero micro-plastics shedding with 4x the tensile strength of standard athletic knit.',
    tensile: 88,
    density: 95,
    hydrophobic: 82,
    resilience: 91,
    molecularFormula: '[C10H8O4]n + LCP Matrix',
  },
  {
    id: 'carbon-t700',
    name: 'Toray T700 Carbon Matrix',
    category: 'Autoclave Prepreg Composite',
    origin: 'Nagoya, Japan',
    description: 'High-modulus continuous carbon filaments oriented in a 0°/45°/90° quasi-isotropic weave. Cured at 180°C under 7 atmospheres of autoclave pressure for maximum spring snap.',
    tensile: 99,
    density: 90,
    hydrophobic: 100,
    resilience: 98,
    molecularFormula: '99.8% Pure Crystalline Carbon',
  },
  {
    id: 'nitro-foam',
    name: 'Supercritical Nitro-Foam',
    category: 'Gas-Infused Block Copolymer',
    origin: 'Basel, Switzerland',
    description: 'Expanded via supercritical nitrogen fluid at 280 bar pressure. Creates millions of micro-cellular chambers that bounce back instantaneously without compression breakdown.',
    tensile: 72,
    density: 98,
    hydrophobic: 90,
    resilience: 96,
    molecularFormula: 'PEBAX + N2 Infusion',
  },
  {
    id: 'tumbled-leather',
    name: 'Tumbled Italian Calfskin',
    category: 'Vegetable Aniline Leather',
    origin: 'Tuscany, Italy',
    description: 'Tumbled for 48 hours in oak vats using natural mimosa and chestnut extracts. Naturally breathable, supple to the foot, and gains a dark patina over decades of urban wear.',
    tensile: 84,
    density: 65,
    hydrophobic: 70,
    resilience: 80,
    molecularFormula: 'Natural Collagen Fibers',
  },
];

interface MaterialLabProps {
  onPlayTick?: () => void;
}

export const MaterialLab: React.FC<MaterialLabProps> = ({ onPlayTick }) => {
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(MATERIALS[0]);

  const handleSelect = (mat: Material) => {
    setSelectedMaterial(mat);
    onPlayTick?.();
  };

  return (
    <section id="material-lab" className="py-24 sm:py-32 bg-[#fafafa] border-t border-zinc-200/80 relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-5">
          <div>
            <span className="text-[0.6875rem] font-sans font-medium text-zinc-500 tracking-wide block mb-1.5">
              Advanced Materials
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl font-extrabold text-zinc-950 tracking-tight m-0">
              Molecular Formulation
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-zinc-600 max-w-md leading-relaxed">
            Interactive benchmark comparator. Select a material class to audit tensile rigidity, density, and kinetic elasticity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Material Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {MATERIALS.map((mat) => {
              const isSelected = selectedMaterial.id === mat.id;
              return (
                <button
                  key={mat.id}
                  type="button"
                  onClick={() => handleSelect(mat)}
                  className={`w-full text-left p-5 rounded-3xl transition-all cursor-pointer border ${isSelected
                      ? 'glass-panel shadow-md border-zinc-300'
                      : 'bg-white/50 border-black/5 hover:bg-white/80 hover:border-black/10'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[0.625rem] font-mono text-zinc-500 uppercase tracking-wider">
                      {mat.category}
                    </span>
                    <span className="text-[0.625rem] font-mono text-zinc-400">
                      {mat.origin}
                    </span>
                  </div>
                  <h3 className="font-headline font-bold text-base text-zinc-950 mt-1.5 tracking-tight">
                    {mat.name}
                  </h3>
                  <p className="text-xs text-zinc-600 mt-1.5 line-clamp-2 font-sans leading-relaxed">
                    {mat.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Material Deep Dive Inspector */}
          <div className="lg:col-span-7">
            <motion.div
              key={selectedMaterial.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl glass-panel p-6 sm:p-10 shadow-lg"
            >
              <div className="flex items-start justify-between border-b border-black/5 pb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full ios26-liquid-pill text-[0.6875rem] font-sans font-medium text-emerald-800 tracking-wide mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{selectedMaterial.category}</span>
                  </div>
                  <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
                    {selectedMaterial.name}
                  </h3>
                  <p className="text-xs font-mono text-zinc-500 mt-1">
                    Formula: {selectedMaterial.molecularFormula}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[0.625rem] font-mono text-zinc-400 uppercase block">Origin</span>
                  <span className="text-xs font-mono text-zinc-900 font-semibold">{selectedMaterial.origin}</span>
                </div>
              </div>

              <p className="mt-6 text-xs sm:text-sm text-zinc-700 font-sans leading-relaxed">
                {selectedMaterial.description}
              </p>

              {/* Live Metric Bars */}
              <div className="mt-8 space-y-4">
                {[
                  { label: 'Tensile Rigidity', value: selectedMaterial.tensile, color: 'bg-zinc-950' },
                  { label: 'Cellular Density', value: selectedMaterial.density, color: 'bg-emerald-600' },
                  { label: 'Hydrophobic Index', value: selectedMaterial.hydrophobic, color: 'bg-sky-600' },
                  { label: 'Kinetic Resilience', value: selectedMaterial.resilience, color: 'bg-amber-600' },
                ].map((spec) => (
                  <div key={spec.label} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-zinc-600">{spec.label}</span>
                      <span className="text-zinc-950 font-semibold">{spec.value}/100</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden p-0.5 border border-black/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${spec.value}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className={`h-full rounded-full ${spec.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Footnote */}
              <div className="pt-6 border-t border-black/5 text-[0.6875rem] font-mono text-zinc-500 flex items-center justify-between mt-8">
                <span>Standard: DIN EN ISO 527-4</span>
                <span>Zero toxic binders</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
