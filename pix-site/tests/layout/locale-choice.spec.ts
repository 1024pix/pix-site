import { test, expect } from "@playwright/test";

test.describe("locale-choice", () => {
    test.describe("when the user visits english home page",()=>{
        test("the locale choice should not be visible", async ({ page }) => {
            // when
            await page.goto("/en", {
                waitUntil: "networkidle",
            });
            const localeSwitcher = page.getByLabel("Choice of language");

            // then
            expect(localeSwitcher).toBeVisible();

            // when
            await page.getByText("English").click();
            await page.waitForLoadState("networkidle");
            await page.getByLabel("International languages list").click();
            const activeLink = await page.locator('[aria-current="page"]');

            // then
            expect(await activeLink.textContent()).toEqual('English')
        });
    })
});
