<template>
  <div class="burger-menu__header">
    <ul class="burger-menu-header__logos">
      <li v-for="(item, index) in logosZone" :key="`logo-${index}`">
        <nuxt-link v-if="hasLink(item)" :to="item.url">
          <nuxt-img :src="item.image.url" :alt="item.image.alt" />
        </nuxt-link>
        <nuxt-img v-else :src="item.image.url" :alt="item.image.alt" />
      </li>
    </ul>
    <button
      role="button"
      class="burger-menu-header__close-button"
      :aria-label="t('burger-menu.close')"
      @click="$emit('closeMenu')"
    />
  </div>
</template>

<script setup>
const { t } = useI18n();

defineProps({
  logosZone: {
    type: Object,
    required: true,
  },
});

defineEmits(['closeMenu']);

const hasLink = (item) => {
  return item.url.link_type !== 'Any';
};
</script>

<style lang="scss" scoped>
.burger-menu__header {
  position: sticky;
  z-index: 1;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  box-shadow: 0px -2px 0px 0px $grey-20 inset;
  background-color: $white;
}

.burger-menu-header__logos {
  display: flex;
  margin: 0;
  padding: 0;

  li {
    padding: 0 1rem 0 0;
  }

  img {
    height: 3rem;
  }
}

.burger-menu-header__close-button {
  position: relative;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 50%;
  background-color: $grey-10;
  color: $grey-60;

  &:hover {
    background-color: $grey-20;
  }

  &:focus {
    background-color: $grey-60;
    outline: 1px solid $white;
    outline-offset: -3px;
    color: $white;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 2px;
    background-color: currentColor;
    transform-origin: top left;
  }
  &::before {
    transform: rotate(-45deg) translate(-50%, -50%);
  }
  &::after {
    transform: rotate(45deg) translate(-50%, -50%);
  }
}
</style>
