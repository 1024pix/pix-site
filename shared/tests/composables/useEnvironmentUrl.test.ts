import useEnvironmentUrl from '../../composables/useEnvironmentUrl';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
const { getEnvironmentUrl } = useEnvironmentUrl();

const DOMAIN = 'https://pro.pix';

describe('#getEnvironmentUrl', () => {
  describe('on Dev or Test environment', () => {
    beforeEach(() => {
      mockNuxtImport('useRuntimeConfig', () => {
        return () => {
          return {
            public: {
              site: `${DOMAIN}.`,
            },
          };
        };
      });
    });

    test('.fr', () => {
      expect(getEnvironmentUrl(`${DOMAIN}.fr`)).toBe('/');
    });

    test('.org/fr', () => {
      expect(getEnvironmentUrl(`${DOMAIN}.org/fr/`)).toBe('/fr/');
    });

    test('.org/fr-be', () => {
      expect(getEnvironmentUrl(`${DOMAIN}.org/fr-be/`)).toBe('/fr-be/');
    });

    test('.org/en', () => {
      expect(getEnvironmentUrl(`${DOMAIN}.org/en/`)).toBe('/en/');
    });
  });

  describe('on Production environment', () => {
    beforeEach(() => {
      vi.stubEnv('NODE_ENV', 'production');

      mockNuxtImport('useRuntimeConfig', () => {
        return () => {
          return {
            public: {
              site: `${DOMAIN}.`,
            },
          };
        };
      });
    });

    test('.fr', () => {
      expect(getEnvironmentUrl(`${DOMAIN}.fr`)).toBe(`${DOMAIN}.fr`);
    });

    test('.org/fr', () => {
      expect(getEnvironmentUrl(`${DOMAIN}.org/fr/`)).toBe(`${DOMAIN}.org/fr/`);
    });

    test('.org/fr-be', () => {
      expect(getEnvironmentUrl(`${DOMAIN}.org/fr-be/`)).toBe(`${DOMAIN}.org/fr-be/`);
    });

    test('.org/en', () => {
      expect(getEnvironmentUrl(`${DOMAIN}.org/en/`)).toBe(`${DOMAIN}.org/en/`);
    });
  });
});
