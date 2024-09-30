<template>
  <div class="personas-sub-list">
    <support-header
      :title="data.currentPersona.name[0].text"
      :icon="data.currentPersona.icon.url"
      :back-link="backLink"
    />
    <h2 class="personas-sub-list__subtitle">
      {{ data.currentPersona.sub_persona_title[0].text }}
    </h2>
    <ul v-if="data.currentPersonaChildren.length" class="personas-sub-list__children">
      <li v-for="personaChild in data.currentPersonaChildren" :key="personaChild.slug">
        <support-persona-card :content="personaChild" />
      </li>
    </ul>
  </div>
</template>

<script setup>
const route = useRoute();
const { client } = usePrismic();
const { locale: i18nLocale } = useI18n();

/* I18n Routes */
defineI18nRoute({
  paths: {
    en: '/support/[parent_persona_name]',
    fr: '/support/[parent_persona_name]',
    'fr-fr': '/support/[parent_persona_name]',
    'fr-be': '/support/[parent_persona_name]',
    'nl-be': '/support/[parent_persona_name]',
  },
});

const backLink = computed(() => {
  const localeUrl = i18nLocale.value !== 'fr-fr' ? `/${i18nLocale.value}` : '';
  return `${localeUrl}/support`;
});

/* Fetch personas list */
const { data } = await useAsyncData(async () => {
  try {
    const queryCurrentPersona = await client.getSingle('personas_list', { lang: i18nLocale.value });

    const currentPersonaData = queryCurrentPersona.data.body.find((item) => {
      return item.primary.slug === route.params.parent_persona_name;
    });

    const currentPersonaChildren = currentPersonaData.items
      .filter(item => item.sub_persona.id)
      .map(persona => persona.sub_persona.id);

    const queryChildrenPersona = await client.getByIDs(currentPersonaChildren, { lang: i18nLocale.value });

    const subPersonas = queryChildrenPersona.results.map((persona) => {
      return {
        sub_slug: persona.uid,
        icon: persona.data.icon,
        name: persona.data.persona_name,
      };
    });

    return {
      currentPersona: currentPersonaData.primary,
      currentPersonaChildren: subPersonas,
    };
  } catch (err) {
    console.error(err);
    error({ statusCode: 404, message: 'Page not found' });
  }
});
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
