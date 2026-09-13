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
    <footer className="bg-[#fafafa] border-t border-zinc-200/80 text-zinc-600 py-16 sm:py-24 text-xs font-mono">
      <div className="section-container">
        {/* Top Tier: Brand & Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-zinc-200/80">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2 font-headline text-2xl font-bold tracking-tight text-zinc-950">
              <span>SHOEHUB</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <p className="text-zinc-600 max-w-sm leading-relaxed text-xs font-sans">
              Autonomous digital experience. Crafted at the intersection of biological kinetic propulsion, autoclave composites, and quiet luxury.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
              <Globe className="w-3.5 h-3.5 text-zinc-700" />
              <span>Worldwide carbon-neutral dispatch via DHL Express</span>
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {navGroups.map((grp) => (
              <div key={grp.title} className="space-y-3">
                <h4 className="text-zinc-950 font-bold uppercase tracking-wider text-[11px] font-headline">
                  {grp.title}
                </h4>
                <ul className="space-y-2 font-sans">
                  {grp.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-zinc-500 hover:text-zinc-950 transition-colors text-xs"
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

        {/* Bottom Tier: Sub-footer Controls & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} ShoeHub Atelier. All rights reserved.</span>
            {/* <span className="hidden sm:inline">•</span> */}
            {/* <span className="hidden sm:inline">Precision Propulsion Series</span> */}
          </div>

          <div className="flex items-center gap-4">
            {/* Currency Selector */}
            <button
              type="button"
              onClick={() => {
                const list = ['USD', 'EUR', 'GBP'];
                const next = list[(list.indexOf(currency) + 1) % list.length];
                onChangeCurrency(next);
              }}
              className="px-2.5 py-1 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors cursor-pointer"
            >
              {currency}
            </button>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={onToggleSound}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-3 h-3 text-emerald-600" /> : <VolumeX className="w-3 h-3 text-zinc-400" />}
              <span>{soundEnabled ? 'Acoustics On' : 'Muted'}</span>
            </button>

            {/* Back to top */}
            <button
              type="button"
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 flex items-center justify-center transition-colors cursor-pointer"
              title="Return to top"
              aria-label="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
