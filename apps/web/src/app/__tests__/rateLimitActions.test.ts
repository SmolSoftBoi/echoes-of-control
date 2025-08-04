import { beforeEach, describe, expect, it, vi } from 'vitest';

import { rateLimit } from '../_actions/rate-limit';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('rate limit action', () => {
  it('allows up to limit then blocks', async () => {
    const key = 'user';
    for (let i = 0; i < 5; i++) {
      const allowed = await rateLimit(key);
      expect(allowed).toBe(true);
    }
    const blocked = await rateLimit(key);
    expect(blocked).toBe(false);
  });

  it('resets after the window', async () => {
    vi.useFakeTimers();
    const key = 'reset';
    const allowed = await rateLimit(key, { windowMs: 100, limit: 1 });
    expect(allowed).toBe(true);
    const blocked = await rateLimit(key, { windowMs: 100, limit: 1 });
    expect(blocked).toBe(false);
    vi.advanceTimersByTime(100);
    const allowedAgain = await rateLimit(key, { windowMs: 100, limit: 1 });
    expect(allowedAgain).toBe(true);
    vi.useRealTimers();
  });

  it('clamps window to one hour', async () => {
    vi.useFakeTimers();
    const HOUR = 3_600_000;
    const key = 'clamp';
    const options = { windowMs: HOUR * 2, limit: 1 } as const;
    expect(await rateLimit(key, options)).toBe(true);
    expect(await rateLimit(key, options)).toBe(false);
    vi.advanceTimersByTime(HOUR);
    expect(await rateLimit(key, options)).toBe(true);
    vi.useRealTimers();
  });
});
