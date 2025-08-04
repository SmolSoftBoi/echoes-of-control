-- Migration: Enable row-level security for ai_cache table

alter table if exists public.ai_cache
  add column if not exists user_id uuid references auth.users(id);

alter table public.ai_cache
  alter column user_id set default auth.uid(),
  alter column user_id set not null;

alter table public.ai_cache
  add constraint ai_cache_user_key_unique unique (user_id, cache_key);

alter table public.ai_cache
  enable row level security;

create policy "Users can access their own cache entries" on public.ai_cache
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
