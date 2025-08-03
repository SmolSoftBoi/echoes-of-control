'use client';

import React from 'react';
import { StatusSidebar } from '@ui/components/StatusSidebar';

/** Props for {@link GameSidebar}. */
export type GameSidebarProps = React.ComponentProps<typeof StatusSidebar>;

/**
 * Sidebar that proxies {@link StatusSidebar}.
 */
export function GameSidebar(props: GameSidebarProps) {
  return <StatusSidebar {...props} />;
}
