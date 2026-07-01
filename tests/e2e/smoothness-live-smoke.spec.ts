import { expect, test } from "@playwright/test";
import path from "node:path";

const pagePath = path.resolve(__dirname, "../../public/smoothness-live-smoke-20260701-234104.html");
const evidenceDir = process.env.CROSSAGENT_EVIDENCE_DIR;

test("smoothness live smoke page renders required evidence", async ({ page }) => {
  await page.goto(`file://${pagePath}`);

  await expect(page.getByText("CrossAgent smoothness live smoke")).toBeVisible();
  await expect(page.getByText("Stable paid evidence image host")).toBeVisible();
  await expect(page.getByText("smoothness-live-smoke-20260701-234104")).toBeVisible();

  const marker = page.getByRole("img", { name: "Success check marker" });
  await expect(marker).toBeVisible();
  await expect(marker).toHaveText("✓");

  const screenshotPath = path.join(
    evidenceDir ?? test.info().outputDir,
    "smoothness-live-smoke-20260701-234104.png",
  );
  await page.screenshot({ path: screenshotPath, fullPage: true });
  test.info().annotations.push({ type: "screenshot", description: screenshotPath });
});
