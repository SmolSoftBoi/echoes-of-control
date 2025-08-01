'use client';

import React from 'react';
import { cn } from '@utils/cn';

/**
 * Button for selecting a choice.
 *
 * Adds `aria-pressed` to show selected state.
 */
export type ChoiceButtonProps = {
  /** Button label */
  label: string;
  /** True when this option is selected */
  selected?: boolean;
  /** Called after selection */
  onSelect?: () => void;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export const ChoiceButton = React.forwardRef<HTMLButtonElement, ChoiceButtonProps>(
  function ChoiceButton(
    { label, className, selected = false, onSelect, onClick, ...props },
    ref,
  ) {
    const classes = cn(
      'rounded border px-4 py-2',
      selected
        ? 'bg-foreground text-background'
        : 'bg-background text-foreground',
      className,
    );

    const handleClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      onSelect?.();
      onClick?.(event);
    };

    return (
      <button
        {...props}
        ref={ref}
        type="button"
        aria-pressed={selected}
        className={classes}
        onClick={handleClick}
      >
        {label}
      </button>
    );
  },
);
