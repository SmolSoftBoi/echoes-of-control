'use client';

import React from 'react';
import { Button } from '@ui/components/Button';

/**
 * Hero section displayed on the home page.
 */
export function HomeHero() {
  return (
    <section className="flex flex-col items-center gap-6 py-16 text-center">
      <div className="prose dark:prose-invert">
        <h1>Welcome to Echoes of Control</h1>
        <p>A replay-friendly, text-first investigation game.</p>
      </div>
      <Button
        href="/"
        label="Start Exploring 🚀"
        className="rounded-full px-5 py-2 font-medium"
      />
    </section>
  );
}
