import { test, expect } from "@playwright/test";

test.describe("layout/footer", () => {
  test("visible elements", async ({ page }) => {
    await page.goto("/", {
      waitUntil: "networkidle",
    });
    await page.getByText("France").click();
    await page.waitForLoadState("networkidle");

    const siteFooter = page.getByRole("contentinfo");

    expect(siteFooter).toBeVisible();
  });
});
