import { filterNuxtPages } from '../../services/filter-nuxt-pages';
import { vi } from 'vitest';

describe('FilterNuxtPages', () => {
  describe('when is french domain', () => {
    it('should return only locale home at root path', function () {
      // given
      vi.stubEnv('SITE_DOMAIN', 'FR');

      const routes = [
        { name: 'locale_home___fr-fr', path: '/' },
        { name: 'index', path: '/' },
        { name: 'foo', path: '/foo' },
      ];

      // when
      filterNuxtPages(routes);

      // then
      expect(routes).toEqual([
        { name: 'locale_home___fr-fr', path: '/' },
        { name: 'foo', path: '/foo' },
      ]);
    });
  });

  describe('when is international domain', () => {
    it('should return routes as is', function () {
      // given
      vi.stubEnv('SITE_DOMAIN', 'NOT_FR');

      const routes = [
        { name: 'locale_home___fr', path: '/fr/' },
        { name: 'index', path: '/' },
        { name: 'foo', path: '/foo' },
      ];

      // when
      filterNuxtPages(routes);

      // then
      expect(routes).toEqual([
        { name: 'locale_home___fr', path: '/fr/' },
        { name: 'index', path: '/' },
        { name: 'foo', path: '/foo' },
      ]);
    });
  });
});
