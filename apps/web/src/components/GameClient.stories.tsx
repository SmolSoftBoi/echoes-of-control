import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { GameClient } from './GameClient';

const meta: Meta<React.ComponentProps<typeof GameClient>> = {
  title: 'Components/GameClient',
  component: GameClient,
  args: {
    'aria-label': 'Game client demo',
  },
};

export default meta;
export type Story = StoryObj<typeof GameClient>;

export const Default: Story = {};
