const { getCurrentSiteHost } = require('~/services/get-current-site-host')

describe('getCurrentSiteHost', () => {
  let savedProcessEnvSite
  beforeEach(() => {
    savedProcessEnvSite = process.env.SITE
  })

  afterEach(() => {
    process.env.SITE = savedProcessEnvSite
  })

  test('should return pix.fr if `SITE` env variable is `pix-site` and locale `fr-fr`', () => {
    process.env.SITE = 'pix-site'
    expect(getCurrentSiteHost('fr-fr')).toBe('pix.fr')
  })

  test('should return pix.org if `SITE` env variable is `pix-site` and locale not `fr-fr`', () => {
    process.env.SITE = 'pix-site'
    expect(getCurrentSiteHost('fr')).toBe('pix.org')
  })

  test('should return pro.pix.fr if `SITE` env variable is `pix-pro`', () => {
    process.env.SITE = 'pix-pro'
    expect(getCurrentSiteHost()).toBe('pro.pix.fr')
  })
})
