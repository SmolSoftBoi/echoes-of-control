import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { HomeHero } from '../HomeHero';

describe('HomeHero', () => {
  it('shows the welcome heading', () => {
    const { getByRole } = render(<HomeHero />);
    const region = getByRole('region', { name: /welcome section/i });
    const heading = getByRole('heading', { name: /welcome to echoes of control/i });
    expect(region).toContainElement(heading);
  });

  it('links to start exploring', () => {
    const { getByRole } = render(<HomeHero />);
    const link = getByRole('link', { name: /start exploring/i });
    expect(link).toHaveAttribute('href', '/');
  });
});
