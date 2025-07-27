import Link from 'next/link';
import React from 'react';

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
      <Link
        href="/"
        className="rounded-full bg-foreground px-5 py-2 font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        Start Exploring 🚀
      </Link>
    </section>
  );
}
