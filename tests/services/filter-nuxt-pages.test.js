import { filterNuxtPages } from '~/services/filter-nuxt-pages'

describe('FilterNuxtPages', () => {
  describe('when is french domain', () => {
    it('should return only locale home at root path', function () {
      // given
      const config = {
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

  describe('New support page route', () => {
    describe('When feature toggle is enabled', () => {
      it('Should contain /support/:support-form? route', function () {
        // given
        const config = {
          isFrenchDomain: true,
          featureToggles: {
            isNewSupportPageEnabled: true,
          },
        }
        const routes = [
          {
            name: 'foo',
            path: '/foo',
          },
          {
            name: 'support-support-form',
            path: '/support/:support-form?',
          },
        ]

        // when
        const filteredRoutes = filterNuxtPages(routes, config)

        // then
        expect(filteredRoutes).toEqual([
          {
            name: 'foo',
            path: '/foo',
          },
          {
            name: 'support-support-form',
            path: '/support/:support-form?',
          },
        ])
      })
    })
    describe('When feature toggle is disabled', () => {
      it('Should not contain /support/:support-form? route', function () {
        // given
        const config = {
          isFrenchDomain: true,
          featureToggles: {
            isNewSupportPageEnabled: false,
          },
        }
        const routes = [
          {
            name: 'foo',
            path: '/foo',
          },
          {
            name: 'support-support-form',
            path: '/support/:support-form?',
          },
        ]

        // when
        const filteredRoutes = filterNuxtPages(routes, config)

        // then
        expect(filteredRoutes).toEqual([
          {
            name: 'foo',
            path: '/foo',
          },
        ])
      })
    })
  })
})
