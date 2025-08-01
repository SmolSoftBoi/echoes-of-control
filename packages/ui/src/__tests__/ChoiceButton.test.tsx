import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ChoiceButton } from '../components/ChoiceButton';

describe('ChoiceButton', () => {
  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    const { getByRole } = render(
      <ChoiceButton label="Pick" onSelect={onSelect} />,
    );
    const button = getByRole('button', { name: /pick/i });
    fireEvent.click(button);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
