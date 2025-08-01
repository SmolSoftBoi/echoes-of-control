'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { StoryRunner } from '@utils/story-runner';
import { createStoryRunner } from '@utils/story-runner';

export interface UseStoryClientReturn<TInput, TOutput> {
  /** Current value from the story. */
  current?: TOutput;
  /** Whether the story has finished. */
  done: boolean;
  /** Advance the story by one step. */
  step: (input?: TInput) => void;
  /** Reset the story to the beginning. */
  reset: () => void;
}

/**
 * React hook for running generator-based stories on the client.
 *
 * Provides the current value and helper methods to step through or
 * reset the story. The hook recreates the runner when the factory
 * reference changes.
 *
 * @param factory - Function returning a story generator.
 * @returns Control functions and current story state.
 */
export function useStoryClient<TInput = unknown, TOutput = unknown>(
  factory: () => Generator<TOutput, void, TInput>,
): UseStoryClientReturn<TInput, TOutput> {
  const runnerRef = useRef<StoryRunner<TInput, TOutput> | null>(null);
  const [current, setCurrent] = useState<TOutput>();
  const [done, setDone] = useState(false);

  useEffect(() => {
    runnerRef.current = createStoryRunner(factory);
    setCurrent(undefined);
    setDone(false);
  }, [factory]);

  const step = useCallback((input?: TInput) => {
    const result = runnerRef.current?.step(input);
    if (!result) return;

    if (result.done) {
      setCurrent(undefined);
      setDone(true);
      return;
    }

    setCurrent(result.value);
  }, []);

  const reset = useCallback(() => {
    runnerRef.current?.reset();
    setCurrent(undefined);
    setDone(false);
  }, []);

  return { current, done, step, reset };
}
