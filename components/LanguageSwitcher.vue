<template>
  <div
    v-if="showLanguageDropdown && type === 'with-dropdown'"
    class="language-switcher"
    @keydown.esc="hideMenu"
  >
    <button
      class="language-switcher__button"
      :aria-label="$t('language-switcher-label')"
      aria-haspopup="true"
      :aria-expanded="showMenu.toString()"
      @click.stop.prevent="toggleMenu()"
    >
      {{ $t(currentLocaleCode) }}
      <fa v-if="showMenu" icon="angle-up" />
      <fa v-else icon="angle-down" />
    </button>
    <ul v-if="showMenu" class="language-switcher__dropdown-menu">
      <li
        v-for="option in languages.menu"
        :key="option.key"
        :class="{
          'language-switcher__dropdown-menu--active':
            option.lang === currentLocaleCode,
        }"
      >
        <div class="language-switcher__lang">
          <button v-if="!option.target" @click.stop.prevent="toggleSubMenu()">
            <img
              class="language-switcher__img"
              :src="'/images/' + option.icon"
              alt=""
            />
            <div class="lang__text">{{ $t(option.name) }}</div>
            <fa
              v-if="!option.target"
              icon="angle-right"
              class="language-switcher__icon"
            />
          </button>
          <a
            v-else-if="option.target"
            :href="
              useGetAbsoluteUrlIfSwitchWebsite(option.target, option.isOnPixOrg)
            "
          >
            <img
              class="language-switcher__img"
              :src="'/images/' + option.icon"
              alt=""
            />
            <div class="lang__text">
              <div>{{ $t(option.name) }}</div>
              <div v-if="option.sub" class="language-switcher__subtitle">
                {{ $t(option.sub) }}
              </div>
            </div>
          </a>
        </div>
        <ul
          v-if="!option.target && showSubMenu"
          class="language-switcher__dropdown-menu child"
        >
          <li
            v-for="child in option.children"
            :key="child.key"
            :class="{
              'language-switcher__dropdown-menu--active':
                child.lang === currentLocaleCode,
            }"
          >
            <div class="language-switcher__lang">
              <a
                :href="
                  useGetAbsoluteUrlIfSwitchWebsite(
                    child.target,
                    child.isOnPixOrg
                  )
                "
              >
                {{ $t(child.name) }}
              </a>
            </div>
          </li>
        </ul>
      </li>
    </ul>
    <span class="separator" />
  </div>
  <div v-else-if="showLanguageDropdown && type === 'only-text'">
    <ul class="language-switcher-burger-menu">
      <li v-for="option in languages.menu" :key="option.key">
        <template v-if="!option.target">
          <span
            v-for="child in option.children"
            :key="child.name"
            :class="{
              'language-switcher-burger-menu__lang': true,
              'language-switcher-burger-menu--active':
                child.lang === currentLocaleCode,
            }"
          >
            <a
              :href="
                useGetAbsoluteUrlIfSwitchWebsite(child.target, child.isOnPixOrg)
              "
            >
              {{ $t(option.name) }} - {{ $t(child.name) }}
            </a>
            <br />
          </span>
        </template>
        <template v-if="option.target">
          <span
            :class="{
              'language-switcher-burger-menu__lang': true,
              'language-switcher-burger-menu--active':
                option.lang === currentLocaleCode,
            }"
          >
            <a
              :href="
                useGetAbsoluteUrlIfSwitchWebsite(
                  option.target,
                  option.isOnPixOrg
                )
              "
            >
              {{ $t(option.name) }}
            </a>
          </span>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { SITES_PRISMIC_TAGS } from '~/services/available-sites'
import { language } from '~/config/language'

export default {
  name: 'LanguageSwitcher',
  props: {
    type: {
      type: String,
      default: 'with-dropdown',
    },
  },
  data() {
    const languages = language
    return {
      showMenu: false,
      showSubMenu: false,
      languages,
    }
  },
  computed: {
    showLanguageDropdown() {
      return process.env.SITE === SITES_PRISMIC_TAGS.PIX_SITE
    },
    currentLocaleCode() {
      return this.$i18n.locale || this.$i18n.defaultLocale
    },
    selectedMenu() {
      return this.languages.menu
        .flatMap((menuItem) => menuItem.children ?? menuItem)
        .find((locale) => locale.lang === this.currentLocaleCode)
    },
  },
  mounted() {
    const page = document.getElementsByTagName('body')[0]
    page.addEventListener('click', this.hideMenu)
  },
  beforeDestroy() {
    const page = document.getElementsByTagName('body')[0]
    page.removeEventListener('click', this.hideMenu)
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    toggleSubMenu() {
      this.showSubMenu = !this.showSubMenu
    },
    hideMenu() {
      this.showMenu = false
      this.showSubMenu = false
    },
    useGetAbsoluteUrlIfSwitchWebsite(relativeTarget, isTargetOnPixOrg) {
      return getAbsoluteUrlIfSwitchWebsite(
        relativeTarget,
        isTargetOnPixOrg,
        this.selectedMenu.isOnPixOrg
      )
    },
  },
}

/**
 * Adds current URL scheme to a domain (http:// or https://)
 */
function getBaseUrl(domain) {
  return new URL(`//${domain}`, document.location)
}
export function getAbsoluteUrlIfSwitchWebsite(
  relativeTarget,
  isTargetOnPixOrg,
  isOnPixOrg
) {
  if (!isOnPixOrg && isTargetOnPixOrg) {
    const orgBaseUrl = getBaseUrl(process.env.DOMAIN_ORG)
    return new URL(relativeTarget, orgBaseUrl).href
  }

  if (isOnPixOrg && !isTargetOnPixOrg) {
    const frBaseUrl = getBaseUrl(process.env.DOMAIN_FR)
    return new URL(relativeTarget, frBaseUrl).href
  }

  return relativeTarget
}
</script>

<style lang="scss" scoped>
.language-switcher {
  display: none;
}
@include device-is('large-screen') {
  .language-switcher {
    display: flex;

    .separator {
      margin-left: 15px;
      border-left: 1px solid $grey-20;
      display: block;
      height: 1.5rem;
    }
    &__button {
      font-family: $font-roboto;
      font-size: 0.875rem;
      font-weight: $font-medium;
      color: $grey-60;
      letter-spacing: 0.008rem;
      line-height: 1.375rem;
      margin-bottom: 2px;
      border: none;
      outline: inherit;
      height: 1.5rem;
      background-size: 1.3rem;
      background-position: 5% 50%;
      padding: 2px 3px 0 30px;
      cursor: pointer;
      background: url('/images/globe.svg') no-repeat;
      &:hover {
        color: $blue;
      }
    }
    &__dropdown-menu {
      position: absolute;
      z-index: 5;
      float: left;
      min-width: 150px;
      padding: 0;
      margin: 35px 0 0 0;

      list-style: none;
      font-size: 14px;
      text-align: left;
      background-color: $white;
      border: 1px solid $grey-20;
      border-radius: 4px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
      background-clip: padding-box;

      .child {
        top: -1px;
        left: 100%;
        margin: 0;
        padding: 0;
        box-shadow: 0 0;
        display: block;
        min-height: 25px;
        .language-switcher__lang > a {
          line-height: 23px;
        }
      }

      & > li {
        list-style: none;
        width: 100%;
        position: relative;
        margin: 0;
        padding: 0;
        &::before {
          content: '';
          margin: 0;
        }
        &:hover {
          background: $grey-10;
          .child {
            display: block;
          }
        }
      }
      & > li > a,
      & > li > span {
        display: block;
        line-height: 1.6rem;
        color: $grey-20;
        white-space: nowrap;
        text-decoration: none;
      }
      & > li > a:hover,
      & > li > span {
        background: $grey-10;
      }
      & > li:not(:last-child) {
        border-bottom: 1px solid $grey-20;
      }
      &--active {
        color: $grey-30;
        pointer-events: none;
        a {
          color: white;
        }
      }
    }
    &__lang {
      min-height: 25px;
      a,
      span,
      button {
        padding: 10px;
        font-family: $font-roboto;
        font-size: 0.9rem;
        font-weight: $font-medium;
        letter-spacing: 0.008rem;
        line-height: 1;
        color: inherit;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:hover {
          color: $blue;
          background: $grey-10;
        }
        .lang {
          &__text {
            flex: 1;
          }
        }
      }
      button {
        width: 100%;
        border: none;
        background: white;
        &:hover {
          color: $blue;
          background: $grey-10;
        }
        .lang {
          &__text {
            flex: 1;
            text-align: left;
          }
        }
      }
    }
    &__icon {
      font-size: large;
      float: right;
    }
    &__subtitle {
      font-size: smaller;
    }
    &__img {
      margin-right: 10px;
      height: 23px;
      width: 23px;
    }
  }
}

.language-switcher-burger-menu {
  margin: 0 0 50px 0;
  font-size: 1rem;
  line-height: 1.5rem;
  color: $grey-30;
  list-style: none;
  ul {
    padding: 0;
  }
  li {
    list-style-type: none;
    padding-left: 0;
  }
  li::before {
    content: '';
    margin: 0;
  }
  &__lang {
    a {
      color: $grey-80;
      &:visited,
      &:focus,
      &:active,
      &:hover {
        color: $grey-80;
        text-decoration: underline;
      }
    }
  }
  &--active {
    pointer-events: none;
    a {
      color: $grey-25 !important;
    }
  }
}
</style>
