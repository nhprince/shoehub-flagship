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

export function ScrollShoeStage({ onAddToCart }: ScrollShoeStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedColorway] = useState<Colorway>(HERO_COLORWAYS[0]);
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

  return (
    <section ref={containerRef} className="relative h-[320vh] bg-[#fafafa]">
      {/* ── STICKY 3D STAGE ── */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none z-0">
        {/* Architectural studio vignette for white luxury backdrop */}
        <div className="absolute inset-0 bg-radial from-white via-zinc-100/60 to-zinc-200/40 pointer-events-none" />

        {hasWebGL ? (
          <Canvas
            camera={{ position: [0, 0, 2.8], fov: 38 }}
            dpr={[1, 2]}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: true,
            }}
          >
            {/* High-Key Architectural Studio Lighting */}
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 8, 5]} intensity={2.4} color="#ffffff" />
            <directionalLight position={[-6, 4, -2]} intensity={1.2} color="#e0f2fe" />
            <directionalLight position={[0, -4, 2]} intensity={0.6} color="#fef3c7" />
            <pointLight position={[0, 5, 0]} intensity={0.9} color="#ffffff" />

            <Float speed={1.2} rotationIntensity={0.06} floatIntensity={0.12}>
              <ShoeModel colorway={selectedColorway} scrollProgress={scrollProgress} />
            </Float>

            <ContactShadows
              position={[0, -0.85, 0]}
              opacity={0.35}
              scale={5.2}
              blur={2.5}
              far={2}
              color="#18181b"
            />
          </Canvas>
        ) : (
          <FallbackShoe colorway={selectedColorway} className="w-full max-w-lg" />
        )}
      </div>

      {/* ── NARRATIVE SCROLL OVERLAYS ── */}

      {/* STAGE 0: HERO (0% to 28%) */}
      <div className="absolute top-0 inset-x-0 h-[100vh] flex flex-col justify-between pt-28 pb-10 z-10 pointer-events-auto">
        <div className="hero-container-wide flex flex-col items-center text-center">
          {/* Subtle Category Tag */}


          {/* Clean, Refined Headline */}
          <h1 className="font-headline text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-[-0.04em] text-zinc-950 uppercase leading-[0.92] m-0">
            Aero<span className="text-zinc-400 font-light">—01</span>
          </h1>

          {/* <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-600 font-sans max-w-md leading-relaxed">
            Where biological kinetic energy meets quiet luxury. Autoclave carbon propulsion fork and nitrogen-infused supercritical foam.
          </p> */}
        </div>

        {/* Hero Bottom Controls */}
        <div className="hero-container-wide flex items-center justify-center sm:justify-end">
          {/* Order Action Button */}
          <button
            type="button"
            onClick={() => onAddToCart(selectedColorway)}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 font-headline font-semibold text-xs sm:text-sm tracking-tight transition-all active:scale-95 shadow-lg hover:shadow-xl cursor-pointer"
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
              opacity: scrollProgress >= 0.20 && scrollProgress <= 0.54 ? 1 : 0.04,
              y: scrollProgress >= 0.20 && scrollProgress <= 0.54 ? 0 : 20,
            }}
            transition={{ duration: 0.35 }}
            className="max-w-md space-y-3.5 pointer-events-auto p-6 sm:p-8 rounded-3xl glass-panel"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full ios26-liquid-pill text-[0.6875rem] font-sans font-medium text-emerald-700 tracking-wide">
              01 • Torsional Propulsion
            </div>
            <h2 className="font-headline text-2xl sm:text-4xl font-bold text-zinc-950 tracking-tight leading-tight m-0">
              Toray T700 Carbon Matrix
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
              Autoclave-cured under 7 atmospheres. A dual-axis parabolic arch shank that captures kinetic impact compression and converts it into 94.2% forward propulsion.
            </p>
            <div className="pt-2 flex items-center gap-2.5 text-[0.6875rem] font-mono text-zinc-700">
              <span className="px-3 py-1.5 rounded-xl bg-zinc-100/90 border border-zinc-200/80">18g Mass</span>
              <span className="px-3 py-1.5 rounded-xl bg-zinc-100/90 border border-zinc-200/80">94.2% Energy Return</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* STAGE 2: OUTSOLE & TRACTION (55% to 80%) */}
      <div className="absolute top-[180vh] inset-x-0 h-[80vh] flex items-center justify-end z-10 pointer-events-none">
        <div className="section-container w-full flex justify-end">
          <motion.div
            style={{
              opacity: scrollProgress >= 0.54 && scrollProgress <= 0.80 ? 1 : 0.04,
              y: scrollProgress >= 0.54 && scrollProgress <= 0.80 ? 0 : 20,
            }}
            transition={{ duration: 0.35 }}
            className="max-w-md space-y-3.5 pointer-events-auto text-left p-6 sm:p-8 rounded-3xl glass-panel"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full ios26-liquid-pill text-[0.6875rem] font-sans font-medium text-sky-700 tracking-wide">
              02 • Ground Friction
            </div>
            <h2 className="font-headline text-2xl sm:text-4xl font-bold text-zinc-950 tracking-tight leading-tight m-0">
              Directional Micro-Siped Lugs
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
              Bio-inspired rubber geometry channels standing water away from the contact patch in under 4 milliseconds, providing unyielding bite on wet concrete and polished surfaces.
            </p>
            <div className="pt-2 flex items-center gap-2.5 text-[0.6875rem] font-mono text-zinc-700">
              <span className="px-3 py-1.5 rounded-xl bg-zinc-100/90 border border-zinc-200/80">0.86 µ Wet Friction</span>
              <span className="px-3 py-1.5 rounded-xl bg-zinc-100/90 border border-zinc-200/80">Vibram Megagrip™</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* STAGE 3: MONOFILAMENT KNIT UPPER (80% to 100%) */}
      <div className="absolute top-[260vh] inset-x-0 h-[80vh] flex items-center z-10 pointer-events-none">
        <div className="section-container w-full">
          <motion.div
            style={{
              opacity: scrollProgress >= 0.80 ? 1 : 0.04,
              y: scrollProgress >= 0.80 ? 0 : 20,
            }}
            transition={{ duration: 0.35 }}
            className="max-w-md space-y-3.5 pointer-events-auto p-6 sm:p-8 rounded-3xl glass-panel"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full ios26-liquid-pill text-[0.6875rem] font-sans font-medium text-amber-700 tracking-wide">
              03 • Seamless Upper
            </div>
            <h2 className="font-headline text-2xl sm:text-4xl font-bold text-zinc-950 tracking-tight leading-tight m-0">
              Aeroweave™ 2.0 Circular Knit
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
              Extruded Japanese monofilament knitted as a continuous single strand. Zoned ventilation grids provide 360° airflow while stabilizing the metatarsal cradle with zero blister friction.
            </p>
            <div className="pt-2 flex items-center gap-2.5 text-[0.6875rem] font-mono text-zinc-700">
              <span className="px-3 py-1.5 rounded-xl bg-zinc-100/90 border border-zinc-200/80">48g Upper Mass</span>
              <span className="px-3 py-1.5 rounded-xl bg-zinc-100/90 border border-zinc-200/80">Zero Friction Points</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
