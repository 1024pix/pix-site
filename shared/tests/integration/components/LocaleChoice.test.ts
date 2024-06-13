import { render, screen } from '@testing-library/vue';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';

import LocaleChoice from '~/components/LocaleChoice.vue';
import { reachableLocales } from '~/i18n.config.ts';

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
    },
    app: {
      baseURL: 'https://example.org',
    },
  });
});

describe('LocaleChoice', () => {
  beforeEach(() => {
    render(LocaleChoice);
  });

  test('displays a link for each locale', () => {
    // then
    const links = screen.getAllByRole('link');
    expect(links.length).equals(5);
  });

  test('displays the name of each locale', () => {
    // then
    reachableLocales.forEach((locale) => {
      expect(screen.findByText(locale.name)).toBeTruthy();
    });
  });
});
