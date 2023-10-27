import { test, expect } from "@playwright/test";

test.describe("component/locale-switcher", () => {
  test("should redirect and add locale cookie", async ({ page }) => {
    await test.step("Go to french homepage", async () => {
      // When
      await page.goto("/", {
        waitUntil: "networkidle",
      });

      await page.getByText("France").click();
      await page.waitForLoadState("networkidle");

      // Then
      await expect(page).toHaveURL(/.*/);

      expect(page.getByRole("link", { name: "France" })).toHaveAttribute(
        "aria-current",
        "page"
      );

      const cookies = await page.context().cookies();
      const localeCookie = cookies.find((c) => c.name == "locale");
      await expect(localeCookie).toHaveProperty("value", "fr-fr");
    });

    await test.step("Go to english homepage", async () => {
      // When
      await page.getByLabel("Choix de la langue").click();

      await page.getByLabel("Liste des sites internationaux").click();

      await page.getByText("English").click();
      await page.waitForLoadState("networkidle");

      // Then
      await expect(page).toHaveURL(/.*en/);

      expect(
        page.getByRole("link", { name: "English", includeHidden: true })
      ).toHaveAttribute("aria-current", "page");

      const cookies = await page.context().cookies();
      const localeCookie = cookies.find((c) => c.name == "locale");
      await expect(localeCookie).toHaveProperty("value", "en");
    });
  });
});
