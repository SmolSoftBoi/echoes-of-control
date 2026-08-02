import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { GameProvider } from '@ui/hooks/useGameContext';
import HomePage from '../page';

describe('HomePage', () => {
  it('renders game client with sidebar', () => {
    const { getByLabelText, getByRole, getByText } = render(
      <GameProvider>
        <HomePage />
      </GameProvider>,
    );
    const main = getByRole('main');
    const client = getByLabelText(/demo game client/i);
    const sidebar = getByLabelText(/game status sidebar/i);
    expect(client).toBeInTheDocument();
    expect(main).toContainElement(client);
    expect(sidebar).toBeInTheDocument();
    expect(getByText(/idle/i)).toBeInTheDocument();
    expect(getByText(/no clues yet/i)).toBeInTheDocument();
  });
});
