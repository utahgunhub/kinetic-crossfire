-- Admin CMS: locator dealers, products, coupons, product image storage

create table public.map_dealers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  city text,
  state text,
  zip text,
  phone text,
  website text,
  lat double precision,
  lng double precision,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index map_dealers_published_idx on public.map_dealers (is_published, sort_order);

create table public.products (
  id text primary key,
  name text not null,
  category text not null check (category in ('thompson', 'apparel')),
  price numeric(10, 2) not null default 0,
  description text not null default '',
  detailed_description text not null default '',
  features jsonb not null default '[]'::jsonb,
  compatibility jsonb,
  specifications jsonb,
  manufacturer text,
  is_kinetic_crossfire_product boolean not null default true,
  quantity_on_hand integer not null default 0,
  stock_status_label text,
  important_notice text,
  contact_only boolean not null default false,
  build_proposal_pdf text,
  sort_order integer not null default 0,
  featured boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_published_sort_idx on public.products (is_published, sort_order);
create index products_category_idx on public.products (category);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id text not null references public.products (id) on delete cascade,
  src text not null,
  alt text not null default '',
  object_position text,
  sort_order integer not null default 0
);

create index product_images_product_idx on public.product_images (product_id, sort_order);

create table public.coupons (
  code text primary key,
  type text not null check (type in ('percent', 'fixed')),
  value numeric(10, 2) not null,
  is_active boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  min_subtotal numeric(10, 2),
  max_redemptions integer,
  redemption_count integer not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger map_dealers_updated_at
  before update on public.map_dealers
  for each row execute procedure public.set_updated_at();

create trigger products_updated_at
  before update on public.products
  for each row execute procedure public.set_updated_at();

create trigger coupons_updated_at
  before update on public.coupons
  for each row execute procedure public.set_updated_at();

alter table public.map_dealers enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.coupons enable row level security;

create policy "Public read published map_dealers"
  on public.map_dealers for select
  using (is_published = true);

create policy "Admins select map_dealers"
  on public.map_dealers for select
  to authenticated
  using (public.is_admin());

create policy "Admins insert map_dealers"
  on public.map_dealers for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins update map_dealers"
  on public.map_dealers for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins delete map_dealers"
  on public.map_dealers for delete
  to authenticated
  using (public.is_admin());

create policy "Public read published products"
  on public.products for select
  using (is_published = true);

create policy "Admins select products"
  on public.products for select
  to authenticated
  using (public.is_admin());

create policy "Admins insert products"
  on public.products for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins update products"
  on public.products for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins delete products"
  on public.products for delete
  to authenticated
  using (public.is_admin());

create policy "Public read images of published products"
  on public.product_images for select
  using (
    exists (
      select 1 from public.products p
      where p.id = product_images.product_id and p.is_published = true
    )
  );

create policy "Admins select product_images"
  on public.product_images for select
  to authenticated
  using (public.is_admin());

create policy "Admins insert product_images"
  on public.product_images for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins update product_images"
  on public.product_images for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins delete product_images"
  on public.product_images for delete
  to authenticated
  using (public.is_admin());

create policy "Admins select coupons"
  on public.coupons for select
  to authenticated
  using (public.is_admin());

create policy "Admins insert coupons"
  on public.coupons for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins update coupons"
  on public.coupons for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins delete coupons"
  on public.coupons for delete
  to authenticated
  using (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  104857600,
  array['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']
)
on conflict (id) do nothing;

create policy "Public read product-images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Admins insert product-images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images' and public.is_admin());

create policy "Admins update product-images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images' and public.is_admin());

create policy "Admins delete product-images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images' and public.is_admin());

insert into public.coupons (code, type, value, is_active, notes)
values
  ('KXFVETS2026', 'percent', 15, true, 'Veterans discount'),
  ('KXFCOPS2026', 'percent', 15, true, 'First responders discount')
on conflict (code) do nothing;
