import { test, expect } from "@playwright/test";

test.use({
  viewport: { width: 1600, height: 1200 },
});

test.describe("layout/header", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", {
      waitUntil: "networkidle",
    });

    await page.getByText("France").click();
    await page.waitForLoadState("networkidle");
  });

  test("elements visible in header", async ({ page }) => {
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

  test("main navigation behaviour", async ({ page, context }) => {
    await page.getByRole("button", { name: "Découvrir Pix" }).click();

    expect(
      await page.locator('css=[aria-describedby="description-1"]')
    ).toBeVisible();
    expect(await page.locator("css=#description-1")).toBeVisible();
    expect(await page.getByText("Évaluer", { exact: true })).toBeVisible();

    await page.getByRole("link", { name: "Les tests Pix" }).click();

    await expect(page).toHaveURL(/.*les-tests/);
    await expect(page).toHaveTitle("Les tests | Pix");
    expect(await page.getByText("Découvrir Pix",{ exact: true })).toHaveClass(/current-active-link/);

    expect(await page.getByText("Évaluer", { exact: true })).toBeHidden();
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
