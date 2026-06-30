import { mkdir, writeFile } from "node:fs/promises";
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
const evidencePath = path.join(
  artifactDir,
  "crossagent-production-draft-first-v5.e2e-evidence.json",
);
const e2eCommand =
  "TASK_ROOT=$(pwd) CROSSAGENT_TASK_ID=task_84acc0fd2c8c4cd5 npm run e2e:production-draft-first-v5";

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
  await writeFile(
    evidencePath,
    `${JSON.stringify(
      {
        task_id: taskId,
        claim_id: "claim-e2e",
        status: "passed",
        e2e_commands: [
          {
            command: e2eCommand,
            exit_code: 0,
            status: "passed",
          },
        ],
        screenshot: screenshotPath,
        checked_at: new Date().toISOString(),
      },
      null,
      2,
    )}\n`,
  );

  console.log(`screenshot=${screenshotPath}`);
  console.log(`claim-e2e=passed`);
  console.log(`e2e_evidence=${evidencePath}`);
} finally {
  await browser.close();
}
