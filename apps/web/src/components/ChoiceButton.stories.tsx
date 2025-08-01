import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ChoiceButton } from '@ui/components/ChoiceButton';

const meta: Meta<React.ComponentProps<typeof ChoiceButton>> = {
  title: 'Components/ChoiceButton',
  component: ChoiceButton,
  args: { label: 'Example', 'aria-label': 'Choice button example' },
};

export default meta;
export type Story = StoryObj<React.ComponentProps<typeof ChoiceButton>>;

export const Default: Story = {
  args: { label: 'Select me' },
};
