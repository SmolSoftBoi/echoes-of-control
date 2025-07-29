import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { Button } from '../components/Button';

describe('Button', () => {
  it('renders label text', () => {
    const { getByRole } = render(<Button label="Click me" />);
    const button = getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('renders an anchor when href provided', () => {
    const { getByRole } = render(
      <Button label="Start" href="/foo" />,
    );
    const link = getByRole('link', { name: /start/i });
    expect(link).toHaveAttribute('href', '/foo');
  });
});
