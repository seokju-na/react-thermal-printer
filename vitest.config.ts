import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['packages/**/*.spec.{ts,tsx}'],
    exclude: ['dist', 'esm', 'build', 'node_modules', '.yarn', '.idea'],
    watchExclude: ['dist', 'esm', 'build', 'node_modules'],
    // Cannot use 'happy-dom' at this time.
    // https://github.com/vitest-dev/vitest/issues/132#issuecomment-992972183
    environment: 'jsdom',
    clearMocks: true,
    globals: true,
  },
  plugins: [react() as any],
});
