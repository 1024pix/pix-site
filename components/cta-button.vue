<template>
  <div class="cta-button">
    <a :href="link">{{ name }}</a>
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
  background: #3d68ff;
  color: #ffffff;
  border-radius: 5px;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  letter-spacing: 0.03rem;

  :hover {
    transition: opacity 0.5s ease-out;
    background: $blue-3;
  }

  :visited {
    color: #ffffff;
  }

  &:hover:after {
    opacity: 1;
  }
}
</style>
