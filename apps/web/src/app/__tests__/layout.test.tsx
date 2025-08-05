import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Poppins: () => ({ variable: 'mock-brand-font' }),
  Geist_Mono: () => ({ variable: 'mock-mono-font' }),
}));

vi.mock('../globals.css', () => ({}));

describe('brandFont', () => {
  it('provides a class for the brand font', async () => {
    const { brandFont } = await import('../layout');
    const TestComponent = () => (
      <span className={brandFont.variable}>Text</span>
    );
    const { getByText } = render(<TestComponent />);
    expect(getByText('Text')).toHaveClass('mock-brand-font');
  });
});
