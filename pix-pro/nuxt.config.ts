import { getRoutesToGenerate } from './services/get-routes-to-generate';
import i18nConfig, { reachableLocales } from './i18n.config';

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
      port: 7001,
    },
    modules: ['@nuxtjs/prismic', '@nuxtjs/i18n', '@vueuse/nuxt', '@nuxt/image'],
    runtimeConfig: {
      public: {
        site: 'https://pro.pix.',
        availableLocales: reachableLocales,
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
