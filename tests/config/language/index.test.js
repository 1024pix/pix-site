describe('#language', () => {
  let config, languageForPixSite, languageForPixPro
  beforeEach(() => {
    jest.resetModules()
    config = require('~/config/environment').config
    languageForPixSite = require('~/config/language/pix-site').language
    languageForPixPro = require('~/config/language/pix-pro').language

    jest.mock('~/config/environment', () => {
      return {
        config: {
          isPixSite: false,
        },
      }
    })

    jest.mock('~/config/language/pix-site', () => {
      return { language: Symbol('pix-site language') }
    })

    jest.mock('~/config/language/pix-pro', () => {
      return { language: Symbol('pix-pro language') }
    })
  })

  describe('when it is pix site', () => {
    it('should return language menu and locales dependant of site', () => {
      // given
      config.isPixSite = true

      // when
      const { language } = require('~/config/language')

      // then
      expect(language).toEqual(languageForPixSite)
    })
  })

  describe('when it is pix pro', () => {
    it('should return language menu and locales dependant of site', () => {
      // given
      config.isPixSite = false

      // when
      const { language } = require('~/config/language')

      // then
      expect(language).toEqual(languageForPixPro)
    })
  })
})
