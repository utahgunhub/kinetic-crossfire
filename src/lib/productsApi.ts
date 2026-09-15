import { applySalePricing } from "@/lib/sale";
import { supabase } from "@/lib/supabaseClient";
import type { Product, ProductCategory } from "@/data/products";
import { products as fallbackProducts } from "@/data/products";

export type ProductRow = {
  id: string;
  name: string;
  category: ProductCategory;
  price: number | string;
  description: string;
  detailed_description: string;
  features: string[] | null;
  compatibility: Product["compatibility"] | null;
  specifications: Record<string, string> | null;
  manufacturer: string | null;
  is_kinetic_crossfire_product: boolean;
  quantity_on_hand: number;
  stock_status_label: string | null;
  important_notice: string | null;
  contact_only: boolean;
  build_proposal_pdf: string | null;
  sort_order: number;
  featured: boolean;
  is_published: boolean;
  product_images?: Array<{
    id?: string;
    src: string;
    alt: string;
    object_position: string | null;
    sort_order: number;
  }>;
};

let catalogCache: Product[] = fallbackProducts;

export function setProductCatalog(next: Product[]) {
  catalogCache = next;
}

export function getCachedProducts(): Product[] {
  return catalogCache;
}

export function mapProductRow(row: ProductRow): Product {
  const images = (row.product_images ?? [])
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((img) => ({
      src: img.src,
      alt: img.alt,
      objectPosition: img.object_position || undefined,
    }));

  const quantityOnHand = Number(row.quantity_on_hand ?? 0);
  const contactOnly = row.contact_only === true;

  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: Number(row.price),
    description: row.description,
    detailedDescription: row.detailed_description,
    images,
    features: Array.isArray(row.features) ? row.features : [],
    compatibility: row.compatibility || undefined,
    specifications: row.specifications || undefined,
    manufacturer: row.manufacturer || undefined,
    isKineticCrossfireProduct: row.is_kinetic_crossfire_product,
    inStock: contactOnly ? true : quantityOnHand > 0,
    stockStatusLabel: row.stock_status_label || undefined,
    importantNotice: row.important_notice || undefined,
    contactOnly,
    buildProposalPdf: row.build_proposal_pdf || undefined,
    quantityOnHand,
    sortOrder: row.sort_order,
    featured: row.featured,
    isPublished: row.is_published,
  };
}

const PRODUCT_SELECT = `
  id, name, category, price, description, detailed_description, features, compatibility,
  specifications, manufacturer, is_kinetic_crossfire_product, quantity_on_hand,
  stock_status_label, important_notice, contact_only, build_proposal_pdf, sort_order,
  featured, is_published,
  product_images ( id, src, alt, object_position, sort_order )
`;

export async function fetchPublishedProducts(): Promise<Product[]> {
  if (!supabase) return fallbackProducts;

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to load products", error);
    return fallbackProducts;
  }

  return ((data as ProductRow[]) ?? []).map(mapProductRow);
}

export async function fetchAllProductsAdmin(): Promise<ProductRow[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return (data as ProductRow[]) ?? [];
}

export async function fetchProductByIdAdmin(id: string): Promise<ProductRow | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as ProductRow) ?? null;
}

export function withSalePricing(product: Product): Product {
  return applySalePricing(product);
}
