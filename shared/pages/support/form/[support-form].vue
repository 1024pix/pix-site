<template>
  <easiware-form :solution-id="data.supportForm.solution_id" :form-id="data.supportForm.form_id">
    <h1 v-if="data.supportForm.form_title?.length" class="easiware-form__title">
      {{ data.supportForm.form_title?.[0].text }}
    </h1>
    <prismic-rich-text v-if="data.supportForm.form_introduction?.length" :field="data.supportForm.form_introduction"
      class="easiware-form__introduction" />
    <p class="easiware-form__required-info" v-html="t('support.form.required-info')" />
  </easiware-form>
</template>

<script setup>
const { client } = usePrismic();
const { locale: i18nLocale, t } = useI18n();
const route = useRoute();

/* I18n Routes */
defineI18nRoute({
  paths: {
    en: '/support/form/[slug]',
    fr: '/support/form/[slug]',
    'fr-fr': '/support/form/[slug]',
    'fr-be': '/support/form/[slug]',
  },
});

/* Fetch form data */
const { data } = await useAsyncData(async () => {
  try {
    const supportForm = await client.getByUID(
      'easiware_form',
      route.params.slug,
      {
        lang: i18nLocale.value,
      }
    )
    return { supportForm: supportForm.data }
  } catch (err) {
    console.error(err)
    error({ statusCode: 404, message: 'Page not found' })
  }
});
</script>

<style lang="scss" scoped>
.easiware-form__title {
  margin-bottom: 1em;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: $grey-90;
}

.easiware-form__introduction {
  margin: -0.5rem 0 2.5rem;
  color: $grey-60;
  font-family: $font-roboto;
}

.easiware-form__required-info {
  color: $grey-90;
  font-family: $font-roboto;
  font-size: 0.875rem;
  font-weight: 500;
}
</style>

<style lang="scss">
.easiware-form__required-info span {
  font-weight: 500;
  color: $red;
}

#easiwareform {
  font-family: $font-roboto;
  line-height: 1.25;
}

#easiwareform:empty::after {
  content: '⏳ Chargement du formulaire...';
  display: block;
  text-align: center;
  font-family: $font-open-sans;
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
