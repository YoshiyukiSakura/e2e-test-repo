import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: /no-touch-loop-smoke\.spec\.ts/,
  fullyParallel: false,
  retries: 0,
  reporter: [['list']],
  use: {
    browserName: 'chromium',
    viewport: { width: 1280, height: 720 },
    screenshot: 'off',
    trace: 'off',
  },
});
