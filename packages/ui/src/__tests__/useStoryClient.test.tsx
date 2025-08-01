import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { useStoryClient } from '../hooks/useStoryClient';

function* demoStory() {
  const name: string = yield 'ask-name';
  yield `hello-${name}`;
}

describe('useStoryClient', () => {
  it('steps through a story', () => {
    const { result } = renderHook(() => useStoryClient(demoStory));

    act(() => {
      result.current.step();
    });
    expect(result.current.current).toBe('ask-name');
    expect(result.current.done).toBe(false);

    act(() => {
      result.current.step('sam');
    });
    expect(result.current.current).toBe('hello-sam');
    expect(result.current.done).toBe(false);

    act(() => {
      result.current.step();
    });
    expect(result.current.current).toBeUndefined();
    expect(result.current.done).toBe(true);

    act(() => {
      result.current.reset();
    });
    expect(result.current.current).toBeUndefined();
    expect(result.current.done).toBe(false);
  });
});
