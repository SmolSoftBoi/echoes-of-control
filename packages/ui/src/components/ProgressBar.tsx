'use client';

import React from 'react';
import { cn } from '@utils/cn';

/**
 * Accessible progress bar.
 */
export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current progress value. */
  value: number;
  /** Maximum progress value. */
  max: number;
}

export function ProgressBar({ value, max, className, ...props }: ProgressBarProps) {
  const percent = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn('h-2 w-full rounded bg-gray-200', className)}
      {...props}
    >
      <div
        className="h-full rounded bg-blue-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
