import { test, expect } from "@playwright/test";

test.describe("layout/header", () => {
  test("elements visible in header", async ({ page }) => {
    await page.goto("/", {
      waitUntil: "networkidle",
    });

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

  test("language switcher behaviour", async ({ page, context }) => {
    await page.goto("/", {
      waitUntil: "networkidle",
    });

    await page.getByLabel("Choix de la langue").click();

    await page.getByLabel("Liste des sites internationaux").click();

    await page.getByText("English").click();

    await expect(page).toHaveURL(/.*en/);
  });
});
