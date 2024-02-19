import { test, expect } from '@playwright/test'

test.describe('layout/header', () => {

  test('should display elements visible in header', async ({ page }) => {
    await page.goto('http://localhost:7002/', {
      waitUntil: 'networkidle'
    })

    const siteHeader = page.getByRole('banner')

    // Logos zone
    expect(
      siteHeader.getByAltText(
        'République française, liberté égalité fraternité'
      )
    ).toBeVisible()
    expect(siteHeader.getByAltText('Pix')).toBeVisible()

    // Locale switcher visibility
    expect(siteHeader.getByLabel('Choix de la langue')).toBeVisible()

    // Navigation zone
    expect(
      siteHeader.locator('nav').filter({
        hasText: 'Accueil'
      })
    ).toBeVisible()
  })

  test('should display skip link', async ({ page }) => {
    await page.goto('/fr', {
      waitUntil: 'networkidle'
    })

    const skipLink = await page.getByText('Aller au contenu')
    await expect(skipLink).not.toBeInViewport()

    await page.keyboard.down('Tab')

    await expect(skipLink).toBeInViewport()

    await page.keyboard.down('Enter')

    await page.waitForLoadState('networkidle')

    expect(page).toHaveURL(/#main/)
  })
})
