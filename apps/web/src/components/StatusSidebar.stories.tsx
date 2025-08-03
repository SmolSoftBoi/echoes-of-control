import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect } from 'react';
import { GameProvider, useGame } from '@ui/hooks/useGameContext';
import { StatusSidebar } from '@ui/components/StatusSidebar';

const meta: Meta<React.ComponentProps<typeof StatusSidebar>> = {
  title: 'Components/StatusSidebar',
  component: StatusSidebar,
  decorators: [
    (Story: React.ComponentType) => (
      <GameProvider>
        <Story />
      </GameProvider>
    ),
  ],
};
export default meta;
export type Story = StoryObj<typeof StatusSidebar>;

export const Default: Story = {
  render: function Render() {
      const { setStatus, addClue } = useGame();
      useEffect(() => {
        setStatus('Exploring');
        addClue('Mysterious letter');
        addClue('Broken key');
      }, [setStatus, addClue]);
      return <StatusSidebar aria-label='Game status sidebar' />;
    },
  };
