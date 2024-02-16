<template>
  <div class="support-contact">
    <h2 class="support-contact__title">
      {{ $t('support.faq.contact-title') }}
    </h2>
    <nuxt-link :to="contactLink" class="support-contact__link">
      {{ $t('support.faq.contact-cta') }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'SupportContact',
  props: {
    contactLink: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
.support-contact {
  margin-top: 2rem;
  padding: 2rem;
  background: white;
  border: 1px solid $grey-22;
  border-radius: 0.5rem;
  text-align: center;
}

.support-contact__title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 1rem;
}

.support-contact__link {
  display: inline-block;
  padding: 0.75em 1.5em;
  background-color: #613fdd;
  border-radius: 2rem;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    background: $blue;
  }
}
</style>
