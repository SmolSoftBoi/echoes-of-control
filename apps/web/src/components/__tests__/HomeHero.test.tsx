import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { HomeHero } from '../HomeHero';

describe('HomeHero', () => {
  it('shows the welcome heading', () => {
    const { getByRole } = render(<HomeHero />);
    const heading = getByRole('heading', { name: /welcome to echoes of control/i });
    expect(heading).toBeInTheDocument();
  });

  it('links to start exploring', () => {
    const { getByRole } = render(<HomeHero />);
    const link = getByRole('link', { name: /start exploring/i });
    expect(link).toHaveAttribute('href', '/');
  });

  it('applies typography styles', () => {
    const { container } = render(<HomeHero />);
    expect(container.querySelector('.prose')).toBeInTheDocument();
  });
});
