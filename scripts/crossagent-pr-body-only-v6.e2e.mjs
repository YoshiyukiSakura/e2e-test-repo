import { mkdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const taskId = "task_b51c72459f954eee";
const taskRoot = process.env.TASK_ROOT || process.cwd();
const pagePath = path.join(taskRoot, "public", "crossagent-pr-body-only-v6.html");
const artifactDir = path.join(taskRoot, ".iteration", "crossagent", taskId);
const screenshotPath = path.join(artifactDir, "crossagent-pr-body-only-v6.png");
const requiredText = [
  "CrossAgent PR body-only smoke v6",
  "Evidence belongs in the PR body",
  "No redundant Delivery Evidence Summary comment",
];

await mkdir(artifactDir, { recursive: true });

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto(pathToFileURL(pagePath).href);

  for (const text of requiredText) {
    await page.getByText(text, { exact: true }).waitFor({ state: "visible" });
  }

  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`Captured CrossAgent PR body-only smoke v6 screenshot: ${screenshotPath}`);
} finally {
  await browser.close();
}
