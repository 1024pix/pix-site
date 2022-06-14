const { getCurrentSiteHost } = require('~/services/get-current-site-host')

describe('getCurrentSiteHost', () => {
  let savedProcessEnvSite
  beforeEach(() => {
    savedProcessEnvSite = { ...process.env.SITE }
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
    expect(getCurrentSiteHost('fr-fr')).toBe('pro.pix.fr')
  })

  test('should return pro.pix.org if `SITE` env variable is `pix-pro` and locale is not `fr-fr`', () => {
    process.env.SITE = 'pix-pro'
    expect(getCurrentSiteHost('fr')).toBe('pro.pix.org')
  })

  describe('when withPrefix is true', () => {
    test('should return pix.fr if `SITE` env variable is `pix-site` and locale `fr-fr`', () => {
      process.env.SITE = 'pix-site'
      expect(getCurrentSiteHost('fr-fr', true)).toBe('https://pix.fr')
    })

    test('should return pix.org if `SITE` env variable is `pix-site` and locale not `fr-fr`', () => {
      process.env.SITE = 'pix-site'
      expect(getCurrentSiteHost('fr', true)).toBe('https://pix.org')
    })

    test('should return pro.pix.fr if `SITE` env variable is `pix-pro`', () => {
      process.env.SITE = 'pix-pro'
      expect(getCurrentSiteHost('fr-fr', true)).toBe('https://pro.pix.fr')
    })

    test('should return pro.pix.org if `SITE` env variable is `pix-pro` and locale is not `fr-fr`', () => {
      process.env.SITE = 'pix-pro'
      expect(getCurrentSiteHost('fr', true)).toBe('https://pro.pix.org')
    })
  })
})
