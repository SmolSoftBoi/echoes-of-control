import { beforeEach, describe, expect, it, vi } from 'vitest';
const __mock = { from: vi.fn() };
vi.mock('@utils/supabase', () => ({ createSupabaseClient: () => ({ from: __mock.from }) }));
import { createGame, getGame, updateGameState } from "../_actions/game";


const mockGame = {
  id: '1',
  inserted_at: '',
  updated_at: '',
  name: 'Test',
  state: {},
  user_id: 'u',
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('game server actions', () => {
  it('creates a new game', async () => {
    const single = vi.fn().mockResolvedValue({ data: mockGame, error: null });
    const select = vi.fn(() => ({ single }));
    const insert = vi.fn(() => ({ select }));
    __mock.from.mockReturnValue({ insert });

    const result = await createGame('Test');

    expect(__mock.from).toHaveBeenCalledWith('game');
    expect(insert).toHaveBeenCalledWith({ name: 'Test' });
    expect(result).toEqual(mockGame);
  });

  it('retrieves a game by id', async () => {
    const single = vi.fn().mockResolvedValue({ data: mockGame, error: null });
    const eq = vi.fn(() => ({ single }));
    const select = vi.fn(() => ({ eq }));
    __mock.from.mockReturnValue({ select });

    const result = await getGame('1');

    expect(__mock.from).toHaveBeenCalledWith('game');
    expect(select).toHaveBeenCalledWith('*');
    expect(eq).toHaveBeenCalledWith('id', '1');
    expect(result).toEqual(mockGame);
  });

  it('updates game state', async () => {
    const eq = vi.fn().mockResolvedValue({ error: null });
    const update = vi.fn(() => ({ eq }));
    __mock.from.mockReturnValue({ update });

    await updateGameState('1', { foo: true });

    expect(__mock.from).toHaveBeenCalledWith('game');
    expect(update).toHaveBeenCalledWith({ state: { foo: true } });
    expect(eq).toHaveBeenCalledWith('id', '1');
  });
});
