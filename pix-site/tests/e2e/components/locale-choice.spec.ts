import { test, expect } from '@playwright/test';

test.describe('component/locale-choice', () => {
  test.describe('when the user visits general home page', () => {
    test('the locale choice should be visible', async ({ page }) => {
      // when
      await page.goto('/', {
        waitUntil: 'networkidle',
      });

      await page.getByText('English').click();
      await page.waitForLoadState('networkidle');

      // then
      expect(page.url()).toContain('/en');

      const cookies = await page.context().cookies();
      const localeCookie = cookies.find(c => c.name == 'locale');
      await expect(localeCookie).toHaveProperty('value', 'en');
    });
  });

  test.describe('[En] when the user visits the locale home page', () => {
    test('the locale choice should not be visible and locale cookie should not be set', async ({ page }) => {
      // when
      await page.goto('/en', {
        waitUntil: 'networkidle',
      });

      await page.waitForLoadState('networkidle');

      // then
      expect(await page.getByLabel('Choice of language').innerText()).toBe('English');

      expect(page.getByRole('link', { name: 'English', includeHidden: true })).toHaveAttribute('aria-current', 'page');

      const cookies = await page.context().cookies();
      await expect(cookies).not.toContain('locale');
    });
  });
});
