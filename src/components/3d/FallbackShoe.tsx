import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Colorway } from '../../types';

interface FallbackShoeProps {
  colorway: Colorway;
  image?: string;
  className?: string;
}

export const FallbackShoe: React.FC<FallbackShoeProps> = ({
  colorway,
  image = '/images/shoes/aero-01.jpg',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setRotateX(-y * 18);
    setRotateY(x * 24);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center perspective-[1000px] select-none ${className}`}
    >
      {/* Studio radial pedestal glow */}
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-35 pointer-events-none transition-colors duration-700"
        style={{
          background: `radial-gradient(circle, ${colorway.accentColor || '#bef264'} 0%, transparent 70%)`,
        }}
      />

      {/* Floating 2.5D interactive card */}
      <motion.div
        animate={{
          rotateX,
          rotateY,
          y: [0, -8, 0],
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          rotateX: { type: 'spring', stiffness: 200, damping: 25 },
          rotateY: { type: 'spring', stiffness: 200, damping: 25 },
        }}
        className="relative z-10 w-full max-w-lg aspect-4/3 flex items-center justify-center p-4"
      >
        <img
          src={image}
          alt={`ShoeHub silhouette in ${colorway.name}`}
          className="w-full h-full object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.85)] filter contrast-105"
        />

        {/* Dynamic color tint overlay */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-color opacity-25 rounded-2xl transition-colors duration-500"
          style={{ backgroundColor: colorway.hex }}
        />
      </motion.div>

      {/* Ground ambient shadow */}
      <div className="absolute -bottom-6 w-3/4 h-8 bg-black/60 blur-xl rounded-full" />
    </div>
  );
};
