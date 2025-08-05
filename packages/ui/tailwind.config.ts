import type { Config } from 'tailwindcss';

/** Shared Tailwind configuration. */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        brand: {
          DEFAULT: 'var(--color-brand)',
          foreground: 'var(--color-brand-foreground)',
        },
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
        brand: 'var(--font-brand)',
      },
    },
  },
  plugins: [],
};

export default config;
