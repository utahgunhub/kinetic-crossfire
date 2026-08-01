-- Paste into Supabase → SQL Editor → Run (fixes "function ... not in schema cache")

create or replace function public.complete_dealer_registration()
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  user_email text;
  inv public.dealer_invites%rowtype;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  user_email := public.normalize_email(coalesce(auth.jwt() ->> 'email', ''));
  if user_email = '' then
    raise exception 'Email not found on account';
  end if;

  select * into inv
  from public.dealer_invites
  where email = user_email;

  if not found or inv.status = 'revoked' then
    raise exception 'No active dealer invitation for this email';
  end if;

  insert into public.dealer_profiles (user_id, email)
  values (auth.uid(), user_email)
  on conflict (user_id) do update
  set email = excluded.email;

  if inv.status = 'invited' then
    update public.dealer_invites
    set status = 'registered',
        registered_at = now()
    where id = inv.id;
  end if;

  return json_build_object('success', true);
end;
$$;

revoke all on function public.complete_dealer_registration() from public;
grant execute on function public.complete_dealer_registration() to authenticated;

notify pgrst, 'reload schema';
