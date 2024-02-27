import { vi } from 'vitest';
import { mockNuxtImport } from "@nuxt/test-utils/runtime";

import useLocaleCookie from "../../composables/useLocaleCookie";

mockNuxtImport('useCookie', () => {
  return () => ({
    value: ''
  });
});

describe("#useLocaleCookie", () => {
  test('returns a locale cookie and a "setLocaleCookie" function', () => {
    // when
    const { localeCookie, setLocaleCookie } = useLocaleCookie();

    // then
    expect(localeCookie.value).toEqual('');
    expect(setLocaleCookie).toBeTypeOf("function");
  })

  describe('setLocaleCookie', () => {
    describe("when callback is passed in parameter", () => {
      test('calls callback', () => {
        // given
        const callback = vi.fn(() => {}) as Function;
        const { setLocaleCookie } = useLocaleCookie()

        // when
        setLocaleCookie('fr', callback);

        // then
        expect(callback).toHaveBeenCalledTimes(1)
      });
    });

    test('sets cookie with the value passed in parameter', () => {
      // given
      const { localeCookie, setLocaleCookie } = useLocaleCookie();

      // when
      setLocaleCookie('nl-BE');

      // then
      expect(localeCookie.value).toEqual('nl-BE');
    })
  })
})
