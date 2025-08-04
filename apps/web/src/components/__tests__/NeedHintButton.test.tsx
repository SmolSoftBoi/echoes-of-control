import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { StatusSidebar } from '@ui/components/StatusSidebar';
import { GameProvider } from '@ui/hooks/useGameContext';
import { NeedHintButton } from '../NeedHintButton';
import { generateHint } from '../../app/_actions/hint';

vi.mock('../../app/_actions/hint', () => ({ generateHint: vi.fn() }));

const mockGenerateHint = vi.mocked(generateHint);

describe('NeedHintButton', () => {
  it('adds generated hint to clues', async () => {
    mockGenerateHint.mockResolvedValue('Check the drawer 🗄️');

    const { getByRole, findByText } = render(
      <GameProvider>
        <div>
          <NeedHintButton />
          <StatusSidebar />
        </div>
      </GameProvider>,
    );

    fireEvent.click(getByRole('button', { name: /need a hint/i }));

    expect(await findByText('Check the drawer 🗄️')).toBeInTheDocument();
    expect(generateHint).toHaveBeenCalledWith('Idle');
  });
});
