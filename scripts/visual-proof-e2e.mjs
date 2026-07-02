import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { chromium } from 'playwright'

const taskId = 'task_659da6aaa09e4aea'
const marker = 'FRESH-MULTIMODAL-R2-20260702T095749Z'
const taskRoot = process.env.TASK_ROOT || process.cwd()
const artifactDir = path.join(taskRoot, '.iteration', 'crossagent', taskId)
const screenshotPath = path.join(artifactDir, 'visual-proof.png')
const pageUrl = pathToFileURL(path.join(taskRoot, 'src', 'visual-proof.html')).href

await mkdir(artifactDir, { recursive: true })

let browser
try {
  browser = await chromium.launch({
    channel: process.env.PLAYWRIGHT_CHROMIUM_CHANNEL || 'chrome',
    headless: true,
  })
} catch {
  browser = await chromium.launch({ headless: true })
}

const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
await page.goto(pageUrl)

for (const text of [
  'CrossAgent Fresh Multimodal Proof',
  marker,
  'Status',
  'Ready for R2 visual evidence verification',
  'Timestamp',
  'Checklist: browser surface rendered',
]) {
  const locator = page.getByText(text, { exact: false })
  await locator.waitFor({ state: 'visible', timeout: 5000 })
}

await page.screenshot({ path: screenshotPath, fullPage: true })
await browser.close()

console.log(`visual proof screenshot: ${screenshotPath}`)
