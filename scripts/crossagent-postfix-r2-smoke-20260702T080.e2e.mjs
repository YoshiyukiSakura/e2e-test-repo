import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const requiredStrings = [
  "CrossAgent post-fix R2 smoke 20260702T080",
  "Fresh queue has no legacy blocker",
  "R2 visual evidence rendered",
];

const taskRoot = process.env.TASK_ROOT || process.cwd();
const taskId = process.env.CROSSAGENT_TASK_ID || "task_384c27e1936b41e1";
const pagePath = path.join(taskRoot, "public", "crossagent-postfix-r2-smoke-20260702T080.html");
const artifactDir = path.join(taskRoot, ".iteration", "crossagent", taskId);
const screenshotPath = path.join(artifactDir, "crossagent-postfix-r2-smoke-20260702T080.png");

let browser;

try {
  await fs.access(pagePath);
  await fs.mkdir(artifactDir, { recursive: true });

  browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(pathToFileURL(pagePath).href);

  for (const text of requiredStrings) {
    const locator = page.getByText(text, { exact: true });
    await locator.waitFor({ state: "visible", timeout: 5000 });
  }

  await page.locator('[aria-label="Success check marker"]').waitFor({
    state: "visible",
    timeout: 5000,
  });

  await page.screenshot({ path: screenshotPath, fullPage: true });
  const screenshot = await fs.stat(screenshotPath);
  if (screenshot.size === 0) {
    throw new Error(`Screenshot capture produced an empty file: ${screenshotPath}`);
  }

  console.log(`E2E smoke passed: ${screenshotPath}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await browser?.close();
}
