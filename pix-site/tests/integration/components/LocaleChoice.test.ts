import { render, screen } from '@testing-library/vue';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';

import LocaleChoice from '~/components/LocaleChoice.vue';

const availableLocales = [
  {
    code: 'en',
    iso: 'en',
    file: 'en.js',
    name: 'English',
    icon: 'globe-europe.svg',
    domain: 'https://example.org/',
  },
  {
    code: 'fr',
    iso: 'fr',
    file: 'fr.js',
    name: 'Français',
    icon: 'globe-europe.svg',
    domain: 'https://example.org/',
  },
  {
    code: 'fr-fr',
    iso: 'fr-fr',
    file: 'fr-fr.js',
    name: 'France',
    icon: 'flag-fr.svg',
    domain: 'https://example.fr/',
  },
  {
    code: 'fr-be',
    iso: 'fr-be',
    file: 'fr-be.js',
    name: 'Belgique (Français)',
    icon: 'flag-be.svg',
    domain: 'https://example.org/',
  },
  {
    code: 'nl-be',
    iso: 'nl-be',
    file: 'nl-be.js',
    name: 'België (Nederlands)',
    icon: 'flag-be.svg',
    domain: 'https://example.org/',
  },
];

describe('LocaleChoice', () => {
  beforeEach(() => {
    mockNuxtImport('useRuntimeConfig', () => {
      return () => {
        return {
          public: {
            availableLocales,
          },
        };
      };
    });
  });

  test('displays a link for each locale', () => {
    // when
    render(LocaleChoice);

    // then
    const links = screen.getAllByRole('link');
    expect(links.length).equals(availableLocales.length);
  });

  test('displays the name of each locale', () => {
    // given
    const localeNames = ['English', 'Français'];

    // when
    render(LocaleChoice);

    // then
    localeNames.forEach((localeName) => {
      expect(screen.findByText(localeName)).toBeTruthy();
    });
  });
});
