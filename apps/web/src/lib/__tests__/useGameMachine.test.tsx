import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useGameMachine } from '../useGameMachine';

describe('useGameMachine', () => {
  it('handles state transitions and path selection', () => {
    const { result } = renderHook(() => useGameMachine());

    expect(result.current.state).toBe('intro');
    expect(result.current.path).toBeNull();

    act(() => {
      result.current.start();
    });
    expect(result.current.state).toBe('playing');
    expect(result.current.path).toBeNull();

    act(() => {
      result.current.choosePath('a');
    });
    expect(result.current.path).toBe('a');

    act(() => {
      result.current.finish();
    });
    expect(result.current.state).toBe('completed');

    act(() => {
      result.current.reset();
    });
    expect(result.current.state).toBe('intro');
    expect(result.current.path).toBeNull();
  });
});
