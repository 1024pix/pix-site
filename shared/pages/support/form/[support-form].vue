<template>
  <template v-if="data">
    <easiware-form v-if="data.supportForm.useEasiwareForm" :solution-id="data.supportForm.solution_id" :form-id="data.supportForm.form_id">
      <h1 v-if="data.supportForm.form_title?.length" class="easiware-form__title">
        {{ data.supportForm.form_title?.[0].text }}
      </h1>
      <prismic-rich-text
        v-if="data.supportForm.form_introduction?.length"
        :field="data.supportForm.form_introduction"
        class="easiware-form__introduction"
      />
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p class="easiware-form__required-info" v-html="t('support.form.required-info')" />
    </easiware-form>
    <freescout-form v-else :freescout-url="data.supportForm.freescout_url.url" :height-for-iframe="data.supportForm.freescout_height">
      <h1 v-if="data.supportForm.form_title?.length" class="easiware-form__title">
        {{ data.supportForm.form_title?.[0].text }}
      </h1>
      <prismic-rich-text
        v-if="data.supportForm.form_introduction?.length"
        :field="data.supportForm.form_introduction"
        class="easiware-form__introduction"
      />
    </freescout-form>
  </template>
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
    'fr-FR': '/support/form/[slug]',
    'fr-BE': '/support/form/[slug]',
    'nl-BE': '/support/form/[slug]',
    es: '/support/form/[slug]',
    it: '/support/form/[slug]',
    'de-AT': '/support/form/[slug]',
  },
});

/* Fetch form data */
const { data } = await useAsyncData(async () => {
  try {
    if (!route.params.slug) {
      throw new Error('Missing slug for route:', route.params);
    }

    const supportForm = await client.getByUID('easiware_form', route.params.slug, {
      lang: i18nLocale.value,
    });
    supportForm.data.useEasiwareForm = !supportForm.data.freescout_url.url;
    return { supportForm: supportForm.data };
  } catch (err) {
    console.warn(err);
    error({ statusCode: 404, message: 'Page not found' });
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
