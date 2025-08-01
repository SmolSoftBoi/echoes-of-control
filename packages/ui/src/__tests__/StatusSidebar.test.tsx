import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { StatusSidebar } from '../components/StatusSidebar';

describe('StatusSidebar', () => {
  it('renders status and clues list', () => {
    const { getByText } = render(
      <StatusSidebar status="Investigating" clues={["Found note"]} />,
    );
    expect(getByText('Investigating')).toBeInTheDocument();
    expect(getByText('Found note')).toBeInTheDocument();
  });
});
