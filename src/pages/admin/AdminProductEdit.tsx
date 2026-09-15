import { TacticalButton } from "@/components/TacticalButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { fetchProductByIdAdmin, type ProductRow } from "@/lib/productsApi";
import { useProductCatalog } from "@/contexts/ProductCatalogContext";

type ImageDraft = {
  id?: string;
  src: string;
  alt: string;
  object_position: string;
  sort_order: number;
  file?: File;
};

type SpecRow = { label: string; value: string };

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const emptyLine = [""];

const AdminProductEdit = () => {
  const { productId } = useParams<{ productId: string }>();
  const isNew = productId === "new" || !productId;
  const navigate = useNavigate();
  const { refresh } = useProductCatalog();
  const [saving, setSaving] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState<"thompson" | "apparel">("thompson");
  const [price, setPrice] = useState("0");
  const [description, setDescription] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");
  const [features, setFeatures] = useState<string[]>(emptyLine);
  const [compatibleWith, setCompatibleWith] = useState<string[]>(emptyLine);
  const [usageNotes, setUsageNotes] = useState<string[]>(emptyLine);
  const [specs, setSpecs] = useState<SpecRow[]>([{ label: "", value: "" }]);
  const [manufacturer, setManufacturer] = useState("Kinetic Crossfire");
  const [quantityOnHand, setQuantityOnHand] = useState("0");
  const [stockStatusLabel, setStockStatusLabel] = useState("");
  const [importantNotice, setImportantNotice] = useState("");
  const [contactOnly, setContactOnly] = useState(false);
  const [buildProposalPdf, setBuildProposalPdf] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [featured, setFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [images, setImages] = useState<ImageDraft[]>([]);

  const applyRow = (row: ProductRow) => {
    setId(row.id);
    setName(row.name);
    setCategory(row.category);
    setPrice(String(row.price));
    setDescription(row.description);
    setDetailedDescription(row.detailed_description);
    setFeatures(row.features?.length ? row.features : emptyLine);
    setCompatibleWith(
      row.compatibility?.compatibleWith?.length
        ? row.compatibility.compatibleWith
        : emptyLine
    );
    setUsageNotes(
      row.compatibility?.usageNotes?.length ? row.compatibility.usageNotes : emptyLine
    );
    setSpecs(
      row.specifications && Object.keys(row.specifications).length
        ? Object.entries(row.specifications).map(([label, value]) => ({ label, value }))
        : [{ label: "", value: "" }]
    );
    setManufacturer(row.manufacturer ?? "");
    setQuantityOnHand(String(row.quantity_on_hand ?? 0));
    setStockStatusLabel(row.stock_status_label ?? "");
    setImportantNotice(row.important_notice ?? "");
    setContactOnly(row.contact_only);
    setBuildProposalPdf(row.build_proposal_pdf ?? "");
    setSortOrder(String(row.sort_order ?? 0));
    setFeatured(row.featured);
    setIsPublished(row.is_published);
    setImages(
      (row.product_images ?? [])
        .slice()
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((img, index) => ({
          id: img.id,
          src: img.src,
          alt: img.alt,
          object_position: img.object_position ?? "",
          sort_order: index,
        }))
    );
  };

  useEffect(() => {
    if (isNew) return;
    fetchProductByIdAdmin(productId)
      .then((row) => {
        if (!row) {
          toast.error("Product not found.");
          navigate("/admin/products");
          return;
        }
        applyRow(row);
      })
      .catch(() => toast.error("Could not load product."));
  }, [isNew, productId, navigate]);

  const cleanList = (items: string[]) =>
    items.map((item) => item.trim()).filter(Boolean);

  const uploadImages = async (productSlug: string): Promise<ImageDraft[]> => {
    if (!supabase) return images;
    const next: ImageDraft[] = [];
    for (const [index, image] of images.entries()) {
      if (!image.file) {
        next.push({ ...image, sort_order: index });
        continue;
      }
      const ext = image.file.name.split(".").pop() || "jpg";
      const path = `${productSlug}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("product-images").upload(path, image.file, {
        upsert: false,
      });
      if (error) throw error;
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      next.push({
        ...image,
        src: data.publicUrl,
        file: undefined,
        sort_order: index,
      });
    }
    return next;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    const productSlug = isNew ? slugify(id || name) : id;
    if (!productSlug) {
      toast.error("Enter a product name.");
      return;
    }

    const featureList = cleanList(features);
    const compatList = cleanList(compatibleWith);
    const usageList = cleanList(usageNotes);
    const specMap = Object.fromEntries(
      specs
        .filter((row) => row.label.trim() && row.value.trim())
        .map((row) => [row.label.trim(), row.value.trim()])
    );

    setSaving(true);
    try {
      const uploaded = await uploadImages(productSlug);
      const payload = {
        id: productSlug,
        name: name.trim(),
        category,
        price: Number(price) || 0,
        description,
        detailed_description: detailedDescription,
        features: featureList,
        compatibility:
          compatList.length || usageList.length
            ? { compatibleWith: compatList, usageNotes: usageList }
            : null,
        specifications: Object.keys(specMap).length ? specMap : null,
        manufacturer: manufacturer.trim() || null,
        is_kinetic_crossfire_product: true,
        quantity_on_hand: Number(quantityOnHand) || 0,
        stock_status_label: stockStatusLabel.trim() || null,
        important_notice: importantNotice.trim() || null,
        contact_only: contactOnly,
        build_proposal_pdf: buildProposalPdf.trim() || null,
        sort_order: Number(sortOrder) || 0,
        featured,
        is_published: isPublished,
      };

      if (isNew) {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").update(payload).eq("id", productSlug);
        if (error) throw error;
        await supabase.from("product_images").delete().eq("product_id", productSlug);
      }

      if (uploaded.length) {
        const { error: imageError } = await supabase.from("product_images").insert(
          uploaded.map((img, index) => ({
            product_id: productSlug,
            src: img.src,
            alt: img.alt || name,
            object_position: img.object_position || null,
            sort_order: index,
          }))
        );
        if (imageError) throw imageError;
      }

      toast.success("Product saved.");
      await refresh();
      navigate("/admin/products");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save product.");
    } finally {
      setSaving(false);
    }
  };

  const addFiles = (fileList: FileList | null) => {
    if (!fileList?.length) return;
    const additions = Array.from(fileList).map((file, offset) => ({
      src: URL.createObjectURL(file),
      alt: name ? `${name} photo` : file.name.replace(/\.[^.]+$/, ""),
      object_position: "",
      sort_order: images.length + offset,
      file,
    }));
    setImages((current) => [...current, ...additions]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold">{isNew ? "Add a product" : "Edit product"}</h2>
        <p className="text-muted-foreground mt-1">
          Fill in what shoppers should see. You can leave optional sections blank.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Basics</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="productName">Product name</Label>
            <Input
              id="productName"
              required
              placeholder="Thompson Blow Back Trigger Gen II"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (isNew) setId(slugify(e.target.value));
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="productCategory">Shop category</Label>
            <select
              id="productCategory"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value as "thompson" | "apparel")}
            >
              <option value="thompson">Thompson parts</option>
              <option value="apparel">Apparel & accessories</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="productPrice">Price (USD)</Label>
            <Input id="productPrice" type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="productQty">Quantity in stock</Label>
            <Input id="productQty" type="number" min="0" value={quantityOnHand} onChange={(e) => setQuantityOnHand(e.target.value)} />
            <p className="text-xs text-muted-foreground">Set to 0 to show as sold out. Sales subtract from this number.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="productSort">Order on the shop</Label>
            <Input id="productSort" type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
            <p className="text-xs text-muted-foreground">Lower numbers appear first. 10, 20, 30 is a good pattern.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="stockLabel">Sold-out message (optional)</Label>
            <Input
              id="stockLabel"
              placeholder="Temporarily Out of Stock"
              value={stockStatusLabel}
              onChange={(e) => setStockStatusLabel(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notice">Banner on the product page (optional)</Label>
            <Input
              id="notice"
              placeholder="Bolt Bounce Solved"
              value={importantNotice}
              onChange={(e) => setImportantNotice(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Descriptions</h3>
        <div className="space-y-2">
          <Label htmlFor="shortDesc">Short description</Label>
          <p className="text-xs text-muted-foreground">One or two sentences for shop cards.</p>
          <Textarea id="shortDesc" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="longDesc">Full description</Label>
          <p className="text-xs text-muted-foreground">The main write-up on the product page.</p>
          <Textarea
            id="longDesc"
            className="min-h-[140px]"
            value={detailedDescription}
            onChange={(e) => setDetailedDescription(e.target.value)}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Bullet points</h3>
        <p className="text-sm text-muted-foreground">
          Each box is one bullet on the product page. Click add for another. Leave a box empty to skip it.
        </p>
        <LineList
          label="Features"
          hint="What to highlight (materials, shipping, made in USA)."
          items={features}
          onChange={setFeatures}
          addLabel="Add a feature"
        />
        <LineList
          label="Works with"
          hint="Guns or products this fits. Skip if it does not apply."
          items={compatibleWith}
          onChange={setCompatibleWith}
          addLabel="Add a fitment"
        />
        <LineList
          label="Usage notes"
          hint="Warnings or how to use it. Skip if you do not need any."
          items={usageNotes}
          onChange={setUsageNotes}
          addLabel="Add a note"
        />
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Specifications</h3>
        <p className="text-sm text-muted-foreground">
          Optional details like Platform or Material. Left box is the label, right box is the value.
        </p>
        {specs.map((row, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="Label (example: Material)"
              value={row.label}
              onChange={(e) =>
                setSpecs((current) =>
                  current.map((item, i) => (i === index ? { ...item, label: e.target.value } : item))
                )
              }
            />
            <Input
              placeholder="Value (example: Steel)"
              value={row.value}
              onChange={(e) =>
                setSpecs((current) =>
                  current.map((item, i) => (i === index ? { ...item, value: e.target.value } : item))
                )
              }
            />
            <button
              type="button"
              className="text-sm text-red-400 shrink-0"
              onClick={() => setSpecs((current) => current.filter((_, i) => i !== index))}
            >
              Remove
            </button>
          </div>
        ))}
        <TacticalButton
          type="button"
          variant="secondary"
          onClick={() => setSpecs((current) => [...current, { label: "", value: "" }])}
        >
          Add a spec
        </TacticalButton>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Photos</h3>
        <p className="text-sm text-muted-foreground">
          First photo is the shop thumbnail. Use Move up / Move down to reorder.
        </p>
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="flex flex-col sm:flex-row gap-3 border border-tactical-green-dim/30 rounded p-3"
          >
            {image.src && (
              <img src={image.src} alt="" className="w-24 h-24 object-cover rounded bg-white" />
            )}
            <div className="flex-1 space-y-2">
              <Label>Alt text</Label>
              <p className="text-xs text-muted-foreground">
                A short description of what is in the photo (for screen readers and if the image does not load). Example:
                “Trigger kit laid out on a table.”
              </p>
              <Input
                placeholder="What this photo shows"
                value={image.alt}
                onChange={(e) =>
                  setImages((current) =>
                    current.map((item, i) => (i === index ? { ...item, alt: e.target.value } : item))
                  )
                }
              />
            </div>
            <div className="flex sm:flex-col gap-2 justify-end">
              <button
                type="button"
                className="text-sm text-tactical-green"
                onClick={() =>
                  setImages((current) => {
                    if (index === 0) return current;
                    const copy = [...current];
                    [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
                    return copy;
                  })
                }
              >
                Move up
              </button>
              <button
                type="button"
                className="text-sm text-tactical-green"
                onClick={() =>
                  setImages((current) => {
                    if (index >= current.length - 1) return current;
                    const copy = [...current];
                    [copy[index + 1], copy[index]] = [copy[index], copy[index + 1]];
                    return copy;
                  })
                }
              >
                Move down
              </button>
              <button
                type="button"
                className="text-sm text-red-400"
                onClick={() => setImages((current) => current.filter((_, i) => i !== index))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="space-y-2">
          <Label htmlFor="photoUpload">Add photos</Label>
          <Input
            id="photoUpload"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Visibility</h3>
        <label className="flex items-start gap-3">
          <Switch checked={isPublished} onCheckedChange={setIsPublished} />
          <span>
            <span className="block font-medium">Show in the shop</span>
            <span className="text-xs text-muted-foreground">Off = hidden from customers, still saved here.</span>
          </span>
        </label>
        <label className="flex items-start gap-3">
          <Switch checked={featured} onCheckedChange={setFeatured} />
          <span>
            <span className="block font-medium">Feature on the homepage</span>
            <span className="text-xs text-muted-foreground">Use for products you want on the home page cards.</span>
          </span>
        </label>
        <label className="flex items-start gap-3">
          <Switch checked={contactOnly} onCheckedChange={setContactOnly} />
          <span>
            <span className="block font-medium">Contact to buy (no checkout)</span>
            <span className="text-xs text-muted-foreground">For custom builds like the Annihilator.</span>
          </span>
        </label>
        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="mfr">Manufacturer</Label>
            <Input id="mfr" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pdf">PDF link (optional)</Label>
            <p className="text-xs text-muted-foreground">Only if this product has a downloadable proposal or guide.</p>
            <Input id="pdf" placeholder="/some-file.pdf" value={buildProposalPdf} onChange={(e) => setBuildProposalPdf(e.target.value)} />
          </div>
        </div>
      </section>

      <div className="flex gap-3">
        <TacticalButton type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save product"}
        </TacticalButton>
        <TacticalButton type="button" variant="secondary" onClick={() => navigate("/admin/products")}>
          Cancel
        </TacticalButton>
      </div>
    </form>
  );
};

function LineList({
  label,
  hint,
  items,
  onChange,
  addLabel,
}: {
  label: string;
  hint: string;
  items: string[];
  onChange: (items: string[]) => void;
  addLabel: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <p className="text-xs text-muted-foreground">{hint}</p>
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={item}
            onChange={(e) =>
              onChange(items.map((current, i) => (i === index ? e.target.value : current)))
            }
          />
          <button
            type="button"
            className="text-sm text-red-400 shrink-0"
            onClick={() => onChange(items.filter((_, i) => i !== index))}
          >
            Remove
          </button>
        </div>
      ))}
      <TacticalButton type="button" variant="secondary" onClick={() => onChange([...items, ""])}>
        {addLabel}
      </TacticalButton>
    </div>
  );
}

export default AdminProductEdit;
