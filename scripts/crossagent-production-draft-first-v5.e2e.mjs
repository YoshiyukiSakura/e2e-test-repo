import { mkdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const taskRoot = process.env.TASK_ROOT || process.cwd();
const taskId = process.env.CROSSAGENT_TASK_ID || "task_84acc0fd2c8c4cd5";
const pagePath = path.join(taskRoot, "public", "crossagent-production-draft-first-v5.html");
const artifactDir = path.join(taskRoot, ".iteration", "crossagent", taskId);
const screenshotPath = path.join(
  artifactDir,
  "crossagent-production-draft-first-v5.png",
);

async function assertVisible(locator, label) {
  await locator.waitFor({ state: "visible", timeout: 5000 });
  if (!(await locator.isVisible())) {
    throw new Error(`${label} was not visible`);
  }
}

await mkdir(artifactDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

try {
  await page.goto(pathToFileURL(pagePath).href);

  await assertVisible(
    page.getByText("CrossAgent production draft-first smoke v5"),
    "title text",
  );
  await assertVisible(
    page.getByText("Evidence verified before ready review"),
    "evidence text",
  );
  await assertVisible(
    page.getByText("No manual intervention required"),
    "manual intervention text",
  );
  await assertVisible(page.getByTestId("success-check-marker"), "success check marker");

  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`screenshot=${screenshotPath}`);
} finally {
  await browser.close();
}
