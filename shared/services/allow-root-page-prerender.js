// With the "prefix" strategy (international domain), @nuxtjs/i18n (v9+) adds `/^\/$/` to
// `nitro.prerender.ignore` because it assumes the root path redirects to a locale.
// Our root page (pages/index.vue) is not localized and displays the locale choice,
// so it must still be prerendered.
const ROOT_PATH_RULE_SOURCE = '^\\/$';

export function allowRootPagePrerender(nitro) {
  if (process.env.SITE_DOMAIN !== 'ORG') return;

  const ignore = nitro.options.prerender.ignore ?? [];
  nitro.options.prerender.ignore = ignore.filter(
    rule => !(rule instanceof RegExp && rule.source === ROOT_PATH_RULE_SOURCE),
  );
}
