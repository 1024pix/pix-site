<template>
  <div class="sub-nav">
    <img
      alt="Accueil du site pro.pix.fr"
      class="logo-pro"
      src="/images/logo-pix_pro_279x114.png"
    />
    <ul class="sub-nav-links">
      <li
        v-for="item in navItems"
        :key="item.id"
        class="text text-xs text-left regular text-black"
      >
        <pix-link :field="item.primary.link">
          {{ $prismic.asText(item.primary.title) }}
        </pix-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    navItems: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style>
.sub-nav {
  display: flex;
  flex-direction: row;
  height: 68px;
  background-color: #fafbfc;
  align-items: center;
  justify-content: center;
}

.sub-nav-links {
  display: flex;
  flex-direction: row;
}

.sub-nav-links > li {
  list-style: none;
  margin-right: 24px;
}

.sub-nav-links > li:last-child {
  margin-right: 0px;
}

.sub-nav-links > li::before {
  content: '';
}

.sub-nav-links > li > a {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  color: #253858;
  padding: 8px 16px;
}

.sub-nav-links > li > a:hover {
  color: #3d68ff;
}

.sub-nav-links > li > a.nuxt-link-active {
  color: #223885;
  background-color: #ffffff;
  border-radius: 40px;
  font-weight: 500;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 1px 1px -4px rgba(0, 0, 0, 0.12), 0px 1px 3px 0px rgba(0, 0, 0, 0.11);
}

.logo-pro {
  height: 38px;
  width: auto;
  margin-right: 32px;
}
</style>
