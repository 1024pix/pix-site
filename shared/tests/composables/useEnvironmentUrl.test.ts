import useEnvironmentUrl from '../../composables/useEnvironmentUrl';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';

const SITE_URL_START = 'https://pix.';

const availableLocaleCodes = ['fr-fr', 'fr', 'en', 'fr-be', 'nl-be'];

describe('#getEnvironmentUrl', () => {
  describe('on development and test environments', () => {
    beforeEach(() => {
      mockNuxtImport('useRuntimeConfig', () => {
        return () => {
          return {
            public: {
              site: `${SITE_URL_START}`,
              availableLocaleCodes,
            },
          };
        };
      });
    });

    test('.fr', () => {
      // when
      const { getEnvironmentUrl } = useEnvironmentUrl();

      // then
      expect(getEnvironmentUrl(`${SITE_URL_START}fr`)).toBe('/fr-fr/');
    });

    test('.fr/les-tests', () => {
      // when
      const { getEnvironmentUrl } = useEnvironmentUrl();

      // then
      expect(getEnvironmentUrl(`${SITE_URL_START}fr/les-tests`)).toBe('/fr-fr/les-tests');
    });

    test('.org', () => {
      // when
      const { getEnvironmentUrl } = useEnvironmentUrl();

      // then
      expect(getEnvironmentUrl(`${SITE_URL_START}org`)).toBe('/fr-fr/');
    });

    test('.org/fr/  ', () => {
      // when
      const { getEnvironmentUrl } = useEnvironmentUrl();

      // then
      expect(getEnvironmentUrl(`${SITE_URL_START}org/fr/`)).toBe('/fr/');
    });

    test('.org/fr-be/', () => {
      // when
      const { getEnvironmentUrl } = useEnvironmentUrl();

      // then
      expect(getEnvironmentUrl(`${SITE_URL_START}org/fr-be/`)).toBe('/fr-be/');
    });

    test('.org/en/', () => {
      // when
      const { getEnvironmentUrl } = useEnvironmentUrl();

      // then
      expect(getEnvironmentUrl(`${SITE_URL_START}org/en/`)).toBe('/en/');
    });
  });

  describe('on production environment', () => {
    beforeEach(() => {
      vi.stubEnv('NODE_ENV', 'production');

      mockNuxtImport('useRuntimeConfig', () => {
        return () => {
          return {
            public: {
              site: `${SITE_URL_START}`,
              availableLocaleCodes,
            },
          };
        };
      });
    });

    test('.fr', () => {
      // when
      const { getEnvironmentUrl } = useEnvironmentUrl();

      // then
      expect(getEnvironmentUrl(`${SITE_URL_START}fr`)).toBe(`${SITE_URL_START}fr/fr-fr/`);
    });

    test('.fr/les-tests', () => {
      // when
      const { getEnvironmentUrl } = useEnvironmentUrl();

      // then
      expect(getEnvironmentUrl(`${SITE_URL_START}fr/les-tests`)).toBe(`${SITE_URL_START}fr/fr-fr/les-tests`);
    });

    test('.org', () => {
      // when
      const { getEnvironmentUrl } = useEnvironmentUrl();

      // then
      expect(getEnvironmentUrl(`${SITE_URL_START}org`)).toBe(`${SITE_URL_START}org/fr-fr/`);
    });

    test('.org/fr/', () => {
      // when
      const { getEnvironmentUrl } = useEnvironmentUrl();

      // then
      expect(getEnvironmentUrl(`${SITE_URL_START}org/fr/`)).toBe(`${SITE_URL_START}org/fr/`);
    });

    test('.org/fr-be/', () => {
      // when
      const { getEnvironmentUrl } = useEnvironmentUrl();

      // then
      expect(getEnvironmentUrl(`${SITE_URL_START}org/fr-be/`)).toBe(`${SITE_URL_START}org/fr-be/`);
    });

    test('.org/en/', () => {
      // when
      const { getEnvironmentUrl } = useEnvironmentUrl();

      // then
      expect(getEnvironmentUrl(`${SITE_URL_START}org/en/`)).toBe(`${SITE_URL_START}org/en/`);
    });
  });
});
