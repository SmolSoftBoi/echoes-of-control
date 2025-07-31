import Link from 'next/link';
import React from 'react';

/**
 * Header component with a link to the homepage.
 */
export function Header() {
  return (
    <header
      role="banner"
      className="border-b border-gray-200 dark:border-gray-800 py-4"
    >
      <nav
        role="navigation"
        className="mx-auto flex max-w-4xl items-center justify-between px-4"
      >
        <Link href="/" className="text-xl font-semibold">
          Echoes of Control
        </Link>
      </nav>
    </header>
  );
}
