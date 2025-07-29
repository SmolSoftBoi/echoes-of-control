import { describe, expect, it } from 'vitest';
import { createStateMachine } from '../state-machine';

describe('createStateMachine', () => {
  it('transitions through states', () => {
    const machine = createStateMachine({
      initial: 'idle',
      transitions: {
        idle: { start: 'running' },
        running: { finish: 'finished' },
        finished: { reset: 'idle' },
      },
    });

    expect(machine.state).toBe('idle');
    machine.send('start');
    expect(machine.state).toBe('running');
    machine.send('finish');
    expect(machine.state).toBe('finished');
    machine.send('reset');
    expect(machine.state).toBe('idle');
  });

  it('checks event validity', () => {
    const machine = createStateMachine({
      initial: 'a',
      transitions: { a: { go: 'b' }, b: {} },
    });

    expect(machine.can('go')).toBe(true);
    machine.send('go');
    expect(machine.can('go')).toBe(false);
  });
});
