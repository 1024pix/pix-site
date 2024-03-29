<template>
  <nuxt-link :to="link" exact class="cta-button" :class="{ 'cta-button--small': isSmall }">
    {{ name }}
  </nuxt-link>
</template>

<script>
export default {
  name: 'CtaButton',
  props: {
    link: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: '',
    },
    isSmall: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.cta-button {
  display: inline-flex;
  flex-wrap: wrap;
  padding: 0.875rem 1.25rem;
  color: $white;
  font-size: 1rem;
  font-weight: $font-semi-bold;
  letter-spacing: 0.03rem;
  background: $blue;
  border-radius: 5px;
  cursor: pointer;
  border: 2px solid transparent;

  &:hover,
  &:focus {
    transition: opacity 0.5s ease-out;
    background: $blue-hover;
    border: 2px solid white;
    box-shadow: 0 0 0 2px $blue-hover;
  }

  &:hover:after {
    opacity: 1;
  }
}

.cta-button--small {
  padding: 0.5em 1em;
  font-size: 0.875rem;
}
</style>
