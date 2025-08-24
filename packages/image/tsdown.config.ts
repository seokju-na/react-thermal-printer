import { defineConfig, type UserConfig } from 'tsdown';

const config: UserConfig = defineConfig({
  entry: ['./src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  platform: 'neutral',
  target: ['node10', 'es2015'],
});

export { config as default };
