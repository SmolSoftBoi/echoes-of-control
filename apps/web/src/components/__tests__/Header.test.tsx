import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { Header } from '../Header';
import '@testing-library/jest-dom';

describe('Header', () => {
  it('renders a link to the homepage', () => {
    const { getByRole } = render(<Header />);
    const banner = getByRole('banner', { name: /site banner/i });
    const navigation = getByRole('navigation', { name: /primary navigation/i });
    const link = getByRole('link', { name: /echoes of control/i });
    expect(link).toHaveAttribute('href', '/');
    expect(banner).toContainElement(navigation);
  });
});
