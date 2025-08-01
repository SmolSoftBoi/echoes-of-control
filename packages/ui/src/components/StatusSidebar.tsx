'use client'

import React from 'react';
import { cn } from '@utils/cn';

/**
 * Sidebar panel showing the player's status and any discovered clues.
 */
export interface StatusSidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Current game status string. */
  status: string;
  /** List of clue texts to display. */
  clues: string[];
}

export function StatusSidebar({
  status,
  clues,
  className,
  ...props
}: StatusSidebarProps) {
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
        <p aria-live="polite" aria-atomic="true">
          {status}
        </p>
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
