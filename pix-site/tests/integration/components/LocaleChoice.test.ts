import { render, screen } from '@testing-library/vue';

import LocaleChoice from '~/components/LocaleChoice.vue';

const localeNames = ['English', 'Français'];

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
    localeNames.forEach((localeName) => {
      expect(screen.findByText(localeName)).toBeTruthy();
    });
  });
});
