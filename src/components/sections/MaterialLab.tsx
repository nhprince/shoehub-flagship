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
    <section id="material-lab" className="py-20 sm:py-28 bg-zinc-950 border-t border-zinc-900/80 relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[0.6875rem] font-sans font-medium text-zinc-400 tracking-wide block mb-1">
              Advanced Materials
            </span>
            <h2 className="font-headline text-2xl sm:text-4xl font-bold text-white tracking-tight m-0">
              Molecular Formulation
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-zinc-400 max-w-md">
            Interactive benchmark comparator. Select a material class to audit tensile rigidity, density, and kinetic elasticity.
          </p>
        </div>

        {/* Interactive Comparator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Swatch Selector Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {MATERIALS.map((mat) => {
              const isSelected = mat.id === selectedMaterial.id;
              return (
                <button
                  key={mat.id}
                  type="button"
                  onClick={() => handleSelect(mat)}
                  className={`p-4 rounded-xl text-left transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900 border-white/30 shadow-lg'
                      : 'bg-zinc-950/40 border-white/5 hover:border-white/15 hover:bg-zinc-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[0.625rem] font-mono text-zinc-500 uppercase">{mat.origin}</span>
                    <span
                      className={`w-2 h-2 rounded-full transition-transform ${
                        isSelected ? 'bg-lime-400 scale-125' : 'bg-zinc-700'
                      }`}
                    />
                  </div>
                  <h3
                    className={`font-headline text-sm font-semibold mt-1 tracking-tight ${
                      isSelected ? 'text-white' : 'text-zinc-300'
                    }`}
                  >
                    {mat.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{mat.category}</p>
                </button>
              );
            })}
          </div>

          {/* Right Detailed Telemetry Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMaterial.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="h-full rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <div className="flex items-center gap-2 text-xs font-sans text-zinc-400">
                      <Microscope className="w-3.5 h-3.5 text-lime-400" />
                      <span>Specimen Audit</span>
                    </div>
                    <span className="text-xs font-mono text-lime-400">
                      {selectedMaterial.molecularFormula}
                    </span>
                  </div>

                  <h3 className="font-headline text-xl sm:text-2xl font-bold text-white tracking-tight mt-5">
                    {selectedMaterial.name}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">
                    Origin: {selectedMaterial.origin}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-3 font-sans">
                    {selectedMaterial.description}
                  </p>

                  {/* Telemetry Progress Bars */}
                  <div className="mt-6 space-y-3.5 pt-5 border-t border-white/5">
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-zinc-400">Tensile Strength Modulus</span>
                        <span className="text-white font-semibold">{selectedMaterial.tensile}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-lime-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedMaterial.tensile}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-zinc-400">Density & Featherweight Index</span>
                        <span className="text-white font-semibold">{selectedMaterial.density}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-sky-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedMaterial.density}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-zinc-400">Hydrophobic Surface Beading</span>
                        <span className="text-white font-semibold">{selectedMaterial.hydrophobic}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-indigo-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedMaterial.hydrophobic}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-zinc-400">Kinetic Spring Resilience</span>
                        <span className="text-white font-semibold">{selectedMaterial.resilience}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-amber-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedMaterial.resilience}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Footnote */}
                <div className="pt-4 border-t border-white/5 text-[0.6875rem] font-mono text-zinc-500 flex items-center justify-between mt-5">
                  <span>Standard: DIN EN ISO 527-4</span>
                  <span>Zero toxic binders</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
