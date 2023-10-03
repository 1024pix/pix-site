import { test, expect } from "@playwright/test";

test.describe("layout/header", () => {
  test("elements visible in header", async ({ page }) => {
    await page.goto("/");

    const siteHeader = page.getByRole("banner");

    // Logos zone
    expect(
      siteHeader.getByAltText(
        "République française, liberté égalité fraternité"
      )
    ).toBeVisible();
    expect(siteHeader.getByAltText("Pix")).toBeVisible();

    // Locale switcher visibility
    expect(siteHeader.getByRole("button", { name: "France" })).toBeVisible();

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
    await page.goto("/");

    await page.getByRole("button", { name: "France" }).click();

    await page.getByRole("button", { name: /international /i });

    // await page.getByText("English").click();

    await expect(page).toHaveURL(new RegExp("$/en"));
  });
});
