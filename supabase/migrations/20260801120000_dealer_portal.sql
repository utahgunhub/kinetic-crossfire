-- Dealer portal: admin allowlist, invites, profiles

create extension if not exists "pgcrypto";

-- Admin emails allowed to use /admin
create table public.admin_allowlist (
  email text primary key,
  created_at timestamptz not null default now()
);

-- Normalize email helper
create or replace function public.normalize_email(input text)
returns text
language sql
immutable
as $$
  select lower(trim(input));
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_allowlist a
    where a.email = public.normalize_email(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- Dealer invite gate (admin adds email after reviewing EmailJS application)
create table public.dealer_invites (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status text not null default 'invited'
    check (status in ('invited', 'registered', 'revoked')),
  invited_at timestamptz not null default now(),
  registered_at timestamptz,
  invited_by uuid references auth.users (id)
);

create index dealer_invites_email_idx on public.dealer_invites (email);
create index dealer_invites_status_idx on public.dealer_invites (status);

create table public.dealer_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  business_name text,
  created_at timestamptz not null default now()
);

create index dealer_profiles_email_idx on public.dealer_profiles (email);

alter table public.admin_allowlist enable row level security;
alter table public.dealer_invites enable row level security;
alter table public.dealer_profiles enable row level security;

-- Admins can read allowlist (to verify own access)
create policy "Admins read admin_allowlist"
  on public.admin_allowlist for select
  to authenticated
  using (public.is_admin());

-- dealer_invites: admins full manage
create policy "Admins select dealer_invites"
  on public.dealer_invites for select
  to authenticated
  using (public.is_admin());

create policy "Admins insert dealer_invites"
  on public.dealer_invites for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins update dealer_invites"
  on public.dealer_invites for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Invited users can read their own invite row (for signup UX)
create policy "Users read own invite by email"
  on public.dealer_invites for select
  to authenticated
  using (
    public.normalize_email(email) = public.normalize_email(coalesce(auth.jwt() ->> 'email', ''))
  );

-- dealer_profiles
create policy "Dealers read own profile"
  on public.dealer_profiles for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Admins read all dealer_profiles"
  on public.dealer_profiles for select
  to authenticated
  using (public.is_admin());

-- Dealers can insert own profile only when invite exists (enforced in app/server too)
create policy "Dealers insert own profile"
  on public.dealer_profiles for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Admins update dealer_invites on registration"
  on public.dealer_invites for update
  to authenticated
  using (
    public.is_admin()
    or public.normalize_email(email) = public.normalize_email(coalesce(auth.jwt() ->> 'email', ''))
  );

-- RPC: check if current user is admin (for client)
create or replace function public.check_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_admin();
$$;

grant execute on function public.check_is_admin() to authenticated;

-- RPC: check if current user has active dealer profile
create or replace function public.check_is_dealer()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.dealer_profiles p where p.user_id = auth.uid()
  );
$$;

grant execute on function public.check_is_dealer() to authenticated;

-- Seed: replace with your KXF admin email(s) before running in production
insert into public.admin_allowlist (email)
values ('admin@kinetic-crossfire.com')
on conflict (email) do nothing;
