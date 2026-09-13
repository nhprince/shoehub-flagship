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
    <section id="collection" className="py-24 sm:py-32 bg-[#fafafa] border-t border-zinc-200/80 relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-5">
          <div>
            <span className="text-[0.6875rem] font-sans font-medium text-zinc-500 tracking-wide block mb-1.5">
              Permanent Archive
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl font-extrabold text-zinc-950 tracking-tight m-0">
              Curated Silhouettes
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  onPlayTick?.();
                }}
                className={`px-4 py-2 rounded-full text-xs font-sans tracking-tight transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-zinc-950 text-white font-semibold shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-black/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cohesive Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((shoe) => {
            const currentCw = selectedColorways[shoe.id] || shoe.colorways[0];

            return (
              <motion.div
                key={shoe.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="group rounded-3xl glass-panel p-5 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
              >
                {/* Visual Area with seamless clean studio background */}
                <div>
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100/80 flex items-center justify-center p-3 border border-black/5">
                    <img
                      src={shoe.image}
                      alt={shoe.name}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Quick View Button */}
                    <button
                      type="button"
                      onClick={() => onOpenQuickView(shoe)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-black/10 flex items-center justify-center text-zinc-700 hover:text-black hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-md shadow-md"
                      title="Inspect Specifications"
                      aria-label="Inspect Specifications"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Product Metadata */}
                  <div className="mt-4 flex items-start justify-between">
                    <div>
                      <h3 className="font-headline font-bold text-base text-zinc-950 tracking-tight">
                        {shoe.name}
                      </h3>
                      <p className="text-xs text-zinc-500 mt-0.5 font-sans">{shoe.subname}</p>
                    </div>
                    <span className="font-mono text-sm font-semibold text-zinc-900">
                      {formatPrice(shoe.price)}
                    </span>
                  </div>

                  {/* Colorway Swatches */}
                  <div className="mt-3.5 flex items-center gap-1.5">
                    {shoe.colorways.map((cw) => (
                      <button
                        key={cw.id}
                        type="button"
                        onClick={() => handleSelectColorway(shoe.id, cw)}
                        className={`w-3.5 h-3.5 rounded-full border transition-transform cursor-pointer ${
                          currentCw.id === cw.id
                            ? 'border-zinc-900 scale-125 ring-2 ring-emerald-500/30'
                            : 'border-black/10 opacity-70 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: cw.hex }}
                        title={cw.name}
                      />
                    ))}
                    <span className="text-[0.6875rem] font-mono text-zinc-500 ml-1.5">
                      {currentCw.name}
                    </span>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="mt-5 pt-3.5 border-t border-black/5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onAddToCart(shoe, currentCw, 10)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold font-headline tracking-tight transition-all active:scale-98 shadow-sm cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenQuickView(shoe)}
                    className="py-2.5 px-3.5 rounded-xl border border-zinc-200 hover:border-zinc-400 text-zinc-700 hover:text-zinc-950 text-xs font-semibold font-headline transition-colors cursor-pointer bg-white/70"
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
