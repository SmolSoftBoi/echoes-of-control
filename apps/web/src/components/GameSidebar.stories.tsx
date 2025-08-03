import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { GameProvider } from '@ui/hooks/useGameContext';
import { GameSidebar } from './GameSidebar';

const meta: Meta<React.ComponentProps<typeof GameSidebar>> = {
  title: 'Components/GameSidebar',
  component: GameSidebar,
  decorators: [
    (Story: React.ComponentType) => (
      <GameProvider>
        <Story />
      </GameProvider>
    ),
  ],
  args: {
    'aria-label': 'Game status sidebar',
  },
};

export default meta;
export type Story = StoryObj<typeof GameSidebar>;

export const Default: Story = {};
