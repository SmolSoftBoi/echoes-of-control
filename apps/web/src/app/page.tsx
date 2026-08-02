import Image from 'next/image';
import React from 'react';
import { GameClient } from '../components/GameClient';
import { GameSidebar } from '../components/GameSidebar';
import { HomeHero } from '../components/HomeHero';

/**
 * Home page with the hero section and game client.
 */
export default function HomePage() {
  return (
    <main id="story" role="main" className="mx-auto max-w-3xl p-4" tabIndex={-1}>
      <HomeHero />
      <div className="mt-4 flex gap-4">
        <GameClient className="flex-1" aria-label="Demo game client" />
        <GameSidebar aria-label="Game status sidebar" />
      </div>
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
