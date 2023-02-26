import type { Config } from 'jest';

const config: Config = {
  transform: {
    '\\.[jt]sx?$': [
      '@swc/jest',
      {
        jsc: {
          target: 'es2019',
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  clearMocks: true,
};

export default config;
