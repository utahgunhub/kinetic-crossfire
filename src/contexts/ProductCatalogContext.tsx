import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product, ProductCategory } from "@/data/products";
import { applySalePricing } from "@/lib/sale";
import { useAuth } from "@/contexts/AuthContext";
import {
  fetchPublishedProducts,
  getCachedProducts,
  setProductCatalog,
} from "@/lib/productsApi";

interface ProductCatalogContextType {
  products: Product[];
  loading: boolean;
  refresh: () => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: ProductCategory) => Product[];
  featuredProducts: Product[];
}

const ProductCatalogContext = createContext<ProductCatalogContextType | undefined>(
  undefined
);

export const ProductCatalogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isDealer } = useAuth();
  const [products, setProducts] = useState<Product[]>(getCachedProducts());
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const next = await fetchPublishedProducts();
      setProductCatalog(next);
      setProducts(next);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo(() => {
    const maybeApplySale = (product: Product): Product =>
      isDealer ? product : applySalePricing(product);

    const getProductById = (id: string): Product | undefined => {
      const product = products.find((item) => item.id === id);
      if (!product) return undefined;
      return maybeApplySale(product);
    };
    const getProductsByCategory = (category: ProductCategory): Product[] =>
      products
        .filter((item) => item.category === category)
        .map(maybeApplySale);
    const featuredProducts = products
      .filter((item) => item.featured)
      .map(maybeApplySale);

    return {
      products,
      loading,
      refresh,
      getProductById,
      getProductsByCategory,
      featuredProducts,
    };
  }, [products, loading, refresh, isDealer]);

  return (
    <ProductCatalogContext.Provider value={value}>
      {children}
    </ProductCatalogContext.Provider>
  );
};

export const useProductCatalog = () => {
  const context = useContext(ProductCatalogContext);
  if (!context) {
    throw new Error("useProductCatalog must be used within ProductCatalogProvider");
  }
  return context;
};
