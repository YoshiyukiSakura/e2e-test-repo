import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const taskId = "task_3d783995de474993";
const screenshotDir = path.join(process.cwd(), ".iteration", "crossagent", taskId);
const screenshotPath = path.join(screenshotDir, "smooth-mode-reload-smoke.png");
const pagePath = path.join(process.cwd(), "public", "crossagent-smooth-mode-reload-smoke.html");

test("smooth mode reload smoke page renders required visual marker", async ({ page }) => {
  await page.goto(pathToFileURL(pagePath).href);

  await expect(page.getByText("CrossAgent smooth mode reload smoke")).toBeVisible();
  await expect(page.getByText("Reviewer routed visual evidence")).toBeVisible();
  await expect(page.getByText("Stable R2 delivery image required")).toBeVisible();
  await expect(page.getByLabel("Success check marker")).toBeVisible();

  mkdirSync(screenshotDir, { recursive: true });
  await page.screenshot({ path: screenshotPath, fullPage: true });
});
