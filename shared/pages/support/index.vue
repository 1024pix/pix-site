<template>
  <div class="support">
    <section class="support__header">
      <div class="support-header__wrapper">
        <h1 v-if="data.supportPageData?.header_title?.length" class="support-header__title">
          {{ data.supportPageData?.header_title?.[0].text }}
        </h1>
        <p v-if="data.supportPageData?.['header_sub-title']?.length" class="support-header__subtitle">
          {{ data.supportPageData?.['header_sub-title']?.[0].text }}
        </p>
      </div>
    </section>
    <ul class="support__personas">
      <li v-for="persona in data.mainPersonas" :key="persona.uri">
        <support-persona-card :content="persona" />
      </li>
    </ul>
    <div id="hb-chat-widget"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const { client } = usePrismic();
const { locale: i18nLocale, t } = useI18n();

/* I18n Routes */
defineI18nRoute({
  paths: {
    en: '/support',
    fr: '/support',
    'fr-fr': '/support',
    'fr-be': '/support',
    'nl-be': '/support',
  },
});

useHead({
  title: t('support.meta.title'),
  meta: [{ name: 'description', content: t('support.meta.description') }],
  script: [{ crossorigin: '', src: 'https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js' },
    { crossorigin: '', src: 'https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js' },
    { src: 'https://cdn.jsdelivr.net/npm/hexabot-chat-widget@2/dist/hexabot-widget.umd.js' }],
});

onMounted(() => {
  const createElement = (tag, props = {}) => Object.assign(document.createElement(tag), props);
  const shadowContainer = createElement('div');
  console.log(shadowContainer);
  document
    .getElementById('hb-chat-widget')
    .attachShadow({ mode: 'open' })
    .append(
      shadowContainer,
      createElement('link', {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/hexabot-chat-widget@2/dist/style.css',
      }),
    );

  // Render the widget inside the shadow root
  ReactDOM.render(
    React.createElement(HexabotWidget, {
      apiUrl: 'https://chatbot-support.pocllm.pix.digital/api',
      channel: 'web-channel',
      language: i18nLocale?.value?.substr(0, 2) || 'fr',
    }),
    shadowContainer,
  );
});
/* Fetch personas list */
const { data } = await useAsyncData(async () => {
  try {
    const supportPage = await client.getSingle('personas_list', { lang: i18nLocale.value });

    const mainPersonas = supportPage?.data.body.map(persona => persona.primary);

    return {
      supportPageData: supportPage?.data,
      mainPersonas,
    };
  } catch (err) {
    console.error({ err });
    error({ statusCode: 404, message: 'Page not found' });
  }
});
</script>

<style lang="scss">
.support {
  padding-bottom: 2rem;
  background-color: $grey-10;
}

.support__header {
  background-color: #613fdd;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.support-header__wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2.5rem 1rem 2rem;
  color: white;
}

.support-header__title {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.3;
}

.support-header__subtitle {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.3;
}

.support__personas {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1280px;
  margin: 1.5rem auto 0;
  padding: 0 0.5rem;
  list-style: none;

  li {
    width: 33.33%;
    padding: 0.5rem;

    @media (max-width: 1280px) {
      width: min(400px, 50%);
    }

    @media (max-width: 800px) {
      width: min(400px, 100%);
    }
  }

  li::before {
    content: none;
  }
}
</style>
