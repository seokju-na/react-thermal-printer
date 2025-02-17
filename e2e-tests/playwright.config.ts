import { defineConfig, devices } from '@playwright/test';
import { match } from 'ts-pattern';

const { TEST_TARGET } = process.env;
const target = match(TEST_TARGET?.toLowerCase())
  .with('next', () => 'next' as const)
  .with('vite', () => 'vite' as const)
  .run();

function getPort(t: typeof target): number {
  switch (t) {
    case 'next':
      return 3001;
    case 'vite':
      return 3002;
  }
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: `http://localhost:${getPort(target)}`,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `yarn start:${target}`,
    url: `http://localhost:${getPort(target)}`,
    reuseExistingServer: !process.env.CI,
  },
});
