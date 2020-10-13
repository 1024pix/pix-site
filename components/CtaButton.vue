<template>
  <div class="cta-button">
    <pix-link :field="link">
      {{ name }}
    </pix-link>
  </div>
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
  width: fit-content;
  background: $blue;
  border-radius: 5px;
  padding: 0 20px;
  cursor: pointer;

  &:hover {
    transition: opacity 0.5s ease-out;
    background: $blue-hover;
  }

  &:hover:after {
    opacity: 1;
  }

  & a {
    color: $white;
    line-height: 2.75rem;
    letter-spacing: 0.03rem;
    font-weight: $font-semi-bold;
  }
}
</style>
