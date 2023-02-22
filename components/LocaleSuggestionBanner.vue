<template>
  <div v-if="isOpen" class="locale-suggestion-banner">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p v-html="$t('locale-suggestion-banner-text')"></p>
    <img
      class="close"
      src="/images/close-icon.svg"
      alt="Fermer"
      @click.stop="$emit('handleCloseBanner')"
    />
  </div>
</template>

<script>
export default {
  name: 'LocaleSuggestionBanner',
  props: {
    isOpen: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.locale-suggestion-banner {
  top: 0;
  left: 0;
  height: 70px;
  width: 100%;

  color: $white;
  background-color: $black;
  padding: 2px;

  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    text-align: center;
    line-height: 1rem;
    font-size: 0.875rem;
    margin: 0 auto;
  }

  a {
    color: $white;
    text-decoration: underline;
  }
}

.close {
  margin-right: 20px;
  opacity: 0.5;
  transition: 0.5s;
  cursor: pointer;
  height: 20px;

  @media (min-width: 769px) {
    margin-right: 32px;
  }

  &:hover {
    opacity: 1;
  }
}
</style>
