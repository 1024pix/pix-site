describe('#localization', () => {
  let config, localizationForPixSite, localizationForPixPro
  beforeEach(() => {
    jest.resetModules()
    config = require('~/config/environment').config
    localizationForPixSite =
      require('~/config/localization/pix-site').localization
    localizationForPixPro =
      require('~/config/localization/pix-pro').localization

    jest.mock('~/config/environment', () => {
      return {
        config: {
          isPixSite: false,
        },
      }
    })

    jest.mock('~/config/localization/pix-site', () => {
      return { localization: Symbol('pix-site localization') }
    })

    jest.mock('~/config/localization/pix-pro', () => {
      return { localization: Symbol('pix-pro localization') }
    })
  })

  describe('when it is pix site', () => {
    it('should return localization menu and locales dependant of site', () => {
      // given
      config.isPixSite = true

      // when
      const { localization } = require('~/config/localization')

      // then
      expect(localization).toEqual(localizationForPixSite)
    })
  })

  describe('when it is pix pro', () => {
    it('should return localization menu and locales dependant of site', () => {
      // given
      config.isPixSite = false

      // when
      const { localization } = require('~/config/localization')

      // then
      expect(localization).toEqual(localizationForPixPro)
    })
  })
})
