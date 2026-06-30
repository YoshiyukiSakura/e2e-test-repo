import { defineConfig } from '@playwright/test';

const taskId = 'task_017068b40409453a';

export default defineConfig({
  testDir: './tests/e2e',
  outputDir: `.iteration/crossagent/${taskId}/playwright-output`,
  reporter: [['list']],
  use: {
    viewport: { width: 1280, height: 900 },
  },
});
