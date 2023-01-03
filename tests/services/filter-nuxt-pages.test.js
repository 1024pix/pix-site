import { filterNuxtPages } from '~/services/filter-nuxt-pages'

describe('FilterNuxtPages', () => {
  describe('when is french domain', () => {
    it('should return only locale home at root path', function () {
      // given
      const config = {
        isPixSite: true,
        isFrenchDomain: true,
      }
      const routes = [
        { name: 'locale_home___fr-fr', path: '/' },
        { name: 'index', path: '/' },
        { name: 'foo', path: '/foo' },
      ]

      // when
      const filteredRoutes = filterNuxtPages(routes, config)

      // then
      expect(filteredRoutes).toEqual([
        { name: 'locale_home___fr-fr', path: '/' },
        { name: 'foo', path: '/foo' },
      ])
    })
  })

  describe('when is international domain', () => {
    it('should return routes as is', function () {
      // given
      const config = {
        isPixSite: true,
        isFrenchDomain: false,
      }
      const routes = [
        { name: 'locale_home___fr', path: '/fr/' },
        { name: 'index', path: '/' },
        { name: 'foo', path: '/foo' },
      ]

      // when
      const filteredRoutes = filterNuxtPages(routes, config)

      // then
      expect(filteredRoutes).toEqual([
        { name: 'locale_home___fr', path: '/fr/' },
        { name: 'index', path: '/' },
        { name: 'foo', path: '/foo' },
      ])
    })
  })
})
