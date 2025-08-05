import type { Metadata } from 'next';
import React from 'react';

import { GameProvider } from '@ui/hooks/useGameContext';

import { Header } from '../components/Header';
import { NeedHintButton } from '../components/NeedHintButton';
import { SkipLink } from '../components/SkipLink';
import { brandFont, geistMono } from './fonts';

import './globals.css';

export const metadata: Metadata = {
  title: "Echoes of Control",
  description: "Replay-friendly investigation game built with Next.js",
};

/**
 * Root layout for the application.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${brandFont.variable} ${geistMono.variable} antialiased`}
      >
        <React.StrictMode>
          <GameProvider>
            <SkipLink />
            <Header />
            {children}
            <NeedHintButton className="fixed bottom-4 right-4" />
          </GameProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}
