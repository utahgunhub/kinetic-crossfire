import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, getProductById } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const refreshCartPrices = (cartItems: CartItem[]): CartItem[] =>
    cartItems.map((item) => {
      const freshProduct = getProductById(item.product.id);
      return freshProduct ? { ...item, product: freshProduct } : item;
    });

  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) return [];
    return refreshCartPrices(JSON.parse(savedCart));
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    setItems((currentItems) => refreshCartPrices(currentItems));
  }, []);

  const addToCart = (product: Product, quantity: number) => {
    const pricedProduct = getProductById(product.id) ?? product;

    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.product.id === pricedProduct.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.product.id === pricedProduct.id
            ? { ...item, quantity: item.quantity + quantity, product: pricedProduct }
            : item
        );
      } else {
        return [...currentItems, { product: pricedProduct, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(currentItems =>
      currentItems.map(item => {
        if (item.product.id !== productId) return item;
        const freshProduct = getProductById(productId);
        return {
          ...item,
          quantity,
          product: freshProduct ?? item.product,
        };
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

