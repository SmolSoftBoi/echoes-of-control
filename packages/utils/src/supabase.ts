import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import type { Database } from './database.types';

/**
 * Create a type-safe Supabase client.
 *
 * @returns A Supabase client instance.
 */
export function createSupabaseClient(): SupabaseClient<Database> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

  if (!url || !key) {
    throw new Error('Supabase credentials are missing');
  }

  return createClient<Database>(url, key);
}
