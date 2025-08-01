import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { GameProvider, useGame } from '../hooks/useGameContext';

function wrapper({ children }: { children: React.ReactNode }) {
  return <GameProvider>{children}</GameProvider>;
}

describe('GameContext', () => {
  it('provides status and clue management', () => {
    const { result } = renderHook(() => useGame(), { wrapper });

    expect(result.current.status).toBe('Idle');
    expect(result.current.clues).toEqual([]);

    act(() => {
      result.current.setStatus('Exploring');
      result.current.addClue('Note');
    });
    expect(result.current.status).toBe('Exploring');
    expect(result.current.clues).toEqual(['Note']);

    act(() => {
      result.current.reset();
    });
    expect(result.current.status).toBe('Idle');
    expect(result.current.clues).toEqual([]);
  });
});
