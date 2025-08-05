import { fireEvent, render, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { HintWidget } from '../components/HintWidget';
import { StatusSidebar } from '../components/StatusSidebar';
import { GameProvider } from '../hooks/useGameContext';

describe('HintWidget', () => {
  it('reveals hints sequentially and stores them in game provider', () => {
    const hints = ['First', 'Second'];
    const { getByRole, queryByRole, getByLabelText } = render(
      <GameProvider>
        <HintWidget hints={hints} aria-label="hint widget" />
        <StatusSidebar aria-label="game status sidebar" />
      </GameProvider>,
    );

    const widget = getByLabelText('hint widget');
    expect(within(widget).queryByText('First')).toBeNull();
    fireEvent.click(getByRole('button', { name: /show hint/i }));
    expect(within(widget).getByText('First')).toBeInTheDocument();
    const sidebar = getByLabelText('game status sidebar');
    expect(within(sidebar).getByText('First')).toBeInTheDocument();
    fireEvent.click(getByRole('button', { name: /show hint/i }));
    expect(within(widget).getByText('Second')).toBeInTheDocument();
    expect(within(sidebar).getByText('Second')).toBeInTheDocument();
    expect(queryByRole('button', { name: /show hint/i })).toBeNull();
  });
});
