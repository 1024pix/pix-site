<template>
  <div>
    <formable-page
      :title="'pix-orga-higher-school-registration.page-title'"
      :form-id="$t('pix-orga-higher-school-registration.form-id')"
      :height="'1300px'"
    />
  </div>
</template>

<script>
import FormablePage from '@/components/FormablePage'

export default {
  name: 'PixOrgaHigherSchoolRegistration',
  components: { FormablePage },
  nuxtI18n: {
    paths: {
      fr: '/formulaire/finalisation-pix-orga-sup',
      'fr-fr': '/formulaire/finalisation-pix-orga-sup',
      'en-gb': '/form/pix-orga-higher-school-registration',
    },
  },
  head() {
    const pageTitle = this.$t('page-titles.pix-orga-higher-school-registration')
    return {
      title: pageTitle,
    }
  },
}
</script>

<style lang="scss"></style>
