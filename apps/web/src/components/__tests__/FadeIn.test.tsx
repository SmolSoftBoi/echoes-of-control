import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { FadeIn } from '../FadeIn';

describe('FadeIn', () => {
  it('renders its children', () => {
    const { getByText } = render(<FadeIn>Hi 👋</FadeIn>);
    expect(getByText('Hi 👋')).toBeInTheDocument();
  });
});

