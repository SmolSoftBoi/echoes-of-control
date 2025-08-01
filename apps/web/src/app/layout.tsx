import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import React from 'react';

import { Header } from '../components/Header';
import { SkipLink } from '../components/SkipLink';

import './globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <React.StrictMode>
          <SkipLink />
          <Header />
          {children}
        </React.StrictMode>
      </body>
    </html>
  );
}
