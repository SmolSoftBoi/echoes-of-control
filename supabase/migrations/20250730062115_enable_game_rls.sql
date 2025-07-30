-- Migration: Enable row-level security for game table

alter table if exists public.game
  add column if not exists user_id uuid references auth.users(id);

alter table public.game
  enable row level security;

create policy "Users can access their own games" on public.game
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
