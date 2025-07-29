import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    tsconfigPaths({
      projects: [
        resolve(__dirname, 'apps/web/tsconfig.json'),
        resolve(__dirname, 'packages/ui/tsconfig.json'),
        resolve(__dirname, 'packages/utils/tsconfig.json'),
      ],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
