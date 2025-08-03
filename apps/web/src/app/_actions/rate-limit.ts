'use server';

interface RateLimitOptions {
  /** Time window in milliseconds. */
  windowMs?: number;
  /** Maximum allowed requests per window. */
  limit?: number;
}

/**
 * Enforce a simple in-memory rate limit.
 *
 * @param key - Identifier such as user id or IP.
 * @param options - Configuration for limit and window.
 * @returns Whether the request is allowed.
 */
export async function rateLimit(
  key: string,
  { windowMs = 60_000, limit = 5 }: RateLimitOptions = {},
): Promise<boolean> {
  const now = Date.now();
  const hits = store.get(key) ?? [];
  const recent = hits.filter((t) => now - t < windowMs);
  if (recent.length >= limit) return false;
  recent.push(now);
  store.set(key, recent);
  return true;
}

const store = new Map<string, number[]>();
