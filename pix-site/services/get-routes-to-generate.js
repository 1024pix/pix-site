import * as prismic from '@prismicio/client';
import { linkResolver } from '../../shared/services/link-resolver.js';

export const getRoutesToGenerate = async function ({ locales }) {
  const client = await prismic.createClient('https://pix-site.cdn.prismic.io/api/v2');

  // Fetching the first page to get the total page count
  const { routes, totalPages } = await getRoutesInPage(client, 1, locales);

  // … then fetching as many pages as needed based on total page count
  for (let page = 2; page <= totalPages; page++) {
    const { routes: nextPageRoutes } = await getRoutesInPage(client, page, locales);
    routes.push(...nextPageRoutes);
  }

  // Is it really needed?
  if (process.env.SITE_DOMAIN === 'FR') {
    routes.push('/support/');
    routes.push('/actualites/');
  }

  // Is it really needed?
  if (process.env.SITE_DOMAIN === 'ORG') {
    routes.push('/');

    routes.push('/fr/support/');
    routes.push('/fr-be/support/');
    routes.push('/en/support/');
    routes.push('/nl-be/support/');

    routes.push('/fr/actualites/');
    routes.push('/fr-be/actualites/');
    routes.push('/en/news/');

    // Added for consistency but it doesn’t seem to be needed
    routes.push('/es/actualidad/');
    routes.push('/it/notizie/');
    routes.push('/de-AT/aktuelles/');
  }

  console.info(`${routes.length} routes will be generated`);
  return routes;
};

async function getRoutesInPage(prismicClient, page, locales) {
  const supportPageFilter = [
    prismic.filter.not('document.type', 'support__faq_post'),
    prismic.filter.not('document.type', 'support__persona_faq'),
  ];

  const { results, total_pages: totalPages } = await prismicClient.get({
    filters: [
      prismic.filter.at('document.tags', ['pix-site']),
      prismic.filter.not('document.tags', ['fragment']),
      ...supportPageFilter,
    ],
    pageSize: 100,
    page,
    lang: '*',
  });
  const localesToBuild = locales.map(({ code }) => code);

  const routes = results
    .filter(({ uid, type }) => {
      return Boolean(uid) || type === 'personas_list';
    })
    .filter(({ lang }) => localesToBuild.includes(lang))
    .flatMap(linkResolver);

  return { totalPages, routes };
}
