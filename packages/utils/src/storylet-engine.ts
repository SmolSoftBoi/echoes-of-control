/**
 * Lightweight engine to pick the next storylet.
 */

export interface Storylet<TState, TId extends string> {
  /** Unique identifier. */
  readonly id: TId;
  /** Selection weight. Defaults to 1. */
  readonly weight?: number;
  /** Availability predicate. */
  readonly when?: (state: TState) => boolean;
}

export interface StoryletEngineConfig<TState, TId extends string> {
  /** Pool of storylets to evaluate. */
  readonly storylets: ReadonlyArray<Storylet<TState, TId>>;
  /** Source of randomness. */
  readonly random?: () => number;
}

export interface StoryletEngine<TState, TId extends string> {
  /** List storylets available for the given state. */
  available(state: TState): Storylet<TState, TId>[];
  /** Select one storylet using weighted randomness. */
  select(state: TState): Storylet<TState, TId> | undefined;
}

/**
 * Create a storylet engine.
 *
 * @param config - Engine configuration.
 * @returns Engine API.
 */
export function createStoryletEngine<
  TState,
  TId extends string,
>(config: StoryletEngineConfig<TState, TId>): StoryletEngine<TState, TId> {
  const { storylets, random = Math.random } = config;

  const available = (state: TState): Storylet<TState, TId>[] =>
    storylets.filter((s) => (s.when ? s.when(state) : true));

  const select = (state: TState): Storylet<TState, TId> | undefined => {
    const pool = available(state);
    if (pool.length === 0) {
      return undefined;
    }

    const total = pool.reduce((sum, s) => sum + (s.weight ?? 1), 0);
    let roll = random() * total;
    for (const s of pool) {
      roll -= s.weight ?? 1;
      if (roll < 0) {
        return s;
      }
    }
    return pool[pool.length - 1];
  };

  return { available, select };
}

