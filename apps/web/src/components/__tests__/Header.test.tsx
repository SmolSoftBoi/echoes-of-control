import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { Header } from '../Header';
import '@testing-library/jest-dom';

describe('Header', () => {
  it('renders a link to the homepage', () => {
    const { getByRole } = render(<Header />);
    const link = getByRole('link', { name: /echoes of control/i });
    expect(link).toHaveAttribute('href', '/');
  });
});
