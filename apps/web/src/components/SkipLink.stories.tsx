import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SkipLink } from './SkipLink';

const meta: Meta<React.ComponentProps<typeof SkipLink>> = {
  title: 'Components/SkipLink',
  component: SkipLink,
  args: { 'aria-label': 'Skip navigation' },
};

export default meta;
export type Story = StoryObj<typeof SkipLink>;

export const Default: Story = {};
