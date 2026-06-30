import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { expect, test } from "@playwright/test";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const pagePath = path.join(repoRoot, "visual-smoke", "no-touch-loop-v3.html");
const artifactDir =
  process.env.CROSSAGENT_ARTIFACT_DIR ||
  path.join(repoRoot, ".iteration", "crossagent", "task_3fa9576092374d17");

test("no-touch loop v3 visual markers render", async ({ page }) => {
  await page.goto(pathToFileURL(pagePath).href);

  await expect(page.getByText("VISUAL_DELTA_20260630_V3")).toBeVisible();
  await expect(page.locator("footer")).toHaveText("No-touch loop v3");

  const main = page.locator("main");
  await expect(main).toHaveCSS("border-top-color", "rgb(34, 197, 94)");
  await expect(page.locator(".marker")).toHaveCSS("color", "rgb(217, 70, 239)");
  await expect(page.locator(".navy-block")).toHaveCSS("background-color", "rgb(30, 58, 138)");

  await mkdir(artifactDir, { recursive: true });
  await page.screenshot({
    path: path.join(artifactDir, "no-touch-loop-v3.png"),
    fullPage: true
  });
});
