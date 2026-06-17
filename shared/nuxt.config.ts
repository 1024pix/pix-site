import { resolve } from 'path';
import { filterNuxtPages } from './services/filter-nuxt-pages';

const config = {
  app: {
    head: {
      script: [],
    },
  },
  appConfig: {
    domainFr: process.env.DOMAIN_FR,
    domainOrg: process.env.DOMAIN_ORG,
    site: process.env.SITE,
  },
  alias: {
    '@shared': resolve(__dirname, '../shared'),
  },
  components: ['@/components', '@shared/components'],
  css: ['@shared/assets/scss/shared.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@shared/assets/scss/globals.scss";',
        },
      },
    },
  },
  devtools: { enabled: true },
  hooks: {
    'pages:extend': filterNuxtPages,
  },
  modules: ['@nuxt/test-utils/module'],
  prismic: {
    clientConfig: {
      accessToken: process.env.PRISMIC_API_TOKEN,
    },
    endpoint: 'pix-site',
    linkResolver: '../shared/services/link-resolver.js',
  },
  runtimeConfig: {
    public: {
      easiwareScriptUrl: process.env.EASIWARE_SCRIPT_URL,
      plausible: {
        scriptUrl: process.env.ANALYTICS_SCRIPT_URL,
        siteId: process.env.ANALYTICS_SITE_ID,
      },
      application: process.env.SITE,
    },
  },
  compatibilityDate: '2024-04-03',
};

if (config.runtimeConfig.public.plausible.siteId) {
  if (process.env.NODE_ENV === 'production') {
    config.app.head.script.push({
      type: 'text/javascript',
      src: '/analytics/script.js',
      'data-api': '/analytics/event',
      defer: true,
      'data-domain': config.runtimeConfig.public.plausible.siteId,
    });
  } else {
    config.app.head.script.push({
      type: 'text/javascript',
      src: config.runtimeConfig.public.plausible.scriptUrl,
      defer: true,
      'data-domain': config.runtimeConfig.public.plausible.siteId,
    });
  }
}

export default config;
