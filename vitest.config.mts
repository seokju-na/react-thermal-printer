import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    clearMocks: true,
    globals: true,
    environment: 'jsdom',
    include: ['packages/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    retry: 0,
    setupFiles: ['./vitest.setup.mts'],
  },
});
