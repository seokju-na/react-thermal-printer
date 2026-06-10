import { defineConfig, type UserConfig } from 'tsdown';

const config: UserConfig = defineConfig({
  entry: ['./src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  platform: 'neutral',
  target: ['node10', 'es2015'],
  // `neutral` platform defaults `mainFields` to `[]`, so `iconv-lite` (which only
  // exposes a `main` field) fails to resolve and drops out of the ESM bundle.
  // Configure the fields explicitly so it gets bundled as before.
  inputOptions: {
    resolve: {
      mainFields: ['module', 'main'],
    },
  },
});

export { config as default };
