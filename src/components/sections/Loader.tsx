import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 600);
          }, 200);
          return 100;
        }
        const increment = Math.floor(Math.random() * 15) + 8;
        return Math.min(100, prev + increment);
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-zinc-950 flex flex-col items-center justify-center select-none"
        >
          {/* Animated Shoe Contour Wireframe */}
          <div className="relative w-48 h-28 mb-8 flex items-center justify-center">
            <svg
              viewBox="0 0 200 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-zinc-100"
            >
              {/* Sole Curve */}
              <motion.path
                d="M15 75 C45 75 60 70 95 62 C130 54 155 58 185 75"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
              {/* Upper Profile */}
              <motion.path
                d="M15 75 C20 50 45 42 70 38 C90 35 110 22 135 22 C155 22 175 48 185 75"
                stroke="#bef264"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.1 }}
              />
              {/* Internal Carbon Arch */}
              <motion.path
                d="M65 65 C85 62 105 58 125 60"
                stroke="#71717a"
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 bg-radial from-lime-400/10 to-transparent blur-xl pointer-events-none" />
          </div>

          {/* Kinetic Brand Wordmark */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 font-display font-bold text-lg tracking-[0.25em] text-white">
              <span>SHOEHUB</span>
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-ping" />
            </div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              INITIALIZING BIOMECHANICAL ENGINE
            </span>
          </div>

          {/* Minimalist Progress Line */}
          <div className="w-44 h-[2px] bg-zinc-900 rounded-full mt-8 overflow-hidden">
            <motion.div
              className="h-full bg-lime-400"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
          <span className="font-mono text-[11px] text-zinc-500 mt-2">{progress}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
