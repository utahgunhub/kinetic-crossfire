import { TacticalButton } from "@/components/TacticalButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Coupon = {
  code: string;
  type: "percent" | "fixed";
  value: number;
  is_active: boolean;
  starts_at: string | null;
  ends_at: string | null;
  min_subtotal: number | null;
  max_redemptions: number | null;
  redemption_count: number;
  notes: string | null;
};

const emptyForm = {
  code: "",
  type: "percent" as "percent" | "fixed",
  value: "15",
  is_active: true,
  starts_at: "",
  ends_at: "",
  min_subtotal: "",
  max_redemptions: "",
  notes: "",
};

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    if (!supabase) return;
    const { data, error } = await supabase.from("coupons").select("*").order("code");
    if (error) {
      toast.error("Could not load discount codes.");
      return;
    }
    setCoupons((data as Coupon[]) ?? []);
  };

  useEffect(() => {
    void load();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingCode(null);
  };

  const toIso = (value: string) => (value ? new Date(value).toISOString() : null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    const code = form.code.trim().toUpperCase();
    const payload = {
      code,
      type: form.type,
      value: Number(form.value),
      is_active: form.is_active,
      starts_at: toIso(form.starts_at),
      ends_at: toIso(form.ends_at),
      min_subtotal: form.min_subtotal ? Number(form.min_subtotal) : null,
      max_redemptions: form.max_redemptions ? Number(form.max_redemptions) : null,
      notes: form.notes.trim() || null,
    };
    setSaving(true);
    try {
      if (editingCode && editingCode !== code) {
        await supabase.from("coupons").delete().eq("code", editingCode);
        const { error } = await supabase.from("coupons").insert(payload);
        if (error) throw error;
      } else if (editingCode) {
        const { error } = await supabase.from("coupons").update(payload).eq("code", editingCode);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("coupons").insert(payload);
        if (error) throw error;
      }
      toast.success("Discount code saved.");
      resetForm();
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save code.");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (coupon: Coupon) => {
    setEditingCode(coupon.code);
    setForm({
      code: coupon.code,
      type: coupon.type,
      value: String(coupon.value),
      is_active: coupon.is_active,
      starts_at: coupon.starts_at ? coupon.starts_at.slice(0, 16) : "",
      ends_at: coupon.ends_at ? coupon.ends_at.slice(0, 16) : "",
      min_subtotal: coupon.min_subtotal != null ? String(coupon.min_subtotal) : "",
      max_redemptions: coupon.max_redemptions != null ? String(coupon.max_redemptions) : "",
      notes: coupon.notes ?? "",
    });
  };

  const handleDelete = async (code: string) => {
    if (!supabase) return;
    if (!confirm(`Delete ${code}?`)) return;
    const { error } = await supabase.from("coupons").delete().eq("code", code);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Deleted.");
    if (editingCode === code) resetForm();
    await load();
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 p-6 bg-tactical-dark rounded-lg border border-tactical-green-dim/30">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold">{editingCode ? "Edit code" : "New discount code"}</h2>
        </div>
        <div className="space-y-2">
          <Label htmlFor="couponCode">Code</Label>
          <Input id="couponCode" required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="couponType">Type</Label>
          <select
            id="couponType"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as "percent" | "fixed" })}
          >
            <option value="percent">Percent off subtotal</option>
            <option value="fixed">Fixed dollar off subtotal</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="couponValue">Value</Label>
          <Input id="couponValue" type="number" step="0.01" required value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="minSub">Minimum subtotal (optional)</Label>
          <Input id="minSub" type="number" step="0.01" value={form.min_subtotal} onChange={(e) => setForm({ ...form, min_subtotal: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="starts">Starts (optional)</Label>
          <Input id="starts" type="datetime-local" value={form.starts_at} onChange={(e) => setForm({ ...form, starts_at: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ends">Ends (optional)</Label>
          <Input id="ends" type="datetime-local" value={form.ends_at} onChange={(e) => setForm({ ...form, ends_at: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxRed">Max redemptions (optional)</Label>
          <Input id="maxRed" type="number" value={form.max_redemptions} onChange={(e) => setForm({ ...form, max_redemptions: e.target.value })} />
        </div>
        <div className="flex items-center gap-3 pt-6">
          <Switch checked={form.is_active} onCheckedChange={(checked) => setForm({ ...form, is_active: checked })} />
          <span>Active</span>
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="couponNotes">Notes</Label>
          <Textarea id="couponNotes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        </div>
        <div className="md:col-span-2 flex gap-3">
          <TacticalButton type="submit" disabled={saving}>
            {saving ? "Saving..." : editingCode ? "Update code" : "Add code"}
          </TacticalButton>
          {editingCode && (
            <TacticalButton type="button" variant="secondary" onClick={resetForm}>
              Cancel
            </TacticalButton>
          )}
        </div>
      </form>

      <div className="bg-tactical-dark rounded-lg border border-tactical-green-dim/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Uses</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon.code}>
                <TableCell className="font-mono">{coupon.code}</TableCell>
                <TableCell>
                  {coupon.type === "percent" ? `${coupon.value}%` : `$${Number(coupon.value).toFixed(2)}`}
                </TableCell>
                <TableCell>{coupon.is_active ? "Yes" : "No"}</TableCell>
                <TableCell>
                  {coupon.redemption_count}
                  {coupon.max_redemptions != null ? ` / ${coupon.max_redemptions}` : ""}
                </TableCell>
                <TableCell className="text-right space-x-3">
                  <button type="button" className="text-sm text-tactical-green hover:underline" onClick={() => startEdit(coupon)}>
                    Edit
                  </button>
                  <button type="button" className="text-sm text-red-400 hover:underline" onClick={() => void handleDelete(coupon.code)}>
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminCoupons;
