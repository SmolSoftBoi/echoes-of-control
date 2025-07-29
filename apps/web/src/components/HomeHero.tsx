'use client';

import React from 'react';
import { Button } from '@ui/components/Button';

/**
 * Hero section displayed on the home page.
 */
export function HomeHero() {
  return (
    <section className="flex flex-col items-center gap-6 py-16 text-center">
      <h1 className="text-4xl font-bold">Welcome to Echoes of Control</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        A replay-friendly, text-first investigation game.
      </p>
      <Button
        href="/"
        label="Start Exploring 🚀"
        className="rounded-full px-5 py-2 font-medium"
      />
    </section>
  );
}
