import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { HintWidget } from '../components/HintWidget';

describe('HintWidget', () => {
  it('reveals hints sequentially', () => {
    const hints = ['First', 'Second'];
    const { getByRole, getByText, queryByText, queryByRole } = render(
      <HintWidget hints={hints} />,
    );

    expect(queryByText('First')).toBeNull();
    fireEvent.click(getByRole('button', { name: /show hint/i }));
    expect(getByText('First')).toBeInTheDocument();
    fireEvent.click(getByRole('button', { name: /show hint/i }));
    expect(getByText('Second')).toBeInTheDocument();
    expect(queryByRole('button', { name: /show hint/i })).toBeNull();
  });
});
