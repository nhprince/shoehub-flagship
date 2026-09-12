import { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { ShoeModel } from './ShoeModel';
import { FallbackShoe } from './FallbackShoe';
import type { Colorway } from '../../types';
import { Rotate3d, Compass } from 'lucide-react';

interface ShoeCanvas3DProps {
  colorway: Colorway;
  className?: string;
  autoRotate?: boolean;
}

function LoaderMesh() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 0.4, 0.5]} />
      <meshStandardMaterial color="#27272a" wireframe opacity={0.3} transparent />
    </mesh>
  );
}

export function ShoeCanvas3D({ colorway, className = '', autoRotate = true }: ShoeCanvas3DProps) {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const [canvasError, setCanvasError] = useState(false);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // Camera presets
  const resetCamera = (preset: 'lateral' | 'top' | 'heel') => {
    if (!controlsRef.current) return;
    if (preset === 'lateral') {
      controlsRef.current.setPolarAngle(Math.PI / 2.3);
      controlsRef.current.setAzimuthalAngle(0.5);
    } else if (preset === 'top') {
      controlsRef.current.setPolarAngle(Math.PI / 5);
      controlsRef.current.setAzimuthalAngle(0);
    } else if (preset === 'heel') {
      controlsRef.current.setPolarAngle(Math.PI / 2.2);
      controlsRef.current.setAzimuthalAngle(Math.PI);
    }
  };

  if (!hasWebGL || canvasError) {
    return <FallbackShoe colorway={colorway} className={className} />;
  }

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0.4, 3.2], fov: 42 }}
        shadows="basic"
        dpr={[1, 2]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 1.1;
        }}
        onError={() => setCanvasError(true)}
      >
        {/* Studio Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.8}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
          color="#ffffff"
        />
        {/* Soft cool rim light */}
        <directionalLight position={[-6, 4, -4]} intensity={1.2} color="#a5f3fc" />
        {/* Warm bottom fill light */}
        <pointLight position={[0, -2, 2]} intensity={0.5} color="#c9b07a" />

        <Suspense fallback={<LoaderMesh />}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <ShoeModel colorway={colorway} autoRotate={autoRotate && !isInteracting} />
          </Float>

          {/* Contact Shadows on Studio Floor */}
          <ContactShadows
            position={[0, -0.65, 0]}
            opacity={0.75}
            scale={4}
            blur={1.8}
            far={1.8}
            resolution={512}
            color="#000000"
          />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3.8}
          maxPolarAngle={Math.PI / 1.9}
          dampingFactor={0.05}
          onStart={() => setIsInteracting(true)}
          onEnd={() => setIsInteracting(false)}
        />
      </Canvas>

      {/* Floating 360 Studio HUD Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-md text-[11px] font-mono text-zinc-400 z-10">
        <Rotate3d className="w-3.5 h-3.5 text-lime-400 animate-spin" style={{ animationDuration: '8s' }} />
        <span>360° DRAG TO ROTATE</span>
        <span className="w-1 h-1 rounded-full bg-zinc-700 mx-1" />
        <button
          type="button"
          onClick={() => resetCamera('lateral')}
          className="hover:text-zinc-100 transition-colors px-1 cursor-pointer"
        >
          PROFILE
        </button>
        <button
          type="button"
          onClick={() => resetCamera('top')}
          className="hover:text-zinc-100 transition-colors px-1 cursor-pointer"
        >
          TOP
        </button>
        <button
          type="button"
          onClick={() => resetCamera('heel')}
          className="hover:text-zinc-100 transition-colors px-1 cursor-pointer"
        >
          HEEL
        </button>
      </div>

      {/* Subtle Studio Axis Indicator */}
      <div className="absolute top-4 right-4 hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-zinc-950/60 px-2.5 py-1 rounded-md border border-zinc-900 backdrop-blur-sm">
        <Compass className="w-3 h-3 text-zinc-400" />
        <span>STUDIO CAM // R3F GLTF 2.0</span>
      </div>
    </div>
  );
}
