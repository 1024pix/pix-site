import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { filterNuxtPages } from './services/filter-nuxt-pages';
import { allowRootPagePrerender } from './services/allow-root-page-prerender';

// This is the same Prismic Repository used for both pix-site and pix-pro.
// The situation is error prone because the Prismic Repository has the same name
// as the pix-site site.
const prismicRepositoryName = 'pix-site';

const sharedDir = dirname(fileURLToPath(import.meta.url));

// Hosts of the images resized by IPX (@nuxt/image)
const imageDomains = [
  'pix-site.cdn.prismic.io',
  'storage.gra.cloud.ovh.net',
  'prismic-io.s3.amazonaws.com',
  'images.prismic.io',
];

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
    // this layer directory (__dirname is not available in ES modules)
    '@shared': sharedDir,
  },
  components: ['@/components', '@shared/components'],
  css: ['@shared/assets/scss/shared.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@shared/assets/scss/globals.scss" as *;',
        },
      },
    },
  },
  devtools: { enabled: true },
  // @nuxt/image (module declared by each site): images resized by IPX, with Prismic image URLs
  // prepared for IPX by the provider, and served by our own /_ipx handler (see serverHandlers)
  image: {
    domains: imageDomains,
    provider: 'prismicIpx',
    providers: {
      prismicIpx: { provider: `${sharedDir}/providers/prismic-ipx.ts` },
    },
  },
  // replaces the /_ipx route of @nuxt/image, to retry the downloads of source images
  serverHandlers: [{ route: '/_ipx/**', handler: `${sharedDir}/server/ipx-handler.ts` }],
  hooks: {
    'pages:extend': filterNuxtPages,
    // runs after @nuxtjs/i18n has set up the prerender options, right before prerendering
    'nitro:build:before': allowRootPagePrerender,
  },
  modules: ['@nuxt/test-utils/module'],
  prismic: {
    clientConfig: {
      accessToken: process.env.PRISMIC_API_TOKEN,
    },
    endpoint: prismicRepositoryName,
    linkResolver: '../shared/services/link-resolver.js',
  },
  runtimeConfig: {
    // options of the /_ipx handler
    pixIpx: {
      domains: imageDomains,
      // SVGs are only sanitized (scripts removed), as IPX 2 did: the default svgo optimization of
      // IPX 4 blocks the prerender for seconds per SVG (about 900 of them), delaying other images.
      svg: { optimize: { plugins: [] } },
    },
    public: {
      easiwareScriptUrl: process.env.EASIWARE_SCRIPT_URL,
      plausible: {
        scriptUrl: process.env.ANALYTICS_SCRIPT_URL,
        siteId: process.env.ANALYTICS_SITE_ID,
      },
      application: process.env.SITE,
    },
  },
  compatibilityDate: '2026-11-12',
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
