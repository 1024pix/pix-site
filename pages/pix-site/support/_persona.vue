<template>
  <div class="persona">
    <section class="persona__header">
      <div class="persona-header__wrapper">
        <nuxt-link to="/support" class="persona-header__back-button">
          <fa icon="arrow-left" />
          {{ $t('back') }}
        </nuxt-link>
        <img
          v-if="currentPersona.data.icon"
          class="persona-header__icon"
          :src="currentPersona.data.icon.url"
          alt=""
        />
        <h1 class="persona-header__title">
          {{ currentPersona.data.name[0].text }}
        </h1>
      </div>
    </section>
    <h2 class="persona__subtitle">{{ $t('support.title') }}</h2>
    <ul class="persona__children">
      <li v-for="child in currentPersonaChildren" :key="child.uid">
        <support-persona-card :data="child.data" />
      </li>
    </ul>
  </div>
</template>

<script>
import { DOCUMENTS } from '~/services/document-fetcher'
import SupportPersonaCard from '~/components/SupportPersonaCard.vue'

export default {
  name: 'SupportPersona',
  components: {
    SupportPersonaCard,
  },
  nuxtI18n: {
    paths: {
      en: '/support/persona/:uri',
      fr: '/support/persona/:uri',
      'fr-fr': '/support/persona/:uri',
      'fr-be': '/support/persona/:uri',
    },
  },
  async asyncData({ app, error, route }) {
    try {
      const locale = app.i18n.locale || app.i18n.defaultLocale
      const documents = await app.$prismic.api.query(
        [
          app.$prismic.predicates.at(
            'document.type',
            DOCUMENTS.SUPPORT_PERSONA_PAGE
          ),
        ],
        { lang: locale }
      )

      const currentPersona = documents.results.find(
        (item) => item.uid === route.params.uri
      )

      const currentPersonaChildren = documents.results.filter((item) => {
        return item.data.parent_persona.slug === currentPersona.uid
      })

      return { currentPersona, currentPersonaChildren }
    } catch (error) {
      console.error(error)
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

<style lang="scss">
.persona {
  padding-bottom: 2rem;
  background-color: $grey-10;
}

.persona__header {
  background-color: #613fdd;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.persona-header__wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem 1rem 2.5rem 1rem;
  color: white;
}

.persona-header__title {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.3;
}

.persona-header__icon {
  filter: brightness(0) invert(1);
  margin-bottom: 1rem;
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.persona-header__back-button {
  align-self: flex-start;
  color: white;
  font-family: $font-roboto;
  margin-bottom: 0.25rem;

  &:hover {
    text-decoration: underline;
  }
}

.persona__subtitle {
  margin-top: 2rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  color: $grey-90;
}

.persona__children {
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
