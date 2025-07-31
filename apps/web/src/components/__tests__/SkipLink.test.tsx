import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { SkipLink } from '../SkipLink';

describe('SkipLink', () => {
  it('renders with default href', () => {
    const { getByRole } = render(<SkipLink />);
    const link = getByRole('link', { name: /skip to story/i });
    expect(link).toHaveAttribute('href', '#story');
  });
});
