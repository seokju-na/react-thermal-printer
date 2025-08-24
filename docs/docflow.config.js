import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(dirname, '..');

/** @type {import('docflow').Config} */
export default {
  project: {
    root: rootDir,
    packageManager: 'yarn',
    workspace: {
      include: ['packages/*'],
      exclude: [],
    },
  },
  commands: {
    build: {
      outputDir: 'docs/references',
      manifest: {
        enabled: true,
        prefix: 'references',
      },
      generator: {
        name: 'vitepress',
        signatureLanguage: 'typescript',
      },
    },
    check: {},
    generate: {
      jsdoc: {
        fetcher: async () => {},
      },
    },
  },
};
