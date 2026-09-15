import { TacticalButton } from "@/components/TacticalButton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { fetchAllProductsAdmin, mapProductRow, type ProductRow } from "@/lib/productsApi";
import { useProductCatalog } from "@/contexts/ProductCatalogContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminProducts = () => {
  const { refresh } = useProductCatalog();
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchAllProductsAdmin();
      setRows(data);
    } catch (error) {
      toast.error("Could not load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!supabase) return;
    if (!confirm(`Delete product ${id}? This cannot be undone.`)) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Product deleted.");
    await load();
    await refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link to="/admin/products/new">
          <TacticalButton>Add product</TacticalButton>
        </Link>
      </div>
      <div className="bg-tactical-dark rounded-lg border border-tactical-green-dim/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-muted-foreground">
                  {loading ? "Loading..." : "No products yet."}
                </TableCell>
              </TableRow>
            )}
            {rows.map((row) => {
              const product = mapProductRow(row);
              return (
                <TableRow key={row.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="capitalize">{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.quantityOnHand}</TableCell>
                  <TableCell>{product.sortOrder}</TableCell>
                  <TableCell>
                    {product.contactOnly
                      ? "Contact only"
                      : product.isPublished === false
                        ? "Hidden"
                        : product.inStock === false
                          ? "Out of stock"
                          : "Published"}
                  </TableCell>
                  <TableCell className="text-right space-x-3">
                    <Link to={`/admin/products/${row.id}`} className="text-sm text-tactical-green hover:underline">
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="text-sm text-red-400 hover:underline"
                      onClick={() => void handleDelete(row.id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminProducts;
