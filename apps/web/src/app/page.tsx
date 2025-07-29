import Image from 'next/image';
import React from 'react';
import { GameClient } from '../components/GameClient';
import { HomeHero } from '../components/HomeHero';

/**
 * Home page with the hero section and game client.
 */
export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl p-4">
      <HomeHero />
      <GameClient className="mt-4" aria-label="Demo game client" />
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
