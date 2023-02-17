import { test, expect } from '@playwright/test'

test.describe('robot.txt', () => {
  test('should be present', async ({ page }) => {
    const response = await page.goto('/robots.txt')

    expect(response.status()).toBe(200)
  })
})
