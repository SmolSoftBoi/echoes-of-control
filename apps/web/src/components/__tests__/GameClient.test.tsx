import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { GameProvider } from '@ui/hooks/useGameContext';
import { GameClient } from '../GameClient';
import { GameSidebar } from '../GameSidebar';

describe('GameClient', () => {
  it('progresses through the game states', () => {
    const { getByRole, getByText } = render(
      <GameProvider>
        <GameClient />
      </GameProvider>,
    );
    const region = getByRole('region');
    expect(region).toBeInTheDocument();
    expect(region.firstChild).toHaveAttribute('aria-live', 'polite');

    // intro state
    expect(getByText(/press 'start game' to begin/i)).toBeInTheDocument();
    const start = getByRole('button', { name: /start game/i });
    fireEvent.click(start);

    // playing state
    expect(getByText(/game in progress/i)).toBeInTheDocument();
    const finish = getByRole('button', { name: /finish game/i });
    fireEvent.click(finish);

    // completed state
    expect(getByText(/game over/i)).toBeInTheDocument();
    const reset = getByRole('button', { name: /reset game/i });
    fireEvent.click(reset);

    // back to intro
    expect(getByText(/press 'start game' to begin/i)).toBeInTheDocument();
  });

  it('focuses new button when state changes', () => {
    const { getByRole } = render(
      <GameProvider>
        <GameClient />
      </GameProvider>,
    );

    const start = getByRole('button', { name: /start game/i });
    expect(start).toHaveFocus();
    fireEvent.click(start);

    const finish = getByRole('button', { name: /finish game/i });
    expect(finish).toHaveFocus();
    fireEvent.click(finish);

    const reset = getByRole('button', { name: /reset game/i });
    expect(reset).toHaveFocus();
  });

  it('allows path selection', () => {
    const { getByRole, getByLabelText } = render(
      <GameProvider>
        <GameClient />
      </GameProvider>,
    );
    fireEvent.click(getByRole('button', { name: /start game/i }));

    const pathA = getByLabelText('Choose path A');
    const pathB = getByLabelText('Choose path B');
    expect(pathA).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(pathA);
    expect(pathA).toHaveAttribute('aria-pressed', 'true');
    expect(pathB).toHaveAttribute('aria-pressed', 'false');
  });

  it('updates status and clues in context', () => {
    const { getByRole, getByLabelText, getByText, getAllByText } = render(
      <GameProvider>
        <div>
          <GameClient />
          <GameSidebar />
        </div>
      </GameProvider>,
    );

    fireEvent.click(getByRole('button', { name: /start game/i }));
    fireEvent.click(getByLabelText('Choose path A'));
    fireEvent.click(getByRole('button', { name: /finish game/i }));

    expect(getAllByText(/game over/i)).toHaveLength(2);
    expect(getByText(/path a selected/i)).toBeInTheDocument();
  });
});
