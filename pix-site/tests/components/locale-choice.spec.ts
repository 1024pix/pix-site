import { test, expect } from "@playwright/test";

test.describe("component/locale-choice", () => {
  test.describe("when the user visits general home page", () => {
    test("the locale choice should be visible", async ({ page }) => {
      // when
      await page.goto("/", {
        waitUntil: "networkidle",
      });

      await page.getByText("English").click();
      await page.waitForLoadState("networkidle");

      // then
      expect(page.url()).toContain("/en");

      const cookies = await page.context().cookies();
      const localeCookie = cookies.find((c) => c.name == "locale");
      await expect(localeCookie).toHaveProperty("value", "en");
    });
  });

  test.describe("[En] when the user visits home page", () => {
    test("the locale choice should not be visible", async ({ page }) => {
      // when
      await page.goto("/en", {
        waitUntil: "networkidle",
      });

      const localeSwitcherButton = page.getByLabel("Choice of language");

      expect(await localeSwitcherButton.innerText()).toBe("English");

      await localeSwitcherButton.click();
      await page.waitForLoadState("networkidle");
      await page.getByLabel("International languages list").click();

      // then
      expect(page.getByRole("link", { name: "English" })).toHaveAttribute(
        "aria-current",
        "page"
      );

      const cookies = await page.context().cookies();
      await expect(cookies).not.toContain("locale");
    });
  });
});
