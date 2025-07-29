import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { useStateMachine } from '../use-state-machine';

const config = {
  initial: 'idle',
  transitions: {
    idle: { start: 'running' },
    running: { finish: 'done' },
    done: {},
  },
} as const;

describe('useStateMachine', () => {
  it('transitions and re-renders', () => {
    const { result } = renderHook(() => useStateMachine(config));

    expect(result.current.state).toBe('idle');
    act(() => {
      result.current.send('start');
    });
    expect(result.current.state).toBe('running');
    act(() => {
      result.current.send('finish');
    });
    expect(result.current.state).toBe('done');
  });

  it('checks if event is valid', () => {
    const { result } = renderHook(() => useStateMachine(config));

    expect(result.current.can('start')).toBe(true);
    act(() => {
      result.current.send('start');
    });
    expect(result.current.can('start')).toBe(false);
  });
});
