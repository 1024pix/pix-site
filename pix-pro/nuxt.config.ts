import { getRoutesToGenerate } from './services/get-routes-to-generate';
import i18nConfig, { reachableLocales, reachableLocaleCodes } from './i18n.config';

export default async () => {
  return defineNuxtConfig({
    extends: ['../shared'],
    hooks: {
      async 'nitro:config'(nitroConfig) {
        if (process.env.NODE_ENV === 'test') return;
        const routes = await getRoutesToGenerate({ locales: i18nConfig.locales });
        // @ts-ignore
        nitroConfig.prerender.routes = routes;
      },
    },
    devServer: {
      port: Number(process.env.PORT) || 6001,
    },
    modules: ['@nuxtjs/prismic', '@nuxtjs/i18n', '@vueuse/nuxt', 'nuxt-image-prismic-fix'],
    image: {
      domains: [
        'pix-site.cdn.prismic.io',
        'storage.gra.cloud.ovh.net',
        'prismic-io.s3.amazonaws.com',
        'images.prismic.io',
      ],
    },
    runtimeConfig: {
      public: {
        site: 'https://pro.pix.',
        availableLocales: reachableLocales,
        availableLocaleCodes: reachableLocaleCodes,
      },
    },
    nitro: {
      prerender: {
        crawlLinks: false,
      },
    },
    i18n: i18nConfig,
  });
};
