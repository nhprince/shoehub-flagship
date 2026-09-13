import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import type { ShoeProduct } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (shoe: ShoeProduct) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = PRODUCTS.filter(
    (shoe) =>
      shoe.name.toLowerCase().includes(query.toLowerCase()) ||
      shoe.category.toLowerCase().includes(query.toLowerCase()) ||
      shoe.description.toLowerCase().includes(query.toLowerCase()) ||
      shoe.technologies.some((tech) => tech.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative mx-auto max-w-2xl bg-white/95 backdrop-blur-2xl border border-black/10 rounded-3xl shadow-2xl overflow-hidden text-zinc-900"
          >
            {/* Search Input Field */}
            <div className="flex items-center px-4 border-b border-black/5">
              <Search className="w-5 h-5 text-zinc-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search models, carbon plates, supercritical foam..."
                className="w-full bg-transparent py-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none font-sans"
              />
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-zinc-400 hover:text-zinc-950 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Filter Tags */}
            <div className="px-4 py-2.5 bg-zinc-50/80 border-b border-black/5 flex items-center gap-2 overflow-x-auto text-[11px] font-mono text-zinc-500">
              <span className="text-zinc-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" /> Suggested:
              </span>
              {['Hyper-Speed', 'Trail', 'Carbon Fork', 'Supercritical', 'Zero-Drop'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-zinc-100 text-zinc-700 border border-black/5 shadow-xs transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Results list */}
            <div className="max-h-96 overflow-y-auto p-2 divide-y divide-black/5">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-zinc-400 text-xs font-mono">
                  No footwear matching "{query}"
                </div>
              ) : (
                filtered.map((shoe) => (
                  <button
                    key={shoe.id}
                    type="button"
                    onClick={() => {
                      onSelectProduct(shoe);
                      onClose();
                    }}
                    className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-zinc-100/80 transition-colors text-left group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-xl bg-zinc-50 border border-black/5 p-1 flex-shrink-0 flex items-center justify-center">
                      <img src={shoe.image} alt={shoe.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-semibold text-sm text-zinc-900 group-hover:text-zinc-950 transition-colors">
                          {shoe.name}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase px-1.5 py-0.5 rounded bg-zinc-100 border border-black/5">
                          {shoe.category}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 truncate mt-0.5">{shoe.tagline}</p>
                      <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400 mt-1">
                        <span>{shoe.weight}</span>
                        <span>•</span>
                        <span>{shoe.drop} drop</span>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <span className="font-mono text-sm font-semibold text-zinc-950">${shoe.price}</span>
                      <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))
              )}
            </div>

            <div className="p-3 bg-zinc-50 border-t border-black/5 text-[11px] font-mono text-zinc-400 flex justify-between items-center px-4">
              <span>Press ESC to dismiss</span>
              {/* <span>ShoeHub Product Directory</span> */}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
