import { expect, test } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const taskId = process.env.CROSSAGENT_TASK_ID ?? 'task_c9a25d3d4f8a42ac'
const taskRoot = process.env.TASK_ROOT ?? process.cwd()
const pagePath = path.join(taskRoot, 'public', 'prod-pr-when-ready-20260702-130323.html')
const artifactDir = path.join(taskRoot, '.iteration', 'crossagent', taskId)
const screenshotPath = path.join(artifactDir, 'prod-pr-when-ready-20260702-130323.png')

test('renders the PR-when-ready evidence page', async ({ page }) => {
  await page.goto(pathToFileURL(pagePath).toString())

  await expect(page.getByText('CrossAgent PR when ready')).toBeVisible()
  await expect(page.getByText('Evidence closed before PR create')).toBeVisible()
  await expect(page.getByText('prod-pr-when-ready-20260702-130323')).toBeVisible()

  const marker = page.getByTestId('success-marker')
  await expect(marker).toBeVisible()
  await expect(marker).toHaveText('✓')
  await expect(marker).toHaveCSS('background-color', 'rgb(34, 197, 94)')

  fs.mkdirSync(artifactDir, { recursive: true })
  await page.screenshot({ path: screenshotPath, fullPage: true })
})
