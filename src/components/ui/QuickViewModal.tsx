import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ShieldCheck, Check } from 'lucide-react';
import type { ShoeProduct, Colorway } from '../../types';
import { Button } from './Button';
import { Badge } from './Badge';

interface QuickViewModalProps {
  shoe: ShoeProduct | null;
  onClose: () => void;
  onAddToCart: (shoe: ShoeProduct, colorway: Colorway, size: number) => void;
  currency: string;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  shoe,
  onClose,
  onAddToCart,
  currency,
}) => {
  if (!shoe) return null;

  const [selectedColorway, setSelectedColorway] = useState<Colorway>(shoe.colorways[0]);
  const [selectedSize, setSelectedSize] = useState<number>(shoe.sizes[0] || 10);

  const formatPrice = (amount: number) => {
    const rate = currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.79 : 1.0;
    const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
    return `${symbol}${Math.round(amount * rate)}`;
  };

  const handleAdd = () => {
    onAddToCart(shoe, selectedColorway, selectedSize);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-md"
        />

        {/* Dialog Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-white/95 backdrop-blur-2xl border border-black/10 rounded-3xl overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-12 text-zinc-900"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-black/5 flex items-center justify-center text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Column: Visual Showcase */}
          <div className="md:col-span-6 bg-zinc-50/80 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-black/5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{shoe.category.toUpperCase()}</Badge>
                {shoe.featured && <Badge variant="accent">FEATURED</Badge>}
              </div>
              <h3 className="font-sans text-2xl font-bold tracking-tight text-zinc-900">
                {shoe.name}
              </h3>
              <p className="text-xs font-mono text-zinc-500 mt-1">{shoe.subname}</p>
            </div>

            <div className="relative my-8 flex items-center justify-center">
              <img
                src={shoe.image}
                alt={shoe.name}
                className="w-full max-h-72 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.12)]"
              />
            </div>

            {/* Micro telemetry footer */}
            <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-black/5 font-mono text-xs">
              <div className="bg-white p-2 rounded-xl border border-black/5 shadow-sm">
                <span className="text-[10px] text-zinc-400 block">MASS</span>
                <span className="font-bold text-zinc-900">{shoe.weight}</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-black/5 shadow-sm">
                <span className="text-[10px] text-zinc-400 block">DROP</span>
                <span className="font-bold text-zinc-900">{shoe.drop}</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-black/5 shadow-sm">
                <span className="text-[10px] text-zinc-400 block">CUSHION</span>
                <span className="font-bold text-emerald-600">NITRO</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specifications & Configuration */}
          <div className="md:col-span-6 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-2xl font-bold text-zinc-950">
                  {formatPrice(shoe.price)}
                </span>
                {/* <span className="text-xs font-mono text-zinc-500">Includes global taxes</span> */}
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mt-4 font-sans">
                {shoe.description}
              </p>

              {/* Technologies List */}
              <div className="mt-5 space-y-1.5">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                  Integrated Technologies:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {shoe.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="text-xs font-mono text-zinc-700 flex items-center gap-1.5 bg-zinc-50 px-2.5 py-1.5 rounded-lg border border-black/5"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colorway Selection */}
              <div className="mt-5">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Colorway: <span className="text-zinc-900 font-semibold">{selectedColorway.name}</span>
                </span>
                <div className="flex items-center gap-2">
                  {shoe.colorways.map((cw) => (
                    <button
                      key={cw.id}
                      type="button"
                      onClick={() => setSelectedColorway(cw)}
                      className={`w-7 h-7 rounded-full border transition-all cursor-pointer ${selectedColorway.id === cw.id
                          ? 'border-zinc-950 scale-110 shadow-md ring-2 ring-zinc-950/20'
                          : 'border-zinc-300 opacity-70 hover:opacity-100'
                        }`}
                      style={{ backgroundColor: cw.hex }}
                      title={cw.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                    Select Size (US Men):
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    True to size fit
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {shoe.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-8 rounded-lg text-xs font-mono transition-all cursor-pointer ${selectedSize === size
                          ? 'bg-zinc-950 text-white font-bold shadow-sm'
                          : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border border-black/5'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-6 border-t border-black/5 mt-6 space-y-3">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleAdd}
                icon={<ShoppingBag className="w-4 h-4" />}
              >
                Add to Bag • {formatPrice(shoe.price)}
              </Button>
              <div className="flex items-center justify-center gap-3 text-[10px] font-mono text-zinc-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-zinc-500" />
                  Authenticity Verified
                </span>
                <span>•</span>
                <span>Free Worldwide Expedited Shipping</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
