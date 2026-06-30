import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const taskId = "task_1a7e6054c0c44fad";
const artifactDir =
  process.env.CROSSAGENT_ARTIFACT_DIR ??
  resolve(process.cwd(), ".iteration", "crossagent", taskId);

test("reviewer-visible PR body evidence smoke page renders", async ({ page }) => {
  const pageUrl = pathToFileURL(
    resolve(process.cwd(), "public", "crossagent-pr-body-evidence-smoke.html"),
  ).href;

  await page.goto(pageUrl);

  await expect(
    page.getByRole("heading", { name: "CrossAgent PR body evidence smoke" }),
  ).toBeVisible();
  await expect(page.getByText("Reviewer-visible evidence in PR body")).toBeVisible();
  await expect(page.getByText("App audit source preserved")).toBeVisible();

  const successMarker = page.getByTestId("success-marker");
  await expect(successMarker).toBeVisible();
  await expect(successMarker).toContainText("Success:");

  mkdirSync(artifactDir, { recursive: true });
  await page.screenshot({
    path: resolve(artifactDir, "crossagent-pr-body-evidence-smoke.png"),
    fullPage: true,
  });
});
