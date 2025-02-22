import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/index.ts'],
  sourcemap: false,
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  target: 'es2020',
  platform: 'neutral',
  bundle: true,
  noExternal: ['iconv-lite'],
});
