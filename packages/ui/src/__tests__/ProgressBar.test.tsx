import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ProgressBar } from '../components/ProgressBar';

describe('ProgressBar', () => {
  it('renders with correct value attributes', () => {
    const { getByRole } = render(<ProgressBar value={2} max={4} />);
    const bar = getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '2');
    expect(bar).toHaveAttribute('aria-valuemax', '4');
  });
});
