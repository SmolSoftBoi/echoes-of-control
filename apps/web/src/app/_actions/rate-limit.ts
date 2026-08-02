'use server';

interface RateLimitOptions {
  /**
   * Time window in milliseconds.
   * Clamped between 1 ms and {@link MAX_WINDOW_MS}.
   */
  windowMs?: number;
  /** Maximum allowed requests per window. Must be positive. */
  limit?: number;
}

interface StoreEntry {
  timestamps: number[];
  timeout?: ReturnType<typeof setTimeout>;
}

const MAX_WINDOW_MS = 3_600_000; // 1 hour

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
  const safeWindowMs = Math.max(1, Math.min(windowMs, MAX_WINDOW_MS));
  const safeLimit = Math.max(1, limit);
  const now = Date.now();
  const entry = store.get(key) ?? { timestamps: [] };
  const recent = entry.timestamps.filter((t) => now - t < safeWindowMs);
  if (recent.length >= safeLimit) return false;
  recent.push(now);
  entry.timestamps = recent;
  if (entry.timeout) clearTimeout(entry.timeout);
  entry.timeout = setTimeout(() => {
    store.delete(key);
  }, safeWindowMs);
  entry.timeout.unref?.();
  store.set(key, entry);
  return true;
}

const store = new Map<string, StoreEntry>();
