import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { CartItem } from '../../types';
import { Button } from '../ui/Button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  remainingForFreeShipping: number;
  shippingProgress: number;
  freeShippingThreshold: number;
  onUpdateQuantity: (shoeId: string, colorwayId: string, size: number, qty: number) => void;
  onRemoveItem: (shoeId: string, colorwayId: string, size: number) => void;
  onClearCart: () => void;
  currency: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  remainingForFreeShipping,
  shippingProgress,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const formatPrice = (amount: number) => {
    const rate = currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.79 : 1.0;
    const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
    return `${symbol}${Math.round(amount * rate)}`;
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'VIP20' || promoCode.trim().toUpperCase() === 'SHOEHUB') {
      setDiscount(0.2);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "VIP20"');
    }
  };

  const finalTotal = subtotal * (1 - discount);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#bef264', '#ffffff', '#c9b07a'],
      });
      setTimeout(() => {
        onClearCart();
      }, 2500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 text-zinc-100 flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="font-display font-bold text-lg tracking-tight">BAG</h2>
                  <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">
                    {items.length} ITEMS
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="px-6 py-3.5 bg-zinc-900/50 border-b border-zinc-800/80">
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-lime-400" />
                    {remainingForFreeShipping > 0
                      ? `Add ${formatPrice(remainingForFreeShipping)} for complimentary express delivery`
                      : 'Complimentary Worldwide Express Unlocked'}
                  </span>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-lime-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Drawer Content */}
              {checkoutSuccess ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 rounded-full bg-lime-500/20 border border-lime-400/40 flex items-center justify-center text-lime-400 mb-4"
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </motion.div>
                  <h3 className="font-display text-xl font-bold mb-2">ORDER ALLOCATED</h3>
                  <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                    Your ShoeHub order has been queued for precision atelier assembly. You will receive an encrypted dispatch confirmation shortly.
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setCheckoutSuccess(false);
                      onClose();
                    }}
                  >
                    CONTINUE EXPLORING
                  </Button>
                </div>
              ) : items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 mb-4">
                    <X className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-semibold text-base mb-1">YOUR BAG IS EMPTY</h3>
                  <p className="text-xs text-zinc-500 mb-6 max-w-xs">
                    Explore our hyper-light propulsion silhouettes and architectural designs.
                  </p>
                  <Button variant="primary" size="sm" onClick={onClose}>
                    VIEW COLLECTION
                  </Button>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-6 divide-y divide-zinc-900">
                  {items.map((item) => (
                    <div
                      key={`${item.shoe.id}-${item.selectedColorway.id}-${item.selectedSize}`}
                      className="py-4 flex gap-4 first:pt-0"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-20 h-20 rounded-xl bg-zinc-900 border border-zinc-800 p-2 flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                        <img
                          src={item.shoe.image}
                          alt={item.shoe.name}
                          className="w-full h-full object-contain filter contrast-110"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="font-display font-semibold text-sm leading-tight">
                              {item.shoe.name}
                            </h4>
                            <span className="font-mono text-xs font-medium ml-2">
                              {formatPrice(item.shoe.price * item.quantity)}
                            </span>
                          </div>
                          <div className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
                            <span>US {item.selectedSize}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <span
                                className="w-2 h-2 rounded-full border border-zinc-700 inline-block"
                                style={{ backgroundColor: item.selectedColorway.hex }}
                              />
                              {item.selectedColorway.name}
                            </span>
                          </div>
                        </div>

                        {/* Quantity and Delete Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="inline-flex items-center border border-zinc-800 rounded-lg bg-zinc-900/60 p-0.5 text-xs">
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(
                                  item.shoe.id,
                                  item.selectedColorway.id,
                                  item.selectedSize,
                                  item.quantity - 1
                                )
                              }
                              className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 font-mono text-xs">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(
                                  item.shoe.id,
                                  item.selectedColorway.id,
                                  item.selectedSize,
                                  item.quantity + 1
                                )
                              }
                              className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              onRemoveItem(item.shoe.id, item.selectedColorway.id, item.selectedSize)
                            }
                            className="text-zinc-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Drawer Footer & Checkout */}
              {items.length > 0 && !checkoutSuccess && (
                <div className="p-6 bg-zinc-950 border-t border-zinc-800 space-y-4">
                  {/* Promo Input */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="PROMO CODE (e.g. VIP20)"
                      className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono uppercase tracking-wider text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200 rounded-lg cursor-pointer transition-colors"
                    >
                      APPLY
                    </button>
                  </form>
                  {discount > 0 && (
                    <div className="text-[11px] font-mono text-lime-400 flex items-center gap-1">
                      <span>✓ 20% VIP Atelier discount applied</span>
                    </div>
                  )}
                  {promoError && (
                    <div className="text-[11px] font-mono text-rose-400">
                      {promoError}
                    </div>
                  )}

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-zinc-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono text-zinc-200">{formatPrice(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-lime-400">
                        <span>VIP Discount (20%)</span>
                        <span className="font-mono">-{formatPrice(subtotal * discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Express Shipping</span>
                      <span className="font-mono text-zinc-200">
                        {remainingForFreeShipping === 0 ? 'FREE' : formatPrice(25)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-zinc-900">
                      <span>Estimated Total</span>
                      <span className="font-mono text-base">{formatPrice(finalTotal)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handleCheckout}
                    isLoading={isCheckingOut}
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    PROCEED TO CHECKOUT
                  </Button>

                  <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-zinc-500 pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-zinc-400" />
                      ENCRYPTED 256-BIT
                    </span>
                    <span>•</span>
                    <span>30-DAY TRIAL RETURN</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
