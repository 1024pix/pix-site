import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/fr', {
    waitUntil: 'networkidle'
  })
})

test('Popup video in banner', async ({ page }) => {
  await test.step('Open video from banner', async () => {
    // When
    await page.getByRole('button', { name: 'Voir la vidéo' }).click()

    const video = await page.locator('video')
    await expect(video).toBeVisible()
  })

  await test.step('Close video modal by Escape keypress', async () => {
    // When
    await page.keyboard.down('Escape')

    expect(page.locator('video')).not.toBeVisible()
  })
})
