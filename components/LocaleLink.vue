<template>
  <a class="locale-link" :href="indexForGivenLocale()">
    <img :src="'/images/' + locale.icon" alt="" />
    <span class="locale-link__text">{{ locale.name }}</span>
  </a>
</template>

<script>
import { getAbsoluteUrlIfSwitchWebsite } from '~/services/get-absolute-url-if-switch-website'

export default {
  name: 'LocaleLink',
  props: {
    locale: {
      type: Object,
      default: null,
    },
  },
  methods: {
    indexForGivenLocale() {
      return getAbsoluteUrlIfSwitchWebsite({
        relativeTarget:
          this.locale.code === 'fr-fr' ? '/' : `/${this.locale.code}`,
        targetDomain: this.locale.domain,
      })
    },
  },
}
</script>

<style scoped lang="scss">
.locale-link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.8);
  transition: background-color ease-out 320ms;
  box-shadow: $shadow-xs;
  border-radius: 16px;
  font-family: $font-roboto;
  font-weight: $font-medium;
  font-size: 18px;
  color: $grey-90;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }

  &:focus,
  &:active {
    transition: none;
    background: rgba(193, 199, 208, 0.6);
  }

  &__text {
    overflow-wrap: break-word;
  }
}
</style>
