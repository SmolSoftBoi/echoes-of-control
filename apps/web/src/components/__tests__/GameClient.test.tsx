import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { GameClient } from '../GameClient';

describe('GameClient', () => {
  it('progresses through the game states', () => {
    const { getByRole, getByText } = render(<GameClient />);

    // intro state
    expect(getByText(/press start/i)).toBeInTheDocument();
    const start = getByRole('button', { name: /start/i });
    fireEvent.click(start);

    // playing state
    expect(getByText(/playing/i)).toBeInTheDocument();
    const finish = getByRole('button', { name: /finish/i });
    fireEvent.click(finish);

    // completed state
    expect(getByText(/game over/i)).toBeInTheDocument();
    const reset = getByRole('button', { name: /reset/i });
    fireEvent.click(reset);

    // back to intro
    expect(getByText(/press start/i)).toBeInTheDocument();
  });
});
