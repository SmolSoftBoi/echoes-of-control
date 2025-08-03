import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { GameProvider } from '@ui/hooks/useGameContext';
import { GameSidebar } from '../GameSidebar';

describe('GameSidebar', () => {
  it('shows default status and no clues', () => {
    const { getByText } = render(
      <GameProvider>
        <GameSidebar />
      </GameProvider>,
    );
    expect(getByText(/idle/i)).toBeInTheDocument();
    expect(getByText(/no clues yet/i)).toBeInTheDocument();
  });
});
