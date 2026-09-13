import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Volume2, VolumeX, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  currency: string;
  onChangeCurrency: (curr: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  soundEnabled,
  onToggleSound,
  currency,
  onChangeCurrency,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Collection', href: '#collection' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Laboratory', href: '#material-lab' },
    { label: 'Lookbook', href: '#lookbook' },
    { label: 'Reviews', href: '#reviews' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextCurrency = () => {
    const list = ['USD', 'EUR', 'GBP'];
    const next = list[(list.indexOf(currency) + 1) % list.length];
    onChangeCurrency(next);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'py-2.5' : 'py-5'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-[3.25rem] px-4 sm:px-6 rounded-full glass-panel">
            {/* Brand Logo */}
            <a
              href="#"
              className="flex items-center gap-1.5 font-headline font-bold text-base sm:text-lg tracking-tight text-zinc-900 hover:text-black transition-colors"
            >
              <span>SHOEHUB</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xs font-sans font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Utility Actions */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={onOpenSearch}
                className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:bg-black/5 transition-all cursor-pointer"
                title="Search (Cmd+K)"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5" />
              </button>

              {/* Currency Selector */}
              <button
                type="button"
                onClick={nextCurrency}
                className="px-2.5 py-1 rounded-full text-[11px] font-mono text-zinc-600 hover:text-zinc-950 hover:bg-black/5 transition-all cursor-pointer"
                title="Toggle Currency"
              >
                {currency}
              </button>

              {/* Sound Audio Toggle */}
              <button
                type="button"
                onClick={onToggleSound}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  soundEnabled
                    ? 'text-emerald-600 hover:bg-emerald-50'
                    : 'text-zinc-400 hover:text-zinc-600 hover:bg-black/5'
                }`}
                title={soundEnabled ? 'Acoustics Active' : 'Muted'}
                aria-label="Toggle Sound"
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={onOpenCart}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 transition-all active:scale-95 shadow-sm cursor-pointer ml-1"
                aria-label={`Cart with ${cartCount} items`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="text-xs font-mono font-semibold">{cartCount}</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-8 h-8 rounded-full flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:bg-black/5 transition-all cursor-pointer ml-1"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-4 top-[4.5rem] z-30 rounded-2xl glass-panel p-6 md:hidden"
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-sans font-medium text-zinc-700 hover:text-zinc-950 py-2 border-b border-black/5"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center justify-between pt-3 text-xs font-mono text-zinc-500">
                <span>Currency: {currency}</span>
                <button
                  type="button"
                  onClick={onToggleSound}
                  className="flex items-center gap-1 text-zinc-600 hover:text-zinc-950"
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-600" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>Sound {soundEnabled ? 'Active' : 'Muted'}</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
