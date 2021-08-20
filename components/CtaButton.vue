<template>
  <pix-link :field="link" class="cta-button">
    {{ name }}
  </pix-link>
</template>

<script>
export default {
  name: 'CtaButton',
  props: {
    link: {
      type: Object,
      default: null,
    },
    name: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.cta-button {
  background: $blue;
  display: flex;
  flex-wrap: wrap;
  border-radius: 5px;
  padding: 15px 20px;
  cursor: pointer;
  border: 2px solid transparent;
  color: $white;
  line-height: 2.75rem;
  letter-spacing: 0.03rem;
  font-weight: $font-semi-bold;

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
</style>
