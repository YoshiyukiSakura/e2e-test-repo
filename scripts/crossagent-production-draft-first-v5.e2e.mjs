import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import assert from "node:assert/strict";
import { chromium } from "playwright";

const TASK_ID = "task_b6d13efaf8eb465c";
const repoRoot = process.env.TASK_ROOT || process.cwd();
const pagePath = resolve(repoRoot, "public/crossagent-production-draft-first-v5.html");
const artifactDir = resolve(repoRoot, ".iteration/crossagent", TASK_ID);
const screenshotPath = resolve(artifactDir, "crossagent-production-draft-first-v5.png");
const expectedStrings = [
  "CrossAgent production draft-first smoke v5",
  "Evidence verified before ready review",
  "No manual intervention required",
];
const viewport = { width: 1280, height: 900 };

async function assertInFirstViewport(locator, label) {
  const box = await locator.boundingBox();
  assert.ok(box, `${label} should have a visible bounding box`);
  assert.ok(box.x >= 0, `${label} should start inside the viewport horizontally`);
  assert.ok(box.y >= 0, `${label} should start inside the first viewport vertically`);
  assert.ok(box.x + box.width <= viewport.width, `${label} should fit inside the viewport width`);
  assert.ok(box.y + box.height <= viewport.height, `${label} should fit inside the first viewport height`);
}

await mkdir(artifactDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport });

try {
  await page.goto(pathToFileURL(pagePath).href);

  for (const text of expectedStrings) {
    const locator = page.getByText(text, { exact: true });
    await locator.waitFor({ state: "visible" });
    await assertInFirstViewport(locator, text);
  }

  const marker = page.getByTestId("success-check-marker");
  await marker.waitFor({ state: "visible" });
  assert.equal(await marker.isVisible(), true, "success/check marker should be visible");
  await assertInFirstViewport(marker, "success/check marker");

  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`Screenshot captured: ${screenshotPath}`);
} finally {
  await browser.close();
}
