import { vi } from 'vitest';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';

import useGeolocationActions from '../../composables/useGeolocationActions.js';

const { useFetchMock } = vi.hoisted(() => {
  return {
    useFetchMock: vi.fn().mockImplementation(() => {}),
  };
});

mockNuxtImport('useFetch', () => {
  return useFetchMock;
});

describe('#useGeolocationActions', () => {
  describe('#shouldRedirectToFrFr', () => {
    describe('when domain is pix.fr', () => {
      beforeEach(() => {
        mockNuxtImport('useRuntimeConfig', () => {
          return () => ({
            public: {
              siteDomain: 'FR',
            },
          });
        });
      });

      describe('when user is in France', () => {
        beforeEach(() => {
          useFetchMock.mockImplementation(async () => {
            return {
              pending: false,
              error: undefined,
              country: 'FR',
            };
          });
        });

        describe('when path is /fr-fr', () => {
          test('tells to not redirect', async () => {
            // given
            const currentUrl = 'https://example.net/fr-fr';

            // when
            const { shouldRedirectToFrFr } = await useGeolocationActions(currentUrl, useFetch);

            // then
            expect(shouldRedirectToFrFr).toBe(false);
          });
        });
      });

      describe('when user is in Belgium', () => {
        beforeEach(() => {
          useFetchMock.mockImplementation(async () => {
            return {
              pending: false,
              error: undefined,
              country: 'BE',
            };
          });
        });

        describe('when path is /fr-fr', () => {
          test('tells to not redirect', async () => {
            // given
            const currentUrl = 'https://example.net/fr-fr';

            // when
            const { shouldRedirectToFrFr } = await useGeolocationActions(currentUrl, useFetch);

            // then
            expect(shouldRedirectToFrFr).toBe(false);
          });
        });

        describe('when path is not /fr-fr', () => {
          test('tells to not redirect', async () => {
            // given
            const currentUrl = 'https://example.net/fr-be';

            // when
            const { shouldRedirectToFrFr } = await useGeolocationActions(currentUrl, useFetch);

            // then
            expect(shouldRedirectToFrFr).toBe(false);
          });
        });
      });
    });

    describe('when domain is pix.org', () => {
      beforeEach(() => {
        mockNuxtImport('useRuntimeConfig', () => {
          return () => ({
            public: {
              siteDomain: 'ORG',
            },
          });
        });
      });

      describe('when user is in France', () => {
        beforeEach(() => {
          useFetchMock.mockImplementation(async () => {
            return {
              pending: false,
              error: undefined,
              country: 'FR',
            };
          });
        });

        describe('when user is on locale selection page', () => {
          test('tells to redirect', async () => {
            // given
            const currentUrl = 'https://example.net/';

            // when
            const { shouldRedirectToFrFr } = await useGeolocationActions(currentUrl, useFetch);

            // then
            expect(shouldRedirectToFrFr).toBe(true);
          });
        });

        describe('when user is on french home page', () => {
          test('tells to not redirect', async () => {
            // given
            const currentUrl = 'https://example.net/fr-fr/';

            // when
            const { shouldRedirectToFrFr } = await useGeolocationActions(currentUrl, useFetch);

            // then
            expect(shouldRedirectToFrFr).toBe(false);
          });
        });

        describe('when user is on another "fr-fr" page', () => {
          test('tells to not redirect', async () => {
            // given
            const currentUrl = 'https://example.net/fr-fr/les-tests';

            // when
            const { shouldRedirectToFrFr } = await useGeolocationActions(currentUrl, useFetch);

            // then
            expect(shouldRedirectToFrFr).toBe(false);
          });
        });

        describe('when user is on a "en" page', () => {
          test('tells to not redirect', async () => {
            // given
            const currentUrl = 'https://example.net/en/the-tests';

            // when
            const { shouldRedirectToFrFr } = await useGeolocationActions(currentUrl, useFetch);

            // then
            expect(shouldRedirectToFrFr).toBe(false);
          });
        });
      });

      describe('when user is in Belgium', () => {
        beforeEach(() => {
          useFetchMock.mockImplementation(async () => {
            return {
              pending: false,
              error: undefined,
              country: 'BE',
            };
          });
        });

        describe('when path is locale selection page', () => {
          test('tells to not redirect', async () => {
            // given
            const currentUrl = 'https://example.net/fr-fr';

            // when
            const { shouldRedirectToFrFr } = await useGeolocationActions(currentUrl, useFetch);

            // then
            expect(shouldRedirectToFrFr).toBe(false);
          });
        });

        describe('when path is not /fr-fr', () => {
          test('tells to not redirect', async () => {
            // given
            const currentUrl = 'https://example.net/fr-be';

            // when
            const { shouldRedirectToFrFr } = await useGeolocationActions(currentUrl, useFetch);

            // then
            expect(shouldRedirectToFrFr).toBe(false);
          });
        });
      });
    });
  });

  describe('#showOutOfFranceBanner', () => {
    describe('when domain is pix.fr', () => {
      beforeEach(() => {
        mockNuxtImport('useRuntimeConfig', () => {
          return () => ({
            public: {
              siteDomain: 'FR',
            },
          });
        });
      });

      describe('when user is in France', () => {
        beforeEach(() => {
          useFetchMock.mockImplementation(async () => {
            return {
              pending: false,
              error: undefined,
              country: 'FR',
            };
          });
        });

        test('tells to display a banner', async () => {
          // given
          const currentUrl = 'https://example.net/whatever-url';

          // when
          const { showOutOfFranceBanner } = await useGeolocationActions(currentUrl, useFetch);

          // then
          expect(showOutOfFranceBanner).toBe(false);
        });
      });

      describe('when user is in Belgium', () => {
        beforeEach(() => {
          useFetchMock.mockImplementation(async () => {
            return {
              pending: false,
              error: undefined,
              country: 'BE',
            };
          });
        });

        test('tells to not display a banner', async () => {
          // given
          const currentUrl = 'https://example.net/whatever-url';

          // when
          const { showOutOfFranceBanner } = await useGeolocationActions(currentUrl, useFetch);

          // then
          expect(showOutOfFranceBanner).toBe(true);
        });
      });
    });
  });
});
