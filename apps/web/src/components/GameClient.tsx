'use client';

import React, { useEffect, useRef } from 'react';
import { Button } from '@ui/components/Button';
import { ChoiceButton } from '@ui/components/ChoiceButton';
import { useGame } from '@ui/hooks/useGameContext';
import { cn } from '@utils/cn';
import { useGameMachine } from '@/lib/useGameMachine';

/**
 * Interactive client component controlling basic game flow.
 *
 * Relies on {@link useGameMachine} to handle game state.
 */
/** Props for the GameClient component. */
export type GameClientProps = React.HTMLAttributes<HTMLElement>;

export function GameClient({ className, ...props }: GameClientProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const {
    state,
    path,
    start,
    finish,
    reset: machineReset,
    choosePath: machineChoosePath,
  } = useGameMachine();
  const { setStatus, addClue, reset } = useGame();
  const messages: Record<typeof state, string> = {
    intro: "Press 'Start game' to begin 🎮",
    playing: 'Game in progress…',
    completed: 'Game over 🎉',
  };

  useEffect(() => {
    buttonRef.current?.focus();
  }, [state]);

  useEffect(() => {
    if (state === 'intro') {
      reset();
      return;
    }
    if (state === 'playing') {
      setStatus('Game in progress…');
      return;
    }
    setStatus('Game over 🎉');
  }, [state, reset, setStatus]);

  const resetGame = () => {
    machineReset();
    reset();
  };

  const choosePath = (p: 'a' | 'b') => {
    addClue(`Path ${p.toUpperCase()} selected`);
    machineChoosePath(p);
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
            onClick={start}
          />
        )}
        {state === 'playing' && (
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              <ChoiceButton
                label="Path A"
                selected={path === 'a'}
                onSelect={() => choosePath('a')}
                aria-label="Choose path A"
              />
              <ChoiceButton
                label="Path B"
                selected={path === 'b'}
                onSelect={() => choosePath('b')}
                aria-label="Choose path B"
              />
            </div>
            <Button
              ref={buttonRef}
              autoFocus
            label="Finish game"
            onClick={finish}
          />
        </div>
      )}
        {state === 'completed' && (
          <Button
            ref={buttonRef}
            autoFocus
            label="Reset game"
            onClick={resetGame}
          />
        )}
      </div>
    </section>
  );
}
