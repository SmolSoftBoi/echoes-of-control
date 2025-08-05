import { Geist_Mono, Poppins } from 'next/font/google';

/** Font used for brand styling. */
export const brandFont = Poppins({
  variable: '--font-brand',
  weight: ['400', '700'],
  subsets: ['latin'],
});

/** Font used for monospaced text. */
export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

