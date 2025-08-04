'use client';

import React, { useState } from 'react';
import { Button } from '@ui/components/Button';
import { useGame } from '@ui/hooks/useGameContext';
import { generateHint } from '../app/_actions/hint';

/** Props for {@link NeedHintButton}. */
export interface NeedHintButtonProps {
  /** Additional classes for positioning. */
  className?: string;
}

/**
 * Button that fetches a hint for the current puzzle and stores it as a clue.
 */
export function NeedHintButton({ className }: NeedHintButtonProps) {
  const { status, addClue } = useGame();
  const [pending, setPending] = useState(false);

  const onClick = async () => {
    if (pending) return;
    setPending(true);
    try {
      const hint = await generateHint(status);
      addClue(hint);
    } finally {
      setPending(false);
    }
  };

  return (
    <Button
      label={pending ? 'Fetching hint…' : 'Need a hint? 💡'}
      className={className}
      disabled={pending}
      onClick={onClick}
    />
  );
}
