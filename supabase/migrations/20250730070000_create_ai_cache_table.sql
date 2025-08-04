-- Migration: Create ai_cache table
-- Stores AI responses for reuse.

create extension if not exists "uuid-ossp";

create table if not exists public.ai_cache (
  id uuid primary key default uuid_generate_v4(),
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  expires_at timestamptz not null,
  cache_key text not null,
  value jsonb not null default '{}'::jsonb
);

create index ai_cache_expires_at_idx
  on public.ai_cache (expires_at);

create trigger ai_cache_update_timestamp
  before update on public.ai_cache
  for each row
  execute procedure public.update_timestamp();
