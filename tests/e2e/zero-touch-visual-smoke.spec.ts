import { expect, test } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const taskId = 'task_017068b40409453a';

test('zero-touch visual smoke page renders required evidence', async ({ page }) => {
  const taskRoot = process.env.TASK_ROOT ?? process.cwd();
  const artifactDir = path.join(taskRoot, '.iteration', 'crossagent', taskId);
  const pagePath = path.join(taskRoot, 'public', 'crossagent-zero-touch-visual-smoke.html');
  const screenshotPath = path.join(artifactDir, 'zero-touch-visual-smoke.png');

  mkdirSync(artifactDir, { recursive: true });

  await page.goto(pathToFileURL(pagePath).toString());

  await expect(page.getByText('CrossAgent zero-touch visual smoke')).toBeVisible();
  await expect(page.getByText('Autonomous PR evidence checkpoint')).toBeVisible();
  await expect(page.getByText('System-published visual proof required')).toBeVisible();
  await expect(page.getByLabel('Success check marker')).toBeVisible();

  await page.screenshot({ path: screenshotPath, fullPage: true });
});
