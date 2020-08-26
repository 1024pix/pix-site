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
      type: String,
      default: '',
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
  background: $blue-1;
  border-radius: 5px;
  height: 60px;
  padding: 0 20px;
  cursor: pointer;

  &:hover {
    transition: opacity 0.5s ease-out;
    background: $blue-3;
  }

  &:hover:after {
    opacity: 1;
  }

  & a {
    color: $white;
    line-height: 3.75rem;
    letter-spacing: 0.03rem;
  }
}
</style>
