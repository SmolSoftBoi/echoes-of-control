'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@ui/components/Button';
import { ChoiceButton } from '@ui/components/ChoiceButton';
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
  const [path, setPath] = useState<'a' | 'b' | null>(null);
  const messages: Record<S, string> = {
    intro: "Press 'Start game' to begin 🎮",
    playing: 'Game in progress…',
    completed: 'Game over 🎉',
  };
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    buttonRef.current?.focus();
  }, [state]);

  const handle = (event: E) => {
    setState(machineRef.current.send(event));
    if (event === 'reset' || event === 'start') {
      setPath(null);
    }
  };

  return (
    <section
      role="region"
      className={cn('flex flex-col items-center gap-4 py-8', className)}
      {...props}
    >
      <p aria-live="polite" aria-atomic="true">
        {state === 'playing' && path
          ? `Path ${path.toUpperCase()} selected`
          : messages[state]}
      </p>
      <div>
        {state === 'intro' && (
          <Button
            ref={buttonRef}
            autoFocus
            label="Start game"
            onClick={() => handle('start')}
          />
        )}
        {state === 'playing' && (
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              <ChoiceButton
                label="Path A"
                selected={path === 'a'}
                onSelect={() => setPath('a')}
                aria-label="Choose path A"
              />
              <ChoiceButton
                label="Path B"
                selected={path === 'b'}
                onSelect={() => setPath('b')}
                aria-label="Choose path B"
              />
            </div>
            <Button
              ref={buttonRef}
              autoFocus
              label="Finish game"
              onClick={() => handle('finish')}
            />
          </div>
        )}
        {state === 'completed' && (
          <Button
            ref={buttonRef}
            autoFocus
            label="Reset game"
            onClick={() => handle('reset')}
          />
        )}
      </div>
    </section>
  );
}
