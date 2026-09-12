import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import type { ShoeProduct, Colorway } from '../../types';

interface CollectionProps {
  onAddToCart: (shoe: ShoeProduct, colorway: Colorway, size: number) => void;
  onOpenQuickView: (shoe: ShoeProduct) => void;
  currency: string;
  onPlayTick?: () => void;
}

export const Collection: React.FC<CollectionProps> = ({
  onAddToCart,
  onOpenQuickView,
  currency,
  onPlayTick,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedColorways, setSelectedColorways] = useState<Record<string, Colorway>>(() => {
    const initial: Record<string, Colorway> = {};
    PRODUCTS.forEach((p) => {
      initial[p.id] = p.colorways[0];
    });
    return initial;
  });

  const categories = [
    { id: 'all', label: 'All Silhouettes' },
    { id: 'hyper-speed', label: 'Hyper-Speed' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'trail', label: 'Trail' },
    { id: 'architectural', label: 'Architectural' },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const formatPrice = (amount: number) => {
    const rate = currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.79 : 1.0;
    const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
    return `${symbol}${Math.round(amount * rate)}`;
  };

  const handleSelectColorway = (shoeId: string, cw: Colorway) => {
    setSelectedColorways((prev) => ({ ...prev, [shoeId]: cw }));
    onPlayTick?.();
  };

  return (
    <section id="collection" className="py-20 sm:py-28 bg-zinc-950 border-t border-zinc-900/80 relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[0.6875rem] font-sans font-medium text-zinc-400 tracking-wide block mb-1">
              Permanent Archive
            </span>
            <h2 className="font-headline text-2xl sm:text-4xl font-bold text-white tracking-tight m-0">
              Curated Silhouettes
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  onPlayTick?.();
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-tight transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-white text-zinc-950 font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cohesive Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((shoe) => {
            const currentCw = selectedColorways[shoe.id] || shoe.colorways[0];

            return (
              <motion.div
                key={shoe.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="group rounded-2xl glass-panel p-4 flex flex-col justify-between hover:border-white/20 transition-all duration-300"
              >
                {/* Visual Area with seamless dark studio background */}
                <div>
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900/60 flex items-center justify-center p-3">
                    <img
                      src={shoe.image}
                      alt={shoe.name}
                      className="w-full h-full object-cover rounded-lg filter contrast-105 group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Quick View Button */}
                    <button
                      type="button"
                      onClick={() => onOpenQuickView(shoe)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 border border-white/15 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm shadow-md"
                      title="Inspect Specifications"
                      aria-label="Inspect Specifications"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Product Metadata */}
                  <div className="mt-3.5 flex items-start justify-between">
                    <div>
                      <h3 className="font-headline font-semibold text-sm text-white tracking-tight">
                        {shoe.name}
                      </h3>
                      <p className="text-[0.6875rem] text-zinc-400 mt-0.5">{shoe.subname}</p>
                    </div>
                    <span className="font-mono text-xs font-semibold text-zinc-200">
                      {formatPrice(shoe.price)}
                    </span>
                  </div>

                  {/* Colorway Swatches */}
                  <div className="mt-3 flex items-center gap-1.5">
                    {shoe.colorways.map((cw) => (
                      <button
                        key={cw.id}
                        type="button"
                        onClick={() => handleSelectColorway(shoe.id, cw)}
                        className={`w-3.5 h-3.5 rounded-full border transition-transform cursor-pointer ${
                          currentCw.id === cw.id
                            ? 'border-white scale-125 ring-1 ring-lime-400/40'
                            : 'border-white/20 opacity-60 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: cw.hex }}
                        title={cw.name}
                      />
                    ))}
                    <span className="text-[0.625rem] font-mono text-zinc-500 ml-1.5">
                      {currentCw.name}
                    </span>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onAddToCart(shoe, currentCw, 10)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium font-headline tracking-tight transition-all active:scale-98 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenQuickView(shoe)}
                    className="py-2 px-3 rounded-xl border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white text-xs font-medium font-headline transition-colors cursor-pointer"
                  >
                    Details
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
