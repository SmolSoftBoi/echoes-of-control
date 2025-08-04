'use server';

interface RateLimitOptions {
  /** Time window in milliseconds. */
  windowMs?: number;
  /** Maximum allowed requests per window. */
  limit?: number;
}

interface StoreEntry {
  timestamps: number[];
  timeout?: ReturnType<typeof setTimeout>;
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
  const entry = store.get(key) ?? { timestamps: [] };
  const recent = entry.timestamps.filter((t) => now - t < windowMs);
  if (recent.length >= limit) return false;
  recent.push(now);
  entry.timestamps = recent;
  if (entry.timeout) clearTimeout(entry.timeout);
  entry.timeout = setTimeout(() => {
    store.delete(key);
  }, windowMs);
  entry.timeout.unref?.();
  store.set(key, entry);
  return true;
}

const store = new Map<string, StoreEntry>();
