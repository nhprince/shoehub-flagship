import React from 'react';
import { ArrowUp, Volume2, VolumeX, Globe } from 'lucide-react';

interface FooterProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  currency: string;
  onChangeCurrency: (c: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  soundEnabled,
  onToggleSound,
  currency,
  onChangeCurrency,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navGroups = [
    {
      title: 'SILHOUETTES',
      links: [
        { label: 'ShoeHub AERO-01', href: '#collection' },
        { label: 'ShoeHub FORM-X', href: '#collection' },
        { label: 'ShoeHub FLOW', href: '#collection' },
        { label: 'ShoeHub CORE', href: '#collection' },
        { label: 'ShoeHub STUDIO', href: '#collection' },
      ],
    },
    {
      title: 'ENGINEERING',
      links: [
        { label: 'Carbon-Hex Shank', href: '#anatomy' },
        { label: 'HyperBounce Nitro', href: '#anatomy' },
        { label: 'Aeroweave 2.0 Knit', href: '#anatomy' },
        { label: 'Material Science Lab', href: '#material-lab' },
      ],
    },
    {
      title: 'ATELIER',
      links: [
        { label: 'Brand Manifesto', href: '#manifesto' },
        { label: 'Field Lookbook', href: '#lookbook' },
        { label: 'Press & Critique', href: '#reviews' },
        { label: 'Sustainability Audit', href: '#material-lab' },
      ],
    },
    {
      title: 'INSTITUTIONAL',
      links: [
        { label: 'Privacy Protocol', href: '#' },
        { label: 'Terms of Allocation', href: '#' },
        { label: 'Global Compliance', href: '#' },
        { label: 'Atelier Enquiries', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 py-16 sm:py-24 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Tier: Brand & Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-zinc-900">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2 font-display text-2xl font-black tracking-tight text-white">
              <span>SHOEHUB</span>
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
            </div>
            <p className="text-zinc-500 max-w-sm leading-relaxed text-xs">
              Autonomous digital experience. Crafted at the intersection of biological kinetic propulsion, autoclave composites, and quiet luxury.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-zinc-500">
              <Globe className="w-3.5 h-3.5 text-zinc-400" />
              <span>DISPATCHING WORLDWIDE VIA DHL CO₂-NEUTRAL</span>
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {navGroups.map((grp) => (
              <div key={grp.title} className="space-y-3">
                <h4 className="text-zinc-200 font-bold uppercase tracking-wider text-[11px]">
                  {grp.title}
                </h4>
                <ul className="space-y-2">
                  {grp.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-zinc-500 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} SHOEHUB INC. ATHLETICS DIVISION. ALL RIGHTS RESERVED.
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Currency selector */}
            <div className="flex items-center gap-1.5">
              <span>CURRENCY:</span>
              {['USD', 'EUR', 'GBP'].map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => onChangeCurrency(curr)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${
                    currency === curr ? 'bg-zinc-800 text-white' : 'hover:text-zinc-300'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            <span>•</span>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={onToggleSound}
              className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-lime-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>SOUND {soundEnabled ? 'ON' : 'OFF'}</span>
            </button>

            <span>•</span>

            {/* Scroll to top */}
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>TOP</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
