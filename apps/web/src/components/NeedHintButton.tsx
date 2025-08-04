'use client';

import React from 'react';
import { Button } from '@ui/components/Button';
import { useHint } from '../hooks/useHint';

/** Props for {@link NeedHintButton}. */
export interface NeedHintButtonProps {
  /** Additional classes for positioning. */
  className?: string;
}

/**
 * Button that fetches a hint for the current puzzle and stores it as a clue.
 */
export function NeedHintButton({ className }: NeedHintButtonProps) {
  const { fetchHint, pending } = useHint();

  return (
    <Button
      label={pending ? 'Fetching hint…' : 'Need a hint? 💡'}
      className={className}
      disabled={pending}
      onClick={fetchHint}
    />
  );
}
