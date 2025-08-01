import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

/**
 * Game context state and actions.
 */
export interface GameContextValue {
  /** Current status string. */
  status: string;
  /** Discovered clue texts. */
  clues: string[];
  /** Update the status string. */
  setStatus: (status: string) => void;
  /** Add a clue to the list. */
  addClue: (clue: string) => void;
  /** Reset status and clues to defaults. */
  reset: () => void;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

/**
 * Provider for {@link GameContext}.
 *
 * Initializes default values and exposes update helpers.
 */
export function GameProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatusState] = useState('Idle');
  const [clues, setClues] = useState<string[]>([]);

  const setStatus = useCallback((s: string) => {
    setStatusState(s);
  }, []);
  const addClue = useCallback((clue: string) => {
    setClues((prev) => [...prev, clue]);
  }, []);
  const reset = useCallback(() => {
    setStatusState('Idle');
    setClues([]);
  }, []);

  const value = useMemo(
    () => ({ status, clues, setStatus, addClue, reset }),
    [status, clues, setStatus, addClue, reset],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

/**
 * Access the current {@link GameContextValue}.
 *
 * @returns Context state and actions.
 */
export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
