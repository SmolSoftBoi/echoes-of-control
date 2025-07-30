'use server';

import { createSupabaseClient } from '@utils/supabase';
import type { Database } from '@utils/database.types';

export type GameRow = Database['public']['Tables']['game']['Row'];

/**
 * Persist a new game.
 *
 * @param name - Game name.
 * @returns Created game row.
 */
export async function createGame(name: string): Promise<GameRow> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('game')
    .insert({ name })
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return data as GameRow;
}

/**
 * Fetch a game by id.
 *
 * @param id - Game identifier.
 * @returns The requested game row.
 */
export async function getGame(id: string): Promise<GameRow> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('game')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data as GameRow;
}

/**
 * Update a game's state.
 *
 * @param id - Game identifier.
 * @param state - New state.
 */
export async function updateGameState(
  id: string,
  state: GameRow['state'],
): Promise<void> {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from('game')
    .update({ state })
    .eq('id', id);

  if (error) throw new Error(error.message);
}
