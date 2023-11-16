import { test, expect } from "@playwright/test";

test.describe("layout/header", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", {
      waitUntil: "networkidle",
    });

    await page.getByText("France").click();
    await page.waitForLoadState("networkidle");
  });

  test("should display elements visible in header", async ({ page }) => {
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

  test("should display main desktop navigation", async ({ page, context }) => {
    await page.getByRole("button", { name: "Vous êtes ?" }).click();

    expect(
      await page.locator('css=[aria-describedby="description-2"]')
    ).toBeVisible();
    expect(await page.locator("css=#description-2")).toBeVisible();
    expect(await page.getByText("Éducation", { exact: true })).toBeVisible();

    await page.getByRole("link", { name: "Élève, étudiant" }).click();

    await expect(page).toHaveURL(/.*enseignement-scolaire/);
    await expect(page).toHaveTitle("Enseignement scolaire | Pix");
    expect(await page.getByRole("button", { name: "Vous êtes ?" })).toHaveClass(
      /current-active-link/
    );

    expect(await page.getByText("Évaluer", { exact: true })).toBeHidden();
  });

  test.describe("on mobile", () => {
    test.use({
      viewport: { width: 360, height: 640 },
    });
    test("should display main mobile navigation", async ({ page, context }) => {
      const burgerMenu = page.locator("#menu");

      await test.step("when burger-button is clicked, it should toggle menu", async () => {
        await page.getByRole("button", { name: "Ouvrir le menu" }).click();
        await burgerMenu
          .getByRole("button", { name: "Fermer le menu" })
          .click();
        expect(
          await burgerMenu.getByRole("button", { name: "Vous êtes ?" })
        ).toBeHidden();
      });

      await test.step("when burger-button is clicked, it should display menu", async () => {
        await page.getByRole("button", { name: "Ouvrir le menu" }).click();

        expect(
          burgerMenu.getByAltText(
            "République française, liberté égalité fraternité"
          )
        ).toBeVisible();
        expect(
          burgerMenu.getByRole("button", { name: "Changer la langue France" })
        ).toBeVisible();
        expect(
          burgerMenu.getByRole("link", { name: "Entrer un code" })
        ).toBeVisible();
        expect(
          burgerMenu.getByRole("link", { name: "Connexion" })
        ).toBeVisible();
        expect(
          burgerMenu.getByRole("link", { name: "Inscription" })
        ).toBeVisible();
      });

      await test.step("when burger-button is clicked, it should display sections and links", async () => {
        await burgerMenu.getByRole("button", { name: "Vous êtes ?" }).click();

        expect(await burgerMenu.getByText("Éducation")).toBeVisible();
        expect(
          await burgerMenu.getByRole("link", { name: "Élève, étudiant" })
        ).toBeVisible();
      });

      await test.step("when link is clicked, it should redirect and close menu", async () => {
        await burgerMenu.getByRole("link", { name: "Élève, étudiant" }).click();

        await expect(page).toHaveURL(/.*enseignement-scolaire/);
        await expect(page).toHaveTitle("Enseignement scolaire | Pix");

        expect(
          await page.getByLabel("Navigation principale").getByText("Éducation")
        ).toBeHidden();
      });
    });
  });

  test("should display skip link", async ({ page }) => {
    await page.goto("/", {
      waitUntil: "networkidle",
    });
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
