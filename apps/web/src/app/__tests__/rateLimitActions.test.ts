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
});
