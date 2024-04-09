export function filterNuxtPages(pages) {
  if (process.env.SITE_DOMAIN === 'FR') {
    const indexPage = pages.find((page) => page.name === 'index' && page.path === '/');
    pages.splice(pages.indexOf(indexPage), 1);
  }
}
