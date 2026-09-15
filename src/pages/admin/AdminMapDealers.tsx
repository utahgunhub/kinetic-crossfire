import { TacticalButton } from "@/components/TacticalButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { formatDealerAddress, geocodeAddress } from "@/lib/geocode";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type MapDealer = {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  phone: string | null;
  website: string | null;
  lat: number | null;
  lng: number | null;
  is_published: boolean;
  sort_order: number;
  notes: string | null;
};

const emptyForm = {
  name: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  website: "",
  lat: "",
  lng: "",
  is_published: false,
  sort_order: "0",
  notes: "",
};

const AdminMapDealers = () => {
  const [dealers, setDealers] = useState<MapDealer[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [geocoding, setGeocoding] = useState(false);

  const loadDealers = async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("map_dealers")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) {
      toast.error("Could not load map dealers.");
      return;
    }
    setDealers((data as MapDealer[]) ?? []);
  };

  useEffect(() => {
    void loadDealers();
  }, []);

  const lookupCoordinates = async () => {
    setGeocoding(true);
    try {
      const query = formatDealerAddress({
        address: form.address,
        city: form.city,
        state: form.state,
        zip: form.zip,
      }) || form.name;
      const result = await geocodeAddress(query);
      if (!result) {
        toast.error("No coordinates found for that address.");
        return;
      }
      setForm((current) => ({
        ...current,
        lat: String(result.lat),
        lng: String(result.lng),
      }));
      toast.success("Coordinates filled in.");
    } catch (error) {
      toast.error("Geocoding failed.");
    } finally {
      setGeocoding(false);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      address: form.address.trim() || null,
      city: form.city.trim() || null,
      state: form.state.trim() || null,
      zip: form.zip.trim() || null,
      phone: form.phone.trim() || null,
      website: form.website.trim() || null,
      lat: form.lat ? Number(form.lat) : null,
      lng: form.lng ? Number(form.lng) : null,
      is_published: form.is_published,
      sort_order: Number(form.sort_order) || 0,
      notes: form.notes.trim() || null,
    };

    try {
      if (editingId) {
        const { error } = await supabase.from("map_dealers").update(payload).eq("id", editingId);
        if (error) throw error;
        toast.success("Dealer location updated.");
      } else {
        const { error } = await supabase.from("map_dealers").insert(payload);
        if (error) throw error;
        toast.success("Dealer location added.");
      }
      resetForm();
      await loadDealers();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save dealer.");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (dealer: MapDealer) => {
    setEditingId(dealer.id);
    setForm({
      name: dealer.name,
      address: dealer.address ?? "",
      city: dealer.city ?? "",
      state: dealer.state ?? "",
      zip: dealer.zip ?? "",
      phone: dealer.phone ?? "",
      website: dealer.website ?? "",
      lat: dealer.lat != null ? String(dealer.lat) : "",
      lng: dealer.lng != null ? String(dealer.lng) : "",
      is_published: dealer.is_published,
      sort_order: String(dealer.sort_order ?? 0),
      notes: dealer.notes ?? "",
    });
  };

  const handleDelete = async (id: string) => {
    if (!supabase) return;
    if (!confirm("Delete this map location?")) return;
    const { error } = await supabase.from("map_dealers").delete().eq("id", id);
    if (error) {
      toast.error("Could not delete dealer.");
      return;
    }
    toast.success("Deleted.");
    if (editingId === id) resetForm();
    await loadDealers();
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-4 p-6 bg-tactical-dark rounded-lg border border-tactical-green-dim/30"
      >
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold">
            {editingId ? "Edit location" : "Add location"}
          </h2>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dealerName">Name</Label>
          <Input id="dealerName" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dealerPhone">Phone</Label>
          <Input id="dealerPhone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="dealerAddress">Street address</Label>
          <Input id="dealerAddress" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dealerCity">City</Label>
          <Input id="dealerCity" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dealerState">State</Label>
          <Input id="dealerState" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dealerZip">ZIP</Label>
          <Input id="dealerZip" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dealerWebsite">Website</Label>
          <Input id="dealerWebsite" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dealerLat">Latitude</Label>
          <Input id="dealerLat" value={form.lat} onChange={(e) => setForm({ ...form, lat: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dealerLng">Longitude</Label>
          <Input id="dealerLng" value={form.lng} onChange={(e) => setForm({ ...form, lng: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dealerSort">Sort order</Label>
          <Input id="dealerSort" type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} />
        </div>
        <div className="flex items-center gap-3 pt-6">
          <Switch
            checked={form.is_published}
            onCheckedChange={(checked) => setForm({ ...form, is_published: checked })}
            id="dealerPublished"
          />
          <Label htmlFor="dealerPublished">Published on map</Label>
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="dealerNotes">Notes (admin only)</Label>
          <Textarea id="dealerNotes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        </div>
        <div className="md:col-span-2 flex flex-wrap gap-3">
          <TacticalButton type="button" variant="secondary" onClick={() => void lookupCoordinates()} disabled={geocoding}>
            {geocoding ? "Looking up..." : "Lookup coordinates"}
          </TacticalButton>
          <TacticalButton type="submit" disabled={saving}>
            {saving ? "Saving..." : editingId ? "Update location" : "Add location"}
          </TacticalButton>
          {editingId && (
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
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dealers.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-muted-foreground">
                  No map dealers yet.
                </TableCell>
              </TableRow>
            )}
            {dealers.map((dealer) => (
              <TableRow key={dealer.id}>
                <TableCell>{dealer.name}</TableCell>
                <TableCell>{formatDealerAddress(dealer) || "—"}</TableCell>
                <TableCell>{dealer.is_published ? "Yes" : "No"}</TableCell>
                <TableCell className="text-right space-x-3">
                  <button type="button" className="text-sm text-tactical-green hover:underline" onClick={() => startEdit(dealer)}>
                    Edit
                  </button>
                  <button type="button" className="text-sm text-red-400 hover:underline" onClick={() => void handleDelete(dealer.id)}>
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

export default AdminMapDealers;
