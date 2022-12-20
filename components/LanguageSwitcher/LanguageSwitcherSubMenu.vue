<template>
  <ul
    v-if="!target && showSubMenu"
    class="language-switcher__dropdown-menu child"
  >
    <li
      v-for="availableLanguage in availableLanguages"
      :key="availableLanguage.key"
      :class="{
        'language-switcher__dropdown-menu--active':
          availableLanguage.lang === currentLocaleCode,
      }"
    >
      <div class="language-switcher__lang">
        <a :href="getIndexUrl(availableLanguage)">
          {{ $t(availableLanguage.name) }}
        </a>
      </div>
    </li>
  </ul>
</template>

<script>
import { getAbsoluteUrlIfSwitchWebsite } from '~/services/use-get-absolute-url-if-switch-website'
import { language } from '~/config/language'

export default {
  name: 'LanguageSwitcherSubMenu',
  props: {
    showSubMenu: {
      type: Boolean,
      default: false,
    },
    availableLanguages: {
      type: Array,
      default: null,
    },
    target: {
      type: String,
      default: '',
    },
    isOnPixOrg: {
      type: Boolean,
      default: false,
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
        (locale) => locale.code === menuItem.lang
      )
      return getAbsoluteUrlIfSwitchWebsite({
        relativeTarget: `/${locale.code}`,
        targetDomain: locale.domain,
      })
    },
  },
}
</script>
