import { act, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  GameProvider,
  useGame,
  type GameContextValue,
} from '../hooks/useGameContext';
import { StatusSidebar } from '../components/StatusSidebar';
import * as sound from '../lib/sound';

describe('StatusSidebar', () => {
  it('renders status and clues list', () => {
    function Setup() {
      const { setStatus, addClue } = useGame();
      React.useEffect(() => {
        setStatus('Investigating');
        addClue('Found note');
      }, [setStatus, addClue]);
      return <StatusSidebar />;
    }

    const { getByText, getByRole } = render(
      <GameProvider>
        <Setup />
      </GameProvider>,
    );
    expect(getByText('Investigating')).toBeInTheDocument();
    expect(getByText('Found note')).toBeInTheDocument();
    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('does not play sound on initial render', () => {
    vi.useFakeTimers();
    function Setup() {
      const { setStatus, addClue } = useGame();
      React.useEffect(() => {
        setStatus('Investigating');
        addClue('Found note');
      }, [setStatus, addClue]);
      return <StatusSidebar />;
    }

    const spy = vi
      .spyOn(sound, 'playStatusSound')
      .mockImplementation(() => {});
    render(
      <GameProvider>
        <Setup />
      </GameProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
    vi.runAllTimers();
    vi.useRealTimers();
  });

  it('plays sound on status or clue change', () => {
    vi.useFakeTimers();
    let api: GameContextValue;
    function Setup() {
      api = useGame();
      return <StatusSidebar />;
    }
    const spy = vi
      .spyOn(sound, 'playStatusSound')
      .mockImplementation(() => {});
    render(
      <GameProvider>
        <Setup />
      </GameProvider>,
    );

    vi.runAllTimers();

    act(() => {
      api.setStatus('Investigating');
    });
    expect(spy).toHaveBeenCalledTimes(1);

    act(() => {
      api.addClue('Found note');
    });
    expect(spy).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });
});
