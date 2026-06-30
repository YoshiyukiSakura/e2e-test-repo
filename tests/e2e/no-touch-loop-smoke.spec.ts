import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { expect, test } from '@playwright/test';

const smokePageUrl = pathToFileURL(
  path.resolve(__dirname, '../../public/crossagent-no-touch-loop-smoke.html'),
).href;

const screenshotPath = path.resolve(
  __dirname,
  '__artifacts__/no-touch-loop-smoke.png',
);

test('no-touch loop smoke page reaches the visual pass state', async ({
  page,
}) => {
  await page.goto(smokePageUrl);

  await expect(
    page.getByRole('heading', { name: 'CrossAgent No-Touch Loop' }),
  ).toBeVisible();
  await expect(page.getByText('VISUAL PASS', { exact: true })).toBeVisible();
  await expect(page.getByText('Issue imported', { exact: true })).toBeVisible();
  await expect(page.getByText('Agent implemented', { exact: true })).toBeVisible();
  await expect(page.getByText('PR evidence ready', { exact: true })).toBeVisible();

  await page.screenshot({ path: screenshotPath, fullPage: true });
});
