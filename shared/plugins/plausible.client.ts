export default defineNuxtPlugin({
  name: 'plausible',
  hooks: {
    'app:created'() {
      const runtimeConfig = useRuntimeConfig();
      const nuxtApp = useNuxtApp();

      window.plausible
        = window.plausible
        || function (...args) {
          (window.plausible.q = window.plausible.q || []).push(args);
        };

      window.plausible('pageview', {
        props: {
          locale: `${nuxtApp.$i18n.locale.value}`,
          application: runtimeConfig.public.application,
        },
      });
    },
  },
  setup: () => {
    const nuxtApp = useNuxtApp();
    const runtimeConfig = useRuntimeConfig();

    const locale = nuxtApp.$i18n.locale.value;
    const application = runtimeConfig.public.application;
    return {
      provide: {
        pushPlausibleEvent: ({ eventName, props = null, callback = null, interactive = true }): void => {
          window.plausible(eventName, { props: { ...props, locale, application }, callback, interactive });
        },
      },
    };
  },
});
