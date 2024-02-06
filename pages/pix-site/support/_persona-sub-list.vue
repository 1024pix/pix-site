<template>
  <div class="personas-sub-list">
    <support-header
      :title="currentPersona.name[0].text"
      :icon="currentPersona.icon.url"
      back-link="/support"
    />
    <h2 class="personas-sub-list__subtitle">{{ $t('support.title') }}</h2>
    <ul class="personas-sub-list__children">
      <li
        v-for="personaChild in currentPersonaChildren"
        :key="personaChild.slug"
      >
        <support-persona-card :data="personaChild" />
      </li>
    </ul>
  </div>
</template>

<script>
import { DOCUMENTS } from '~/services/document-fetcher'
import SupportPersonaCard from '~/components/SupportPersonaCard.vue'

export default {
  name: 'SupportParentPersona',
  components: {
    SupportPersonaCard,
  },
  nuxtI18n: {
    paths: {
      en: '/support/:parent_persona_name',
      fr: '/support/:parent_persona_name',
      'fr-fr': '/support/:parent_persona_name',
      'fr-be': '/support/:parent_persona_name',
    },
  },
  async asyncData({ app, error, route }) {
    try {
      const locale = app.i18n.locale || app.i18n.defaultLocale

      const queryCurrentPersona = await app.$prismic.api.getSingle(
        DOCUMENTS.SUPPORT_PERSONA_PAGE,
        { lang: locale }
      )

      const currentPersonaData = queryCurrentPersona.data.body.find((item) => {
        return item.primary.slug === route.params.parent_persona_name
      })

      const currentPersonaChildren = currentPersonaData.items.map((persona) => {
        return persona.sub_persona.id
      })

      const queryChildrenPersona = await app.$prismic.api.getByIDs(
        currentPersonaChildren,
        { lang: locale }
      )

      const subPersonas = queryChildrenPersona.results.map((persona) => {
        return {
          sub_slug: persona.uid,
          icon: persona.data.icon,
          name: persona.data.persona_name,
        }
      })

      return {
        currentPersona: currentPersonaData.primary,
        currentPersonaChildren: subPersonas,
      }
    } catch (err) {
      console.error(err)
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

<style lang="scss">
.personas-sub-list {
  padding-bottom: 2rem;
  background-color: $grey-10;
}

.personas-sub-list__subtitle {
  margin-top: 2rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  color: $grey-90;
}

.personas-sub-list__children {
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
