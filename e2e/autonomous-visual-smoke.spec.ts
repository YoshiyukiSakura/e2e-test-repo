import { expect, test } from '@playwright/test'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const taskId = 'task_8d941b1fce8e452f'

test('CrossAgent autonomous visual smoke page renders required evidence', async ({ page }) => {
  const root = process.env.TASK_ROOT ?? process.cwd()
  const pageUrl = pathToFileURL(
    path.join(root, 'public', 'crossagent-autonomous-visual-smoke.html'),
  ).toString()
  const screenshotPath = path.join(
    root,
    '.iteration',
    'crossagent',
    taskId,
    'autonomous-visual-smoke.png',
  )

  await page.goto(pageUrl)

  await expect(page.getByText('CrossAgent autonomous visual smoke')).toBeVisible()
  await expect(page.getByText('No manual intervention checkpoint')).toBeVisible()
  await expect(page.getByText('Rendered screenshot evidence is required')).toBeVisible()
  await expect(page.getByLabel('Success check marker')).toBeVisible()

  await page.screenshot({ path: screenshotPath, fullPage: true })
  console.log(`screenshot=${screenshotPath}`)
})
