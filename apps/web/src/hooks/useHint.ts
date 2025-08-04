'use client';

import { useCallback, useState } from 'react';
import { useGame } from '@ui/hooks/useGameContext';
import { generateHint } from '../app/_actions/hint';

/**
 * Hook for generating and storing puzzle hints.
 *
 * Provides a `fetchHint` function that retrieves a hint for the current puzzle
 * and adds it to the game clues. It exposes a `pending` flag while the request
 * is in flight.
 *
 * @returns Hint helpers.
 */
export function useHint() {
  const { status, addClue } = useGame();
  const [pending, setPending] = useState(false);

  const fetchHint = useCallback(async () => {
    if (pending) return;
    setPending(true);
    try {
      const hint = await generateHint(status);
      addClue(hint);
    } finally {
      setPending(false);
    }
  }, [pending, status, addClue]);

  return { fetchHint, pending };
}

