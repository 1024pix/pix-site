<template>
  <ul v-if="showSubMenu" class="locale-switcher__dropdown-menu child">
    <li
      v-for="availableLanguage in availableLanguages"
      :key="availableLanguage.key"
      :class="{
        'locale-switcher__dropdown-menu--active':
          availableLanguage.localeCode === currentLocaleCode,
      }"
    >
      <div class="locale-switcher__locale">
        <pix-link :href="getIndexUrl(availableLanguage)">
          {{ $t(availableLanguage.name) }}
        </pix-link>
      </div>
    </li>
  </ul>
</template>

<script>
import { getAbsoluteUrlIfSwitchWebsite } from '~/services/get-absolute-url-if-switch-website'
import { language } from '~/config/language'

export default {
  name: 'LocaleSwitcherSubMenu',
  props: {
    showSubMenu: {
      type: Boolean,
      default: false,
    },
    availableLanguages: {
      type: Array,
      default: null,
    },
    currentLocaleCode: {
      type: String,
      default: 'fr-fr',
    },
    selectedMenu: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    getIndexUrl(menuItem) {
      const locale = language.locales.find(
        (locale) => locale.code === menuItem.localeCode
      )
      return getAbsoluteUrlIfSwitchWebsite({
        relativeTarget: `/${locale.code}`,
        targetDomain: locale.domain,
      })
    },
  },
}
</script>
