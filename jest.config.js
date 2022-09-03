module.exports = {
  transform: {
    '^.+\\.tsx?$': [
      'esbuild-jest',
      {
        jsx: 'automatic',
        sourcemap: true,
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  clearMocks: true,
};
