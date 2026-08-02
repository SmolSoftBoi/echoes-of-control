import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FadeIn } from './FadeIn';

const meta: Meta<React.ComponentProps<typeof FadeIn>> = {
  title: 'Components/FadeIn',
  component: FadeIn,
  args: {
    children: 'Fading in 👻',
    'aria-label': 'Animated content',
  },
};

export default meta;
export type Story = StoryObj<typeof FadeIn>;

export const Default: Story = {};

