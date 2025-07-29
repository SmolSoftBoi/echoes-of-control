'use client';

import React, { useRef, useState } from 'react';
import { Button } from '@ui/components/Button';
import { cn } from '@utils/cn';
import { createStateMachine } from '@utils/state-machine';

/**
 * Interactive client component controlling basic game flow.
 *
 * Uses a ref-based state machine to avoid React Strict Mode
 * double-initialisation issues.
 */
export type GameClientProps = React.HTMLAttributes<HTMLElement>;

export function GameClient({ className, ...props }: GameClientProps) {
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

  const handle = (event: E) => {
    setState(machineRef.current.send(event));
  };

  return (
    <section
      className={cn('flex flex-col items-center gap-4 py-8', className)}
      {...props}
    >
      {state === 'intro' && <p>Press start to play 🎮</p>}
      {state === 'playing' && <p>Playing…</p>}
      {state === 'completed' && <p>Game over 🎉</p>}
      <div>
        {state === 'intro' && (
          <Button label="Start" onClick={() => handle('start')} />
        )}
        {state === 'playing' && (
          <Button label="Finish" onClick={() => handle('finish')} />
        )}
        {state === 'completed' && (
          <Button label="Reset" onClick={() => handle('reset')} />
        )}
      </div>
    </section>
  );
}
