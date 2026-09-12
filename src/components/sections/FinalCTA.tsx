import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
import { Button } from '../ui/Button';

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
    <section className="py-24 sm:py-36 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      {/* Radial Atmospheric Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-lime-400/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10">
        <span className="text-xs font-mono tracking-widest text-lime-400 uppercase bg-lime-950/40 border border-lime-500/30 px-3.5 py-1.5 rounded-full">
          PRODUCTION ALLOCATION // 2026 CYCLE
        </span>

        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight leading-[0.95] mt-6">
          YOUR NEXT STRIDE IS <span className="text-zinc-500 font-serif italic">CALCULATED.</span>
        </h2>

        <p className="mt-6 text-sm sm:text-base md:text-lg text-zinc-400 font-sans max-w-xl mx-auto leading-relaxed">
          Atelier tooling is strictly capped at 2,500 pairs per silhouette per season to maintain zero defect tolerances. Join the private dispatch registry.
        </p>

        {/* Email VIP Dispatch Form */}
        <div className="mt-10 max-w-md mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-2xl bg-zinc-900/90 border border-lime-500/40 text-lime-400 flex items-center justify-center gap-3 font-mono text-xs"
            >
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>ACCESS KEY DISPATCHED TO {email.toUpperCase()}</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter institutional or personal email"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-11 pr-4 py-3.5 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                />
              </div>
              <Button
                variant="primary"
                size="md"
                type="submit"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                SECURE KEY
              </Button>
            </form>
          )}

          <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-zinc-500 mt-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-zinc-400" />
              ENCRYPTED DISPATCH
            </span>
            <span>•</span>
            <span>NO MARKETING JUNK</span>
          </div>
        </div>

        {/* Secondary Navigation CTA */}
        <div className="mt-12">
          <button
            type="button"
            onClick={handleExplore}
            className="text-xs font-mono text-zinc-400 hover:text-white underline underline-offset-4 tracking-wider transition-colors cursor-pointer"
          >
            OR EXPLORE THE FIVE PERMANENT SILHOUETTES →
          </button>
        </div>
      </div>
    </section>
  );
};
