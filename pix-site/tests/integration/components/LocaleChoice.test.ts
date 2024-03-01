import { render, screen } from '@testing-library/vue'

import LocaleChoice from "~/components/LocaleChoice.vue";
import { reachableLocales } from "~/i18n.config.ts";

describe('LocaleChoice', () => {
  beforeEach(() => {
    render(LocaleChoice);
  })

  test('displays a link for each locale', () => {
    // then
    const links = screen.getAllByRole('link');
    expect(links.length).equals(5);
  })

  test('displays the name of each locale', () => {
    // then
    reachableLocales.forEach(locale => {
      expect(screen.findByText(locale.name)).toBeTruthy();
    })
  })
})
