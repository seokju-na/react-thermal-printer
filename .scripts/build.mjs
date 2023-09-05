#!/usr/bin/env node

import { build as esbuild } from 'esbuild';
import { pnpPlugin } from '@yarnpkg/esbuild-plugin-pnp';
import path from 'node:path';
import { readFile, rm, writeFile } from 'node:fs/promises';
import { execa } from 'execa';

const pkgRaw = await readFile(
  path.join(process.cwd(), 'package.json'),
  'utf8'
);
const { dependencies = {}, peerDependencies = {} } = JSON.parse(pkgRaw);

const external = [
  ...Object.keys(dependencies),
  ...Object.keys(peerDependencies),
];

async function build(options = {}) {
  return esbuild({
    entryPoints: ['src/index.ts'],
    bundle: true,
    sourcemap: true,
    plugins: [pnpPlugin()],
    external,
    jsx: 'automatic',
    ...options,
  });
}

async function types(outDir) {
  const tsc = {
    compilerOptions: {
      outDir,
      noEmit: false,
      declaration: true,
      emitDeclarationOnly: true,
      allowSyntheticDefaultImports: true,
      target: 'ESNext',
      module: 'ESNext',
      moduleResolution: 'Node',
      lib: ['DOM', 'DOM.Iterable', 'ESNext'],
      skipLibCheck: true,
      jsx: 'react-jsx',
    },
    include: ['src'],
    exclude: [
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/*.test.ts',
      '**/*.test.tsx',
    ],
  };
  const tscPath = path.join(process.cwd(), 'tsconfig.json');

  try {
    await writeFile(tscPath, JSON.stringify(tsc), 'utf8');
    await execa('yarn', [
      'run',
      '-T',
      'tsc',
    ]);
  } finally {
    await rm(tscPath, { force: true });
  }
}

await Promise.all([
  build({ format: 'cjs', outdir: 'dist' }),
  build({ format: 'esm', outdir: 'esm' }),
  types('dist'),
]);
