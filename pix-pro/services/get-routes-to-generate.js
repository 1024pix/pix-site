import * as prismic from "@prismicio/client";
import { locales } from "../../shared/i18n.config.ts";
import { linkResolver } from "../../shared/services/link-resolver.js";

export const getRoutesToGenerate = async function() {
  const client = await prismic.createClient("https://pix-site.cdn.prismic.io/api/v2");
  const { routes, totalPages } = await getRoutesInPage(client, 1);

  for (let page = 2; page <= totalPages; page++) {
    const { routes: nextPageRoutes } = await getRoutesInPage(client, page);
    routes.push(...nextPageRoutes);
  }

  console.info(`${routes.length} routes will be generated`);
  return routes;
};

async function getRoutesInPage(prismicClient, page) {
  const { results, total_pages: totalPages } = await prismicClient.get({
      filters: [
        prismic.filter.at("document.tags", ["pix-pro"]),
        prismic.filter.not("document.tags", ["fragment"])
      ],
      pageSize: 100,
      page,
      lang: "*"
    }
  );
  const localesToBuild = locales.map(
    ({ code }) => code
  );

  const filteredRoutesPromise = results
    .filter(({ uid }) => Boolean(uid))
    .filter(({ lang }) => localesToBuild.includes(lang))
    .map(linkResolver);

  const routes = await Promise.all(filteredRoutesPromise);

  return { totalPages, routes };
}
