import { transports } from 'winston'

export default {
  mode: 'universal',
  publicRuntimeConfig: {
    languageSwitchEnabled: process.env.LANGUAGE_SWITCH_ENABLED || false,
    orgDomain: process.env.DOMAIN_ORG || 'pix.org',
  },
  server: {
    port: process.env.PORT || 5000,
  },
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'fr',
    },
    title: 'Pix - Cultivez vos compétences numériques',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700,400i|Roboto:400,500,600',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/i18n.js',
    '~/plugins/components.js',
    '~/plugins/meta.js',
    { src: '~plugins/slide-menu', ssr: false },
    '~plugins/vue-js-modal',
  ],
  /*
   ** Redirections
   */
  serverMiddleware: ['~/middleware/seo.js'],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    ['@nuxtjs/eslint-module', { fix: true }],
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    ['nuxt-i18n', { detectBrowserLanguage: false }],
    '@nuxtjs/moment',
    ['nuxt-matomo', { matomoUrl: 'https://stats.pix.fr/', siteId: 1 }],
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: [
              'faArrowRight',
              'faCalendar',
              'faCheck',
              'faCircle',
              'faCog',
              'faExclamationTriangle',
              'faHome',
              'faPlayCircle',
            ],
          },
        ],
      },
    ],
    [
      'nuxt-winston-log',
      {
        loggerOptions: {
          level: 'debug',
          transports: [new transports.Console()],
        },
      },
    ],
    '@nuxtjs/prismic',
  ],
  moment: {
    locales: ['fr'],
  },
  styleResources: {
    scss: ['assets/scss/app.scss'],
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  i18n: {
    defaultLocale: 'fr-fr',
    locales: [
      {
        code: 'fr-fr',
        file: 'fr-fr.js',
      },
      {
        code: 'fr',
        file: 'fr.js',
      },
      {
        code: 'en-gb',
        file: 'en-gb.js',
      },
    ],
    lazy: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'fr-fr',
    },
  },
  prismic: {
    endpoint: process.env.PRISMIC_API_ENDPOINT,
    linkResolver: '@/plugins/link-resolver',
    htmlSerializer: '@/plugins/html-serializer',
  },
  router: {
    middleware: 'current-page-path',
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
    },
    postcss: {
      plugins: {
        'postcss-url': false,
      },
      preset: {
        autoprefixer: {
          grid: 'autoplace',
        },
        browsers: ['last 2 versions', 'ie 11'],
      },
    },
  },
}
