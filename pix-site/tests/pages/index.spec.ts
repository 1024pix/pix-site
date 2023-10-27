import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/", {
    waitUntil: "networkidle",
  });

  await page.getByText("France").click();
  await page.waitForLoadState("networkidle");
});

test("Popup video in banner", async ({ page }) => {
  await test.step("Open video from banner", async () => {
    // When
    await page.getByRole("button", { name: "Voir la vidéo" }).click();

    await page.waitForTimeout(500);

    const video = await page.locator("video");
    expect(video).toBeVisible();
  });

  await test.step("Close video modal by Escape keypress", async () => {
    // When
    await page.keyboard.down("Escape");

    expect(page.locator("video")).not.toBeVisible();
  });
});

test("Demo block", async ({ page }) => {
  await page.getByRole("link", { name: "Commencer" }).click();
  await page.waitForURL("**/app.pix.fr/**");
  expect(page.url()).toContain("app.pix.fr");
});

test("News block", async ({ page }) => {
  expect(page.getByText("Nos actualités")).toBeVisible();

  await page.locator(".news-item-card__link").first().click();
  await page.waitForURL("**/actualites/**");
  expect(page.url()).toContain("/actualites/");
});
