'use client';

import React from 'react';
import { cn } from '@utils/cn';
import { useGame } from '../hooks/useGameContext';
import { ProgressBar } from './ProgressBar';

/**
 * Sidebar panel showing the player's current status and discovered clues.
 */
export interface StatusSidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Total clues available. */
  totalClues?: number;
}

export function StatusSidebar({ className, totalClues = 3, ...props }: StatusSidebarProps) {
  const { status, clues } = useGame();
  return (
    <aside
      {...props}
      className={cn(
        'w-60 space-y-4 border-l border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900',
        className,
      )}
    >
      <div>
        <h2 className="text-lg font-semibold">Status</h2>
        <p aria-live="polite" aria-atomic="true">{status}</p>
        <ProgressBar
          value={clues.length}
          max={totalClues}
          aria-label="Clue progress"
          className="mt-2"
        />
      </div>
      <div>
        <h2 className="text-lg font-semibold">Clues</h2>
        {clues.length > 0 ? (
          <ul className="list-disc pl-4">
            {clues.map((clue) => (
              <li key={clue}>{clue}</li>
            ))}
          </ul>
        ) : (
          <p>No clues yet 🕵️</p>
        )}
      </div>
    </aside>
  );
}
