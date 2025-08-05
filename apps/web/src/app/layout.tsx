import type { Metadata } from 'next';
import { Geist_Mono, Poppins } from 'next/font/google';
import React from 'react';

import { GameProvider } from '@ui/hooks/useGameContext';

import { Header } from '../components/Header';
import { NeedHintButton } from '../components/NeedHintButton';
import { SkipLink } from '../components/SkipLink';

import './globals.css';

/** Font used for brand styling. */
export const brandFont = Poppins({
  variable: '--font-brand',
  weight: ['400', '700'],
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
