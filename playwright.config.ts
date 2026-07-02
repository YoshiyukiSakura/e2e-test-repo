import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  outputDir: '.iteration/crossagent/task_c9a25d3d4f8a42ac/playwright-output',
  reporter: [['list']],
  use: {
    ...devices['Desktop Chrome'],
    viewport: { width: 1280, height: 720 },
  },
})
