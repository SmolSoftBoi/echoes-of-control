import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { StoryletCard } from '../components/StoryletCard';

describe('StoryletCard', () => {
  it('renders fields and triggers selection', () => {
    const onSelect = vi.fn();
    const { getByText, getByRole } = render(
      <StoryletCard
        title="Explore"
        description="Search the ruins"
        onSelect={onSelect}
      />,
    );
    expect(getByText('Explore')).toBeInTheDocument();
    expect(getByText('Search the ruins')).toBeInTheDocument();
    fireEvent.click(getByRole('button', { name: /begin/i }));
    expect(onSelect).toHaveBeenCalled();
  });
});

