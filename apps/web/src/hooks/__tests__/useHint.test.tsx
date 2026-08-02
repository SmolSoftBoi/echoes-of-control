import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { GameProvider, useGame } from '@ui/hooks/useGameContext';
import { useHint } from '../useHint';
import { generateHint } from '../../app/_actions/hint';

vi.mock('../../app/_actions/hint', () => ({ generateHint: vi.fn() }));

const mockGenerateHint = vi.mocked(generateHint);

function HookConsumer() {
  const { clues } = useGame();
  const { fetchHint, pending } = useHint();
  return (
    <div>
      <button disabled={pending} onClick={fetchHint}>
        Get hint
      </button>
      {clues.map((c) => (
        <p key={c}>{c}</p>
      ))}
    </div>
  );
}

describe('useHint', () => {
  it('adds generated hint to clues', async () => {
    mockGenerateHint.mockResolvedValue('Look under the mat 🏠');

    const { getByRole, findByText } = render(
      <GameProvider>
        <HookConsumer />
      </GameProvider>,
    );

    fireEvent.click(getByRole('button', { name: /get hint/i }));

    expect(await findByText('Look under the mat 🏠')).toBeInTheDocument();
    expect(generateHint).toHaveBeenCalledWith('Idle');
  });
});

