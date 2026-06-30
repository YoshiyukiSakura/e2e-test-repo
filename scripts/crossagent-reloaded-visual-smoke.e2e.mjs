import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const taskRoot = process.cwd();
const taskId =
  process.env.CROSSAGENT_TASK_ID ||
  process.env.RUNTIME_TASK_ID ||
  'task_a229c417e757459f';
const pagePath = path.join(taskRoot, 'public', 'crossagent-reloaded-visual-smoke.html');
const artifactDir = path.join(taskRoot, '.iteration', 'crossagent', taskId);
const screenshotPath = path.join(artifactDir, 'crossagent-reloaded-visual-smoke.png');

const requiredText = [
  'CrossAgent reloaded visual smoke',
  'Runtime e2e classification verified',
  'Browser screenshot evidence captured',
];

await mkdir(artifactDir, { recursive: true });

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto(pathToFileURL(pagePath).href);

  for (const text of requiredText) {
    const locator = page.getByText(text, { exact: true });
    await locator.waitFor({ state: 'visible', timeout: 5000 });
  }

  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Screenshot captured: ${screenshotPath}`);
} finally {
  await browser.close();
}
