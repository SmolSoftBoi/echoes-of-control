import Image from 'next/image';
import React from 'react';
import { HomeHero } from '../components/HomeHero';

/**
 * Home page displaying the hero section.
 */
export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl p-4">
      <HomeHero />
      <div className="mt-10 flex justify-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </div>
    </main>
  );
}
