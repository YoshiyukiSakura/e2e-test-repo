import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { expect, test } from '@playwright/test';

const taskId = 'task_8c39f5e0ac0746ca';
const repoRoot = process.cwd();
const pagePath = path.join(repoRoot, 'visual-smoke', 'draft-first-loop-v4.html');
const evidenceDir =
  process.env.EVIDENCE_DIR ||
  path.join(repoRoot, '.iteration', 'crossagent', taskId);
const screenshotPath = path.join(evidenceDir, 'draft-first-loop-v4.png');

test('draft-first v4 visual smoke page exposes required evidence markers', async ({
  page,
}) => {
  await mkdir(evidenceDir, { recursive: true });

  await page.goto(pathToFileURL(pagePath).href);

  await expect(page.getByText('DRAFT_FIRST_EVIDENCE_20260630_V4')).toBeVisible();
  await expect(page.getByText('Draft-first loop v4')).toBeVisible();

  const styles = await page.evaluate(() => {
    const main = document.querySelector('main');
    const accent = document.querySelector('.accent');
    const marker = document.querySelector('.marker');

    return {
      border: getComputedStyle(main).borderTopColor,
      accent: getComputedStyle(accent).backgroundColor,
      slate: getComputedStyle(marker).backgroundColor,
    };
  });

  expect(styles).toEqual({
    border: 'rgb(16, 185, 129)',
    accent: 'rgb(139, 92, 246)',
    slate: 'rgb(51, 65, 85)',
  });

  await page.screenshot({ path: screenshotPath, fullPage: true });
});
