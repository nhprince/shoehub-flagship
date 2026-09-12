import { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import { motion, useScroll } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { ShoeModel } from './ShoeModel';
import { FallbackShoe } from './FallbackShoe';
import { HERO_COLORWAYS } from '../../data/products';
import type { Colorway } from '../../types';

interface ScrollShoeStageProps {
  onAddToCart: (colorway: Colorway) => void;
  onPlayTick?: () => void;
}

export function ScrollShoeStage({ onAddToCart, onPlayTick }: ScrollShoeStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedColorway, setSelectedColorway] = useState<Colorway>(HERO_COLORWAYS[0]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasWebGL, setHasWebGL] = useState(true);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // Track scroll through the scrollytelling container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setScrollProgress(v);
    });
  }, [scrollYProgress]);

  const handleColorwaySelect = (cw: Colorway) => {
    setSelectedColorway(cw);
    onPlayTick?.();
  };

  return (
    <section ref={containerRef} className="relative h-[320vh] bg-zinc-950">
      {/* ── STICKY 3D STAGE ── */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none z-0">
        {/* Architectural studio vignette (clean, no generic AI blur blobs) */}
        <div className="absolute inset-0 bg-radial from-zinc-900/30 via-zinc-950 to-zinc-950 pointer-events-none" />

        {hasWebGL ? (
          <Canvas
            camera={{ position: [0, 0, 2.7], fov: 38 }}
            dpr={[1, 2]}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: true,
            }}
          >
            {/* Studio Rim Lighting */}
            <ambientLight intensity={0.9} />
            <directionalLight position={[4, 6, 4]} intensity={2.2} color="#ffffff" />
            <directionalLight position={[-5, 3, -3]} intensity={1.6} color="#a5f3fc" />
            <directionalLight position={[0, -3, 2]} intensity={0.8} color="#c9b07a" />
            <pointLight position={[0, 4, 0]} intensity={1.0} color="#ffffff" />

            <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.15}>
              <ShoeModel colorway={selectedColorway} scrollProgress={scrollProgress} />
            </Float>

            <ContactShadows
              position={[0, -0.85, 0]}
              opacity={0.65}
              scale={4.5}
              blur={2.2}
              far={2}
              color="#000000"
            />
          </Canvas>
        ) : (
          <FallbackShoe colorway={selectedColorway} className="w-full max-w-lg" />
        )}
      </div>

      {/* ── NARRATIVE SCROLL OVERLAYS ── */}

      {/* STAGE 0: HERO (0% to 28%) */}
      <div className="absolute top-0 inset-x-0 h-[100vh] flex flex-col justify-between pt-24 pb-8 z-10 pointer-events-auto">
        <div className="hero-container-wide flex flex-col items-center text-center">
          {/* Refined Badge */}
          {/* <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full ios26-liquid-pill text-[0.6875rem] font-sans font-medium text-zinc-300 tracking-wide mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
            <span>Propulsion Platform V.01</span>
          </div> */}

          {/* Clean, Refined Headline */}
          <h1 className="font-headline text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] text-white uppercase leading-[0.95] m-0">
            Aero<span className="text-zinc-500 font-light">—01</span>
          </h1>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-400 font-sans max-w-lg leading-relaxed">
            Where biological kinetic energy meets quiet luxury. Autoclave carbon propulsion fork and nitrogen-infused supercritical foam.
          </p>
        </div>

        {/* Hero Bottom Controls */}
        <div className="hero-container-wide flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Colorway Pills with Animated Feedback */}
          <div className="flex items-center gap-1.5 p-1 rounded-full ios26-liquid-pill">
            {HERO_COLORWAYS.map((cw) => (
              <button
                key={cw.id}
                type="button"
                onClick={() => handleColorwaySelect(cw)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all cursor-pointer ${selectedColorway.id === cw.id
                    ? 'bg-zinc-800 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                  }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-white/20 transition-transform active:scale-125"
                  style={{ backgroundColor: cw.hex }}
                />
                <span className="text-[0.6875rem] font-sans font-medium">{cw.name}</span>
              </button>
            ))}
          </div>

          {/* Order Action Button */}
          <button
            type="button"
            onClick={() => onAddToCart(selectedColorway)}
            className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 font-headline font-semibold text-xs sm:text-sm tracking-tight transition-all active:scale-95 shadow-xl cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Aero—01 ($285)</span>
          </button>
        </div>
      </div>

      {/* STAGE 1: CARBON MATRIX (28% to 55%) */}
      <div className="absolute top-[100vh] inset-x-0 h-[80vh] flex items-center z-10 pointer-events-none">
        <div className="section-container w-full">
          <motion.div
            style={{
              opacity: scrollProgress >= 0.22 && scrollProgress <= 0.52 ? 1 : 0.04,
              y: scrollProgress >= 0.22 && scrollProgress <= 0.52 ? 0 : 20,
            }}
            transition={{ duration: 0.35 }}
            className="max-w-md space-y-3 pointer-events-auto"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full ios26-liquid-pill text-[0.6875rem] font-sans font-medium text-lime-400 tracking-wide">
              01 • Torsional Propulsion
            </div>
            <h2 className="font-headline text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Toray T700 Carbon Matrix
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
              Autoclave-cured under 7 atmospheres. A dual-axis parabolic arch shank that captures kinetic impact compression and converts it into 94.2% forward propulsion.
            </p>
            <div className="pt-2 flex items-center gap-3 text-[0.6875rem] font-mono text-zinc-400">
              <span className="px-3 py-1 rounded-lg glass-panel">18g Mass</span>
              <span className="px-3 py-1 rounded-lg glass-panel">94.2% Energy Return</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* STAGE 2: OUTSOLE & TRACTION (55% to 80%) */}
      <div className="absolute top-[180vh] inset-x-0 h-[80vh] flex items-center justify-end z-10 pointer-events-none">
        <div className="section-container w-full flex justify-end">
          <motion.div
            style={{
              opacity: scrollProgress >= 0.52 && scrollProgress <= 0.78 ? 1 : 0.04,
              y: scrollProgress >= 0.52 && scrollProgress <= 0.78 ? 0 : 20,
            }}
            transition={{ duration: 0.35 }}
            className="max-w-md space-y-3 pointer-events-auto text-left"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full ios26-liquid-pill text-[0.6875rem] font-sans font-medium text-sky-400 tracking-wide">
              02 • Ground Friction
            </div>
            <h2 className="font-headline text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Directional Micro-Siped Lugs
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
              Bio-inspired rubber geometry channels standing water away from the contact patch in under 4 milliseconds, providing unyielding bite on wet concrete and polished marble.
            </p>
            <div className="pt-2 flex items-center gap-3 text-[0.6875rem] font-mono text-zinc-400">
              <span className="px-3 py-1 rounded-lg glass-panel">0.86 µ Wet Friction</span>
              <span className="px-3 py-1 rounded-lg glass-panel">Vibram Megagrip™</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* STAGE 3: MONOFILAMENT KNIT UPPER (80% to 100%) */}
      <div className="absolute top-[260vh] inset-x-0 h-[80vh] flex items-center z-10 pointer-events-none">
        <div className="section-container w-full">
          <motion.div
            style={{
              opacity: scrollProgress >= 0.78 ? 1 : 0.04,
              y: scrollProgress >= 0.78 ? 0 : 20,
            }}
            transition={{ duration: 0.35 }}
            className="max-w-md space-y-3 pointer-events-auto"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full ios26-liquid-pill text-[0.6875rem] font-sans font-medium text-amber-400 tracking-wide">
              03 • Seamless Upper
            </div>
            <h2 className="font-headline text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Aeroweave™ 2.0 Circular Knit
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
              Extruded Japanese monofilament knitted as a continuous single strand. Zoned ventilation grids provide 360° airflow while stabilizing the metatarsal cradle with zero blister friction.
            </p>
            <div className="pt-2 flex items-center gap-3 text-[0.6875rem] font-mono text-zinc-400">
              <span className="px-3 py-1 rounded-lg glass-panel">48g Upper Mass</span>
              <span className="px-3 py-1 rounded-lg glass-panel">Zero Blister Points</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
