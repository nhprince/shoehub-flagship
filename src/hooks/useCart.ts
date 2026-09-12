import { useState, useEffect } from 'react';
import type { CartItem, ShoeProduct, Colorway } from '../types';

const CART_STORAGE_KEY = 'shoehub_cart_v1';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage write errors
    }
  }, [items]);

  const addItem = (shoe: ShoeProduct, selectedColorway: Colorway, selectedSize: number, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.shoe.id === shoe.id &&
          item.selectedColorway.id === selectedColorway.id &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, { shoe, selectedColorway, selectedSize, quantity }];
    });
    setIsOpen(true);
  };

  const removeItem = (shoeId: string, colorwayId: string, size: number) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(item.shoe.id === shoeId && item.selectedColorway.id === colorwayId && item.selectedSize === size)
      )
    );
  };

  const updateQuantity = (shoeId: string, colorwayId: string, size: number, newQty: number) => {
    if (newQty <= 0) {
      removeItem(shoeId, colorwayId, size);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.shoe.id === shoeId && item.selectedColorway.id === colorwayId && item.selectedSize === size) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((acc, item) => acc + item.shoe.price * item.quantity, 0);
  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const freeShippingThreshold = 250;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return {
    items,
    isOpen,
    setIsOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    totalCount,
    freeShippingThreshold,
    remainingForFreeShipping,
    shippingProgress,
  };
}
