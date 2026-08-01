-- Auto-confirm auth users who sign up with an active dealer invite (no email confirmation step).

create or replace function public.auto_confirm_invited_dealer_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if exists (
    select 1
    from public.dealer_invites di
    where di.email = public.normalize_email(new.email)
      and di.status = 'invited'
  ) then
    new.email_confirmed_at := coalesce(
      new.email_confirmed_at,
      timezone('utc', now())
    );
    new.confirmed_at := coalesce(new.confirmed_at, timezone('utc', now()));
  end if;

  return new;
end;
$$;

drop trigger if exists auto_confirm_invited_dealer_user on auth.users;

create trigger auto_confirm_invited_dealer_user
  before insert on auth.users
  for each row
  execute function public.auto_confirm_invited_dealer_user();
