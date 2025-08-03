import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React, { useEffect } from 'react';
import { describe, expect, it } from 'vitest';
import { GameProvider, useGame } from '../hooks/useGameContext';
import { StatusSidebar } from '../components/StatusSidebar';

describe('StatusSidebar', () => {
  it('renders status and clues list', () => {
    function Setup() {
        const { setStatus, addClue } = useGame();
        useEffect(() => {
          setStatus('Investigating');
          addClue('Found note');
        }, [setStatus, addClue]);
        return <StatusSidebar />;
      }

      const { getByText } = render(
        <GameProvider>
          <Setup />
        </GameProvider>,
      );
      expect(getByText('Investigating')).toBeInTheDocument();
      expect(getByText('Found note')).toBeInTheDocument();
    });
  });
