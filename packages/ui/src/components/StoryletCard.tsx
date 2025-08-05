'use client';

import React from 'react';
import { cn } from '@utils/cn';
import { Button } from './Button';

export type StoryletCardProps = {
  /** Storylet title */
  title: string;
  /** Storylet description */
  description: string;
  /** Label for the action button */
  actionLabel?: string;
  /** Called when the card action is triggered */
  onSelect?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Card displaying a storylet with optional action button.
 */
export function StoryletCard({
  title,
  description,
  actionLabel = 'Begin 🃏',
  onSelect,
  className,
  ...props
}: StoryletCardProps) {
  return (
    <article
      {...props}
      className={cn('space-y-2 rounded border p-4', className)}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p>{description}</p>
      {onSelect && (
        <Button
          label={actionLabel}
          onClick={onSelect}
        />
      )}
    </article>
  );
}

