'use client';

import React from 'react';
import { StatusSidebar, type StatusSidebarProps } from '@ui/components/StatusSidebar';
import { useGame } from '@ui/hooks/useGameContext';

/** Props for {@link GameSidebar}. */
export type GameSidebarProps = Omit<StatusSidebarProps, 'status' | 'clues'>;

/**
 * Sidebar that reads game state from {@link GameProvider}.
 */
export function GameSidebar(props: GameSidebarProps) {
  const { status, clues } = useGame();
  return <StatusSidebar status={status} clues={clues} {...props} />;
}
