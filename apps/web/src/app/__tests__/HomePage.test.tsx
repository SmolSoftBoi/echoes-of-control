import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it } from 'vitest';
import HomePage from '../page';

describe('HomePage', () => {
  it('renders the game client', () => {
    const { getByLabelText, getByRole } = render(<HomePage />);
    const main = getByRole('main');
    const client = getByLabelText(/demo game client/i);
    expect(client).toBeInTheDocument();
    expect(main).toContainElement(client);
  });
});
