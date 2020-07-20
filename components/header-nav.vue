<template>
  <div class="nav">
    <header>
      <client-only>
        <push-menu :width="'230'">
          <burger-menu-nav
            :top-items="topItems"
            :bottom-items="bottomItems"
            :middle-items="middleItems"
          />
        </push-menu>
      </client-only>
      <div class="nav-principal tablet">
        <div class="container padding-container">
          <div class="switch">
            <nuxt-link to="/">
              <img
                alt="Accueil du site pix.fr"
                class="logo"
                src="/images/pix-logo.svg"
              />
            </nuxt-link>
            <img
              v-if="showFrenchGovLogo"
              alt="Service public d'État"
              src="/images/marianne-logo.svg"
            />
          </div>
        </div>
      </div>
      <div id="page-wrap">
        <organization-nav :organization-nav-items="organizationNavItems" />
        <div class="nav-principal desktop">
          <div class="container padding-container">
            <nuxt-link to="/">
              <img
                alt="Accueil du site pix.fr"
                class="logo"
                src="/images/pix-logo.svg"
              />
            </nuxt-link>
            <img
              v-if="showFrenchGovLogo"
              alt="Service public d'État"
              src="/images/marianne-logo.svg"
            />
            <div class="desktop">
              <main-nav :main-nav-items="mainNavItems" />
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MainNav from '~/components/main-nav'
import BurgerMenuNav from '~/components/burger-menu-nav'
import OrganizationNav from '~/components/organization-nav'

export default {
  name: 'HeaderNav',
  components: {
    MainNav,
    BurgerMenuNav,
    OrganizationNav
  },
  data() {
    const showFrenchGovLogo = this.$i18n.locale === 'fr-fr'
    return { showFrenchGovLogo }
  },
  computed: mapState([
    'organizationNavItems',
    'mainNavItems',
    'topItems',
    'bottomItems',
    'middleItems'
  ])
}
</script>

<style scoped></style>
