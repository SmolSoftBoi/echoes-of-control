'use client';

import { useCallback, useMemo, useState } from 'react';
import type { Storylet, StoryletEngineConfig } from '@utils/storylet-engine';
import { createStoryletEngine } from '@utils/storylet-engine';

export interface UseStoryletReturn<TState, TId extends string> {
  /** List of currently available storylets. */
  readonly available: Storylet<TState, TId>[];
  /** Currently selected storylet. */
  readonly current?: Storylet<TState, TId>;
  /** Select a new storylet using weighted randomness. */
  readonly roll: () => void;
}

/**
 * React hook to evaluate and select storylets based on state.
 *
 * @param config - Engine configuration.
 * @param state - Current world state used to evaluate availability.
 * @returns List of available storylets, current selection, and roll helper.
 */
export function useStorylet<TState, TId extends string>(
  config: StoryletEngineConfig<TState, TId>,
  state: TState,
): UseStoryletReturn<TState, TId> {
  const engine = useMemo(
    () => createStoryletEngine(config),
    [config],
  );
  const available = useMemo(() => engine.available(state), [engine, state]);
  const [current, setCurrent] = useState<Storylet<TState, TId>>();

  const roll = useCallback(() => {
    setCurrent(engine.select(state));
  }, [engine, state]);

  return { available, current, roll };
}

