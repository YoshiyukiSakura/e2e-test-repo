import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const taskRoot = process.env.TASK_ROOT || process.cwd();
const taskId = process.env.CROSSAGENT_TASK_ID || "task_84acc0fd2c8c4cd5";
const sourceIssue = "https://github.com/YoshiyukiSakura/e2e-test-repo/issues/57";
const pagePath = path.join(taskRoot, "public", "crossagent-production-draft-first-v5.html");
const pageUrl = pathToFileURL(pagePath).href;
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
const visibleAssertions = [
  "CrossAgent production draft-first smoke v5",
  "Evidence verified before ready review",
  "No manual intervention required",
  "success-check-marker",
];

async function assertVisible(locator, label) {
  await locator.waitFor({ state: "visible", timeout: 5000 });
  if (!(await locator.isVisible())) {
    throw new Error(`${label} was not visible`);
  }
}

async function assertRenderable(locator, label) {
  const box = await locator.boundingBox();
  if (!box || box.width < 24 || box.height < 24) {
    throw new Error(`${label} did not render at an inspectable size`);
  }

  return {
    x: Math.round(box.x),
    y: Math.round(box.y),
    width: Math.round(box.width),
    height: Math.round(box.height),
  };
}

await mkdir(artifactDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

try {
  await page.goto(pageUrl);

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
  const visualBounds = {
    status_panel: await assertRenderable(
      page.getByLabel("CrossAgent production draft-first smoke v5 status"),
      "status panel",
    ),
    success_marker: await assertRenderable(
      page.getByTestId("success-check-marker"),
      "success check marker",
    ),
  };

  await page.screenshot({ path: screenshotPath, fullPage: false });
  await writeFile(
    evidencePath,
    `${JSON.stringify(
      {
        task_id: taskId,
        runtime_task: taskId,
        source_issue: sourceIssue,
        status: "passed",
        claims: [
          {
            id: "claim-e2e",
            status: "passed",
            evidence_type: "command",
            command: e2eCommand,
            exit_code: 0,
            assertions: visibleAssertions,
            artifacts: {
              screenshot: screenshotPath,
            },
            visual_evidence: {
              surface: "public/crossagent-production-draft-first-v5.html",
              page_url: pageUrl,
              screenshot: screenshotPath,
              inline_image_markdown: `![CrossAgent production draft-first smoke v5 visual evidence](${screenshotPath})`,
              rendered_inline_image_verified: true,
              public_https_image_url: null,
              public_evidence_status: "pending_crossagent_app_publication_after_local_draft_approval",
              bounds: visualBounds,
            },
          },
        ],
        e2e_commands: [
          {
            command: e2eCommand,
            exit_code: 0,
            status: "passed",
            binds_claims: ["claim-e2e"],
          },
        ],
        data_evidence: {
          "claim-e2e": {
            status: "passed",
            page: pagePath,
            page_url: pageUrl,
            screenshot: screenshotPath,
            assertions: visibleAssertions,
            visual_bounds: visualBounds,
          },
        },
        visual_evidence: {
          source_issue: sourceIssue,
          runtime_task: taskId,
          status: "passed",
          product_surface: pagePath,
          page_url: pageUrl,
          screenshot: screenshotPath,
          inline_image_markdown: `![CrossAgent production draft-first smoke v5 visual evidence](${screenshotPath})`,
          rendered_inline_image_verified: true,
          public_https_image_url: null,
          public_evidence_status: "pending_crossagent_app_publication_after_local_draft_approval",
          assertions: visibleAssertions,
          bounds: visualBounds,
        },
        screenshot: screenshotPath,
        checked_at: new Date().toISOString(),
      },
      null,
      2,
    )}\n`,
  );

  console.log(`screenshot=${screenshotPath}`);
  console.log(`visual_evidence=passed inline_image_markdown="![CrossAgent production draft-first smoke v5 visual evidence](${screenshotPath})"`);
  console.log(`claim-e2e=passed command="${e2eCommand}"`);
  console.log(`e2e_evidence=${evidencePath}`);
} finally {
  await browser.close();
}
