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
        <a
          :href="
            useGetAbsoluteUrlIfSwitchWebsite(
              availableLanguage.target,
              availableLanguage.isOnPixOrg,
              selectedMenu
            )
          "
        >
          {{ $t(availableLanguage.name) }}
        </a>
      </div>
    </li>
  </ul>
</template>

<script>
import { useGetAbsoluteUrlIfSwitchWebsite } from '~/services/use-get-absolute-url-if-switch-website'

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
    useGetAbsoluteUrlIfSwitchWebsite,
  },
}
</script>
