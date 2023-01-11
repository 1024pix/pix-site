<template>
  <ul v-if="showSubMenu" class="locale-switcher__dropdown-menu child">
    <li
      v-for="availableLocale in availableLocales"
      :key="availableLocale.key"
      :class="{
        'locale-switcher__dropdown-menu--active':
          availableLocale.localeCode === currentLocaleCode,
      }"
    >
      <div class="locale-switcher__locale">
        <pix-link :href="getIndexUrl(availableLocale)">
          {{ $t(availableLocale.name) }}
        </pix-link>
      </div>
    </li>
  </ul>
</template>

<script>
import { getAbsoluteUrlIfSwitchWebsite } from '~/services/get-absolute-url-if-switch-website'
import { localization } from '~/config/localization'

export default {
  name: 'LocaleSwitcherSubMenu',
  props: {
    showSubMenu: {
      type: Boolean,
      default: false,
    },
    availableLocales: {
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
      const locale = localization.locales.find(
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
