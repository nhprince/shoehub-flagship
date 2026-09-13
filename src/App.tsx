import { useState } from 'react';
import { useCart } from './hooks/useCart';
import { useSound } from './hooks/useSound';
import { useLenis } from './hooks/useLenis';
import { PRODUCTS } from './data/products';
import type { ShoeProduct, Colorway } from './types';

// Components
import { Loader } from './components/sections/Loader';
import { Navbar } from './components/navigation/Navbar';
import { CartDrawer } from './components/navigation/CartDrawer';
import { SearchModal } from './components/navigation/SearchModal';
import { QuickViewModal } from './components/ui/QuickViewModal';
import { ScrollShoeStage } from './components/3d/ScrollShoeStage';
import { Manifesto } from './components/sections/Manifesto';
import { Collection } from './components/sections/Collection';
import { MaterialLab } from './components/sections/MaterialLab';
import { Lookbook } from './components/sections/Lookbook';
import { Reviews } from './components/sections/Reviews';
import { FinalCTA } from './components/sections/FinalCTA';
import { Footer } from './components/sections/Footer';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickViewShoe, setQuickViewShoe] = useState<ShoeProduct | null>(null);
  const [currency, setCurrency] = useState('USD');

  // Initialize smooth scrolling and sound
  useLenis(!isLoading);
  const { enabled: soundEnabled, toggleSound, playClick, playTick, playSuccess } = useSound();
  const {
    items,
    isOpen: cartOpen,
    setIsOpen: setCartOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    totalCount,
    remainingForFreeShipping,
    shippingProgress,
    freeShippingThreshold,
  } = useCart();

  // Handlers
  const handleHeroAddToCart = (colorway: Colorway) => {
    const heroShoe = PRODUCTS[0];
    addItem(heroShoe, colorway, 10, 1);
    playSuccess();
  };

  const handleCollectionAddToCart = (shoe: ShoeProduct, colorway: Colorway, size: number) => {
    addItem(shoe, colorway, size, 1);
    playSuccess();
  };

  const handleSelectProductFromSearch = (shoe: ShoeProduct) => {
    setQuickViewShoe(shoe);
    playClick();
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 selection:bg-zinc-950 selection:text-white font-sans antialiased">
      {/* Cinematic Custom Initial Loader */}
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      {/* Main Experience Layout */}
      <div className={`transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Navigation Bar */}
        <Navbar
          cartCount={totalCount}
          onOpenCart={() => {
            setCartOpen(true);
            playClick();
          }}
          onOpenSearch={() => {
            setSearchOpen(true);
            playClick();
          }}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          currency={currency}
          onChangeCurrency={(c) => {
            setCurrency(c);
            playTick();
          }}
        />

        {/* Narrative Flow */}
        <main>
          {/* 1. Immersive Scroll-Animated 3D Shoe & Story Beats */}
          <ScrollShoeStage
            onAddToCart={handleHeroAddToCart}
            onPlayTick={playTick}
          />

          {/* 2. Brand Manifesto & Compact Metrics */}
          <Manifesto />

          {/* 3. Curated 5-Silhouette Collection */}
          <Collection
            onAddToCart={handleCollectionAddToCart}
            onOpenQuickView={(shoe) => {
              setQuickViewShoe(shoe);
              playClick();
            }}
            currency={currency}
            onPlayTick={playTick}
          />

          {/* 4. Material Science Laboratory */}
          <MaterialLab onPlayTick={playTick} />

          {/* 5. Editorial Field Lookbook */}
          <Lookbook />

          {/* 6. Press & Athlete Reviews */}
          <Reviews />

          {/* 7. VIP Allocation CTA */}
          <FinalCTA />
        </main>

        {/* 8. Minimal Luxury Footer */}
        <Footer
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          currency={currency}
          onChangeCurrency={(c) => {
            setCurrency(c);
            playTick();
          }}
        />

        {/* Interactive Drawers & Modals */}
        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          items={items}
          subtotal={subtotal}
          remainingForFreeShipping={remainingForFreeShipping}
          shippingProgress={shippingProgress}
          freeShippingThreshold={freeShippingThreshold}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onClearCart={clearCart}
          currency={currency}
        />

        <SearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          onSelectProduct={handleSelectProductFromSearch}
        />

        <QuickViewModal
          shoe={quickViewShoe}
          onClose={() => setQuickViewShoe(null)}
          onAddToCart={(shoe, cw, size) => {
            addItem(shoe, cw, size, 1);
            playSuccess();
          }}
          currency={currency}
        />
      </div>
    </div>
  );
}

export default App;
