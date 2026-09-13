-- =========================================================
--  GHOST X · SUPABASE (ejecutar UNA vez en: Supabase > SQL Editor)
--  Hace que el USUARIO funcione en cualquier navegador.
-- =========================================================

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique not null,
  email text
);

alter table public.profiles enable row level security;

grant select, insert, update on public.profiles to anon;

grant select, insert, update on public.profiles to authenticated;

create policy "leer perfiles" on public.profiles for select using (true);

create policy "crear perfil" on public.profiles for insert with check (auth.uid() = id);

-- Crea el perfil automaticamente cuando alguien se registra
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();