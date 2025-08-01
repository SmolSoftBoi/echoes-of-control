import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { StatusSidebar } from '@ui/components/StatusSidebar';

const meta: Meta<React.ComponentProps<typeof StatusSidebar>> = {
  title: 'Components/StatusSidebar',
  component: StatusSidebar,
  args: {
    status: 'Exploring',
    clues: ['Mysterious letter', 'Broken key'],
    'aria-label': 'Game status sidebar',
  },
};
export default meta;
export type Story = StoryObj<typeof StatusSidebar>;

export const Default: Story = {};
