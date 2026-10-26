import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductSize } from '../types';

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, selectedColor: string, selectedSize: ProductSize, quantity?: number) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  shippingFee: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
}

const FREE_SHIPPING_THRESHOLD = 3999;
const STANDARD_SHIPPING_FEE = 199;

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('downtown_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    // Genuinely empty shopping cart for first-time visitors
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('downtown_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const addToCart = (product: Product, selectedColor: string, selectedSize: ProductSize, quantity = 1) => {
    // Validate size availability
    const sizeSpec = product.sizes.find(s => s.size === selectedSize);
    if (sizeSpec && !sizeSpec.inStock) {
      console.warn(`Size ${selectedSize} is unavailable for ${product.name}`);
      return;
    }

    const safeQty = Math.max(1, Math.min(10, Math.floor(quantity)));
    const itemId = `${product.id}-${selectedColor}-${selectedSize}`;
    
    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item => 
          item.id === itemId 
            ? { ...item, quantity: Math.min(10, item.quantity + safeQty) }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          product,
          selectedColor,
          selectedSize,
          quantity: safeQty,
          price: product.price
        }
      ];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: Math.min(10, newQuantity) }
          : item
      )
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        shippingFee,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
