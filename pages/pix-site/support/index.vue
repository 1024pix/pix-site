<template>
  <div class="support">
    <section class="support__header">
      <div class="support-header__wrapper">
        <h1 class="support-header__title">
          {{ $t('support.title') }}
        </h1>
        <p class="support-header__subtitle">{{ $t('support.subtitle') }}</p>
      </div>
    </section>
    <ul class="support__personas">
      <li v-for="persona in mainPersonas" :key="persona.uri">
        <support-persona-card :data="persona" />
      </li>
    </ul>
  </div>
</template>
<script>
import { DOCUMENTS } from '~/services/document-fetcher'
import SupportPersonaCard from '~/components/SupportPersonaCard.vue'

export default {
  name: 'Support',
  components: {
    SupportPersonaCard,
  },
  nuxtI18n: {
    paths: {
      en: '/support',
      fr: '/support',
      'fr-fr': '/support',
      'fr-be': '/support',
    },
  },
  async asyncData({ app, error, req }) {
    try {
      const locale = app.i18n.locale || app.i18n.defaultLocale

      const supportPage = await app.$prismic.api.getSingle(
        DOCUMENTS.SUPPORT_PERSONA_PAGE,
        { lang: locale }
      )

      const mainPersonas = supportPage?.data.body.map(
        (persona) => persona.primary
      )

      return { mainPersonas }
    } catch (err) {
      console.error({ err })
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(400px, 100%), 1fr));
  gap: 1rem;
  max-width: 1280px;
  margin: 1.5rem auto 0;
  padding: 0 16px;
  list-style: none;

  li {
    padding: 0;
  }

  li::before {
    content: none;
  }
}
</style>
