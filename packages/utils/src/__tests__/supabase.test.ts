import { vi } from 'vitest';
import { createClient } from '@supabase/supabase-js';
import { createSupabaseClient } from '../supabase';

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({ url: 'mock', key: 'mock' })),
}));

describe('createSupabaseClient', () => {
  it('initialises the client with env vars', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://db.test';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'key';

    createSupabaseClient();

    expect(createClient).toHaveBeenCalledWith('https://db.test', 'key');
  });

  it('throws when env vars are missing', () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    expect(() => createSupabaseClient()).toThrow('Supabase credentials are missing');
  });
});
