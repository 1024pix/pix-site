import { vi } from 'vitest';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';

import useLocaleCookie from '../../composables/useLocaleCookie';

const availableLocaleCodes = ['en', 'fr', 'fr-fr'];

mockNuxtImport('useCookie', () => {
  return () => ({
    value: '',
  });
});
mockNuxtImport('useAppConfig', () => {
  return () => ({
    domainFr: 'https://example.fr',
    domainOrg: 'https://example.org',
  });
});
mockNuxtImport('useRuntimeConfig', () => {
  return () => ({
    public: {
      siteDomain: 'ORG',
      availableLocaleCodes,
    },
  });
});

describe('#useLocaleCookie', () => {
  test('returns a locale cookie and a "setLocaleCookie" function', () => {
    // when
    const { localeCookie, setLocaleCookie } = useLocaleCookie();

    // then
    expect(localeCookie.value).toEqual('');
    expect(setLocaleCookie).toBeTypeOf('function');
  });

  describe('setLocaleCookie', () => {
    describe('when callback is passed in parameter', () => {
      test('calls callback', () => {
        // given
        const callback = vi.fn(() => { }) as Function; // eslint-disable-line @typescript-eslint/no-unsafe-function-type

        const { setLocaleCookie } = useLocaleCookie();

        // when
        setLocaleCookie('fr', callback);

        // then
        expect(callback).toHaveBeenCalledTimes(1);
      });
    });

    describe('when passed argument is a locale in BCP 47 canonical format', () => {
      test('sets the cookie with the value', () => {
        // given
        const { localeCookie, setLocaleCookie } = useLocaleCookie();

        // when
        setLocaleCookie('nl-BE');

        // then
        expect(localeCookie.value).toEqual('nl-BE');
      });
    });

    describe('when passed argument is a locale not in BCP 47 canonical format', () => {
      test('sets the cookie with a normalized value', () => {
        // given
        const { localeCookie, setLocaleCookie } = useLocaleCookie();

        // when
        setLocaleCookie('nl-be');

        // then
        expect(localeCookie.value).toEqual('nl-BE');
      });
    });
  });

  describe('getBestMatchingLocale', () => {
    describe('when wanted locale is available', () => {
      test('returns the same locale', () => {
        // given
        const { getBestMatchingLocale } = useLocaleCookie();

        // when
        const matchingLocale = getBestMatchingLocale('fr-fr');

        // then
        expect(matchingLocale).toEqual('fr-fr');
      });
    });

    describe('when wanted locale is unavailable but an available locale with same language is', () => {
      test('returns the same locale', () => {
        // given
        const { getBestMatchingLocale } = useLocaleCookie();

        // when
        const matchingLocale = getBestMatchingLocale('fr-be');

        // then
        expect(matchingLocale).toEqual('fr');
      });
    });

    describe('when wanted locale is unavailable and no available locale with same language is', () => {
      test('returns the first available locale', () => {
        // given
        const { getBestMatchingLocale } = useLocaleCookie();

        // when
        const matchingLocale = getBestMatchingLocale('nl-be');

        // then
        expect(matchingLocale).toEqual('en');
      });
    });
  });
});
