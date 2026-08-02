import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import type { Storylet } from '@utils/storylet-engine';
import { useStorylet } from '../hooks/useStorylet';

interface State {
  readonly flag: boolean;
}

type Id = 'a' | 'b';

const storylets: ReadonlyArray<Storylet<State, Id>> = [
  { id: 'a', when: (s) => s.flag },
  { id: 'b' },
];

describe('useStorylet', () => {
  it('selects available storylets by state', () => {
    const random = () => 0; // always pick first available

    const { result, rerender } = renderHook(
      ({ flag }) => useStorylet({ storylets, random }, { flag }),
      { initialProps: { flag: true } },
    );

    expect(result.current.available.map((s) => s.id)).toEqual(['a', 'b']);

    act(() => {
      result.current.roll();
    });
    expect(result.current.current?.id).toBe('a');

    rerender({ flag: false });
    expect(result.current.available.map((s) => s.id)).toEqual(['b']);

    act(() => {
      result.current.roll();
    });
    expect(result.current.current?.id).toBe('b');
  });
});

