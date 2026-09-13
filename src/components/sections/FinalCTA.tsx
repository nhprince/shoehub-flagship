import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubmitted(true);
    }
  };

  const handleExplore = () => {
    const el = document.querySelector('#collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-28 sm:py-36 bg-[#fafafa] border-t border-zinc-200/80 relative overflow-hidden">
      {/* Subtle Atmosphere Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-4 py-1.5 rounded-full">
          Production Allocation • 2026 Cycle
        </span>

        <h2 className="font-headline text-4xl sm:text-6xl md:text-7xl font-extrabold text-zinc-950 tracking-[-0.03em] leading-[0.98] mt-6">
          Your next stride is <span className="text-zinc-400 font-light italic font-serif">engineered.</span>
        </h2>

        <p className="mt-6 text-sm sm:text-base md:text-lg text-zinc-600 font-sans max-w-xl mx-auto leading-relaxed">
          Atelier tooling is strictly capped at 2,500 pairs per silhouette per season to maintain zero defect tolerances. Join the private dispatch registry.
        </p>

        {/* Email VIP Dispatch Form */}
        <div className="mt-10 max-w-md mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-2xl glass-panel text-emerald-800 flex items-center justify-center gap-3 font-mono text-xs shadow-md border-emerald-200"
            >
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
              <span>Access key dispatched to {email.toLowerCase()}</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 p-1.5 rounded-full glass-panel shadow-md">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email for private allocation"
                  className="w-full bg-transparent border-0 pl-11 pr-4 py-3 text-xs font-mono text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 text-xs font-headline font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm cursor-pointer"
              >
                <span>Request Key</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-zinc-500 mt-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" />
              Encrypted Dispatch
            </span>
            <span>•</span>
            <span>Strictly Private Allocation</span>
          </div>
        </div>

        {/* Secondary Navigation CTA */}
        <div className="mt-12">
          <button
            type="button"
            onClick={handleExplore}
            className="text-xs font-mono text-zinc-600 hover:text-zinc-950 underline underline-offset-4 tracking-wide transition-colors cursor-pointer"
          >
            Explore the five permanent silhouettes →
          </button>
        </div>
      </div>
    </section>
  );
};
