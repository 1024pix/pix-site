import currentPagePath from '~/middleware/current-page-path'

describe('Middlewares | current-page-path', () => {
  let oldProcessEnv

  beforeEach(() => {
    oldProcessEnv = { ...process.env }
  })

  afterEach(() => {
    process.env = oldProcessEnv
  })

  const cases = [
    {
      locale: 'fr-fr',
      site: 'pix-site',
      path: '/test',
      expectedResult: 'https://pix.fr/test',
    },
    {
      locale: 'fr',
      site: 'pix-site',
      path: '/fr/test',
      expectedResult: 'https://pix.org/fr/test',
    },
    {
      locale: 'fr-fr',
      site: 'pix-pro',
      path: '/test',
      expectedResult: 'https://pro.pix.fr/test',
    },
    {
      locale: 'fr',
      site: 'pix-pro',
      path: '/fr/test',
      expectedResult: 'https://pro.pix.org/fr/test',
    },
  ]

  cases.forEach(({ locale, site, path, expectedResult }) => {
    it(`should return ${expectedResult} when locale is ${locale} and site is ${site}`, () => {
      // given
      const context = {
        app: {
          i18n: {
            locale,
          },
        },
        route: { path },
        currentPagePath: null,
      }
      process.env.SITE = site

      // when
      currentPagePath(context)

      // then
      expect(context.currentPagePath).toEqual(expectedResult)
    })
  })
})
