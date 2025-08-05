import { act, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it, beforeEach } from 'vitest';
import { FadeInParagraph } from '../components/FadeInParagraph';

describe('FadeInParagraph', () => {
  let callbacks: IntersectionObserverCallback[] = [];

  beforeEach(() => {
    callbacks = [];
    globalThis.IntersectionObserver = class {
      callback: IntersectionObserverCallback;
      constructor(cb: IntersectionObserverCallback) {
        this.callback = cb;
        callbacks.push(cb);
      }
      observe() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
      unobserve() {}
      root = null;
      rootMargin = '';
      thresholds = [];
    } as unknown as typeof IntersectionObserver;
  });

  it('fades in once intersecting', async () => {
    const { getByText } = render(
      <FadeInParagraph>Hello</FadeInParagraph>,
    );
    const p = getByText('Hello');
    expect(p).toHaveClass('opacity-0');
    await act(async () => {
      callbacks[0]([
        { isIntersecting: true } as IntersectionObserverEntry,
      ],
      null as unknown as IntersectionObserver);
    });
    await waitFor(() => expect(p).toHaveClass('opacity-100'));
  });
});
