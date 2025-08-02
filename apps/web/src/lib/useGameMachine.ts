'use client';

import { useRef, useState } from 'react';
import { createStateMachine } from '@utils/state-machine';

/**
 * Manage the game state machine used by {@link GameClient}.
 */
export function useGameMachine() {
  type S = 'intro' | 'playing' | 'completed';
  type E = 'start' | 'finish' | 'reset';

  const machineRef = useRef(
    createStateMachine<S, E>({
      initial: 'intro',
      transitions: {
        intro: { start: 'playing' },
        playing: { finish: 'completed' },
        completed: { reset: 'intro' },
      },
    }),
  );

  const [state, setState] = useState<S>(machineRef.current.state);
  const [path, setPath] = useState<'a' | 'b' | null>(null);

  const send = (event: E) => setState(machineRef.current.send(event));

  const start = () => {
    send('start');
    setPath(null);
  };

  const finish = () => send('finish');

  const reset = () => {
    send('reset');
    setPath(null);
  };

  const choosePath = (p: 'a' | 'b') => setPath(p);

  return { state, path, start, finish, reset, choosePath };
}
