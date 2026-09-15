import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '@/data/products';
import { useAuth } from '@/contexts/AuthContext';
import { useProductCatalog } from '@/contexts/ProductCatalogContext';
import {
  applyDealerPricingToProduct,
  countFrtQuantityInCart,
} from '@/lib/dealerPricing';

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
  const { isDealer } = useAuth();
  const { products, getProductById } = useProductCatalog();

  const resolveProductForCart = useCallback(
    (productId: string, cartItems: CartItem[]): Product | undefined => {
      if (isDealer) {
        const base = products.find((p) => p.id === productId);
        if (!base) return undefined;
        const frtQty = countFrtQuantityInCart(cartItems);
        return applyDealerPricingToProduct(base, frtQty);
      }
      return getProductById(productId);
    },
    [isDealer, products, getProductById]
  );

  const refreshCartPrices = useCallback(
    (cartItems: CartItem[]): CartItem[] =>
      cartItems.map((item) => {
        const freshProduct = resolveProductForCart(item.product.id, cartItems);
        return freshProduct ? { ...item, product: freshProduct } : item;
      }),
    [resolveProductForCart]
  );

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
  }, [isDealer, refreshCartPrices]);

  const addToCart = (product: Product, quantity: number) => {
    setItems((currentItems) => {
      const pricedProduct =
        resolveProductForCart(product.id, currentItems) ?? product;

      const existingItem = currentItems.find(
        (item) => item.product.id === pricedProduct.id
      );

      let nextItems: CartItem[];
      if (existingItem) {
        nextItems = currentItems.map((item) =>
          item.product.id === pricedProduct.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                product: pricedProduct,
              }
            : item
        );
      } else {
        nextItems = [...currentItems, { product: pricedProduct, quantity }];
      }

      return refreshCartPrices(nextItems);
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((currentItems) =>
      refreshCartPrices(currentItems.filter((item) => item.product.id !== productId))
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(currentItems =>
      refreshCartPrices(
        currentItems.map(item => {
          if (item.product.id !== productId) return item;
          return { ...item, quantity };
        })
      )
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

