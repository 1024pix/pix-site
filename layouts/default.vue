<template>
  <div id="app" class="app-viewport">
    <skip-link />
    <hot-news-banner />
    <locale-suggestion-banner
      :is-open="showOutOfFranceBanner"
      @handleCloseBanner="closeLocaleSuggestionBanner"
    />
    <navigation-slice-zone />
    <main id="main" role="main" tabindex="-1">
      <nuxt />
    </main>
    <footer-slice-zone />
  </div>
</template>

<script>
import { shouldShowOutOfFranceBanner } from '~/services/should-show-out-of-france-banner'
import { getBaseUrl } from '~/config/url'
import SkipLink from '~/components/SkipLink.vue'
import HotNewsBanner from '~/components/HotNewsBanner.vue'
import LocaleSuggestionBanner from '~/components/LocaleSuggestionBanner.vue'
import NavigationSliceZone from '~/components/NavigationSliceZone.vue'
import FooterSliceZone from '~/components/FooterSliceZone.vue'

export default {
  components: {
    FooterSliceZone,
    NavigationSliceZone,
    LocaleSuggestionBanner,
    HotNewsBanner,
    SkipLink,
  },
  /**  When building with nuxt generate on target static mode,
   * fetch lifecycle is only called during build process and not on runtime
   * (see {@link https://nuxtjs.org/announcements/going-full-static/#crazy-fast-static-applications}).
   * We are preventing this behaviour by calling fetch only on client side. */
  fetchOnServer: false,
  data() {
    return {
      showOutOfFranceBanner: false,
    }
  },
  async fetch() {
    const baseUrl = getBaseUrl(this.$nuxt.context)

    try {
      this.showOutOfFranceBanner = await shouldShowOutOfFranceBanner(baseUrl)
    } catch (error) {
      this.showOutOfFranceBanner = false
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
    }
  },
  methods: {
    closeLocaleSuggestionBanner() {
      this.showOutOfFranceBanner = false
    },
  },
}
</script>

<style lang="scss">
html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: $white;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: $font-open-sans;
}

p,
div {
  word-wrap: break-word;
}
.app-viewport {
  .app-brand {
    height: 66px;
    background-color: #ffffff;
    border: 1px solid #e5e5e5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    padding: 12px 10px;
    transition: top 0.3s ease-in-out;
  }
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
