import { defineConfig, devices } from '@playwright/test'

const taskId = 'task_8d941b1fce8e452f'

export default defineConfig({
  testDir: './e2e',
  outputDir: `.iteration/crossagent/${taskId}/playwright-output`,
  reporter: [['line']],
  use: {
    ...devices['Desktop Chrome'],
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
