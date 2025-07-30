-- Migration: Create game table
-- Creates a table to persist game sessions.

create extension if not exists "uuid-ossp";

create table if not exists public.game (
  id uuid primary key default uuid_generate_v4(),
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  state jsonb not null default '{}'::jsonb
);

create or replace function public.update_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger game_update_timestamp
before update on public.game
for each row
execute procedure public.update_timestamp();
