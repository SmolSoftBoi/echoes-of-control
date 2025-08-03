import Image from 'next/image';
import React from 'react';
import { GameProvider } from '@ui/hooks/useGameContext';
import { GameClient } from '../components/GameClient';
import { GameSidebar } from '../components/GameSidebar';
import { HomeHero } from '../components/HomeHero';

/**
 * Home page with the hero section and game client.
 *
 * Wraps the game area in {@link GameProvider} to expose global game state.
 */
export default function HomePage() {
  return (
    <main id="story" role="main" className="mx-auto max-w-3xl p-4" tabIndex={-1}>
      <HomeHero />
      <GameProvider>
        <div className="mt-4 flex gap-4">
          <GameClient className="flex-1" aria-label="Demo game client" />
          <GameSidebar aria-label="Game status sidebar" />
        </div>
      </GameProvider>
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
