import { test, expect } from "@playwright/test";

test.describe("layout/header", () => {
  test("elements visible in header", async ({ page }) => {
    await page.goto("/", {
      waitUntil: "networkidle",
    });
    await page.getByText("France").click();
    await page.waitForLoadState("networkidle");

    const siteHeader = page.getByRole("banner");

    // Logos zone
    expect(
      siteHeader.getByAltText(
        "République française, liberté égalité fraternité"
      )
    ).toBeVisible();
    expect(siteHeader.getByAltText("Pix")).toBeVisible();

    // Locale switcher visibility
    expect(siteHeader.getByLabel("Choix de la langue")).toBeVisible();

    // Actions zone
    expect(siteHeader.getByText("Entrer un code")).toBeVisible();
    expect(siteHeader.getByText("Connexion")).toBeVisible();
    expect(siteHeader.getByText("Inscription", { exact: true })).toBeVisible();

    // Navigation zone
    expect(
      siteHeader.locator("nav").filter({
        hasText: "Accueil",
      })
    ).toBeVisible();
  });

  test("main navigation behaviour", async ({ page }) => {
    await page.goto("/", {
      waitUntil: "networkidle",
    });
    await page.getByText("France").click();
    await page.waitForLoadState("networkidle");

    await page.getByRole("button", { name: "Découvrir Pix" }).click();

    await page.getByText("Défis et compétences").click();

    await expect(page).toHaveURL(/.*les-tests/);

    await page.getByText("Accueil").click();

    await expect(page).toHaveURL(/.*/);
  });

  test("skip link", async ({ page }) => {
    await page.goto("/", {
      waitUntil: "networkidle",
    });
    await page.getByText("France").click();
    await page.waitForLoadState("networkidle");

    const skipLink = await page.getByText("Aller au contenu");
    expect(skipLink).not.toBeInViewport();

    await page.keyboard.down("Tab");
    await page.waitForTimeout(500);

    expect(skipLink).toBeInViewport();

    await page.waitForTimeout(500);
    await page.keyboard.down("Enter");

    expect(page).toHaveURL(/#main/);
  });
});
