'use client';

import React from 'react';
import { cn } from '@utils/cn';
import { useGame } from '../hooks/useGameContext';
import { Button } from './Button';

export type HintWidgetProps = {
  /** Ordered list of hints */
  hints: string[];
  /** Called whenever a hint is revealed */
  onReveal?: (hint: string, index: number) => void;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Widget displaying sequential gameplay hints.
 *
 * Revealed hints are added to the game provider clues.
 */
export function HintWidget({
  hints,
  onReveal,
  className,
  ...props
}: HintWidgetProps) {
  const { addClue } = useGame();
  const [index, setIndex] = React.useState<number | null>(null);

  const handleReveal = () => {
    const next = index === null ? 0 : index + 1;
    if (next >= hints.length) return;
    setIndex(next);
    const hint = hints[next];
    addClue(hint);
    onReveal?.(hint, next);
  };

  const showButton = index === null || index < hints.length - 1;
  return (
    <div {...props} className={cn('space-y-2', className)}>
      {index !== null && (
        <p aria-live="polite" aria-atomic="true" className="text-sm">
          {hints[index]}
        </p>
      )}
      {showButton && <Button label="Show hint 💡" onClick={handleReveal} />}
    </div>
  );
}
