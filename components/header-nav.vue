<template>
  <div class="nav">
    <header>
      <client-only>
        <push-menu :width="'230'">
          <burger-menu-nav :top-items="topItems" :bottom-items="bottomItems" />
        </push-menu>
      </client-only>
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
            <img alt="Logo de la Marianne" src="/images/marianne-logo.svg" />
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
  computed: mapState([
    'organizationNavItems',
    'mainNavItems',
    'topItems',
    'bottomItems'
  ])
}
</script>

<style scoped></style>
