<template>
  <div>
    <formable-page
      :title="'pix-orga-registration.page-title'"
      :form-id="$t('pix-orga-registration.form-id')"
      :height="'1000px'"
    />
  </div>
</template>

<script>
import FormablePage from '~/components/formable-page'

export default {
  name: 'PixOrgaRegistration',
  components: { FormablePage },
  nuxtI18n: {
    paths: {
      fr: '/formulaire/contact-pix-pro',
      'fr-fr': '/formulaire/contact-pix-pro',
      'en-gb': '/form/pix-orga-registration',
    },
  },
  head() {
    const pageTitle = this.$t('page-titles.pix-orga-registration')
    return {
      title: pageTitle,
    }
  },
}
</script>

<style lang="scss"></style>
