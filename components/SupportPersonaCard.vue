<template>
  <article role="article" class="support-persona-card">
    <!-- TODO: When Nuxt 3 update, switch to a nuxt-link component -->
    <a class="support-persona-card__link" :href="cardLink">
      <img
        v-if="data.icon"
        :src="data.icon.url"
        alt=""
        class="support-persona-card__icon"
      />
      <div class="support-persona-card__wrapper">
        <h3 class="support-persona-card__name">
          {{ data.name[0].text }}
        </h3>
        <p v-if="data.description[0]" class="support-persona-card__description">
          {{ data.description[0].text }}
        </p>
      </div>
    </a>
  </article>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cardLink() {
      return this.data.faq_link.url
        ? this.data.faq_link.url
        : `/support/persona/${this.data.uri}`
    },
  },
}
</script>

<style lang="scss">
.support-persona-card {
  height: 100%;
}

.support-persona-card__link {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 1rem;
  background-color: white;
  border: 1px solid transparent;
  box-shadow: 0px 4px 8px 0px $grey-20;
  border-radius: 8px;

  &:hover,
  &:focus {
    border-color: #613fdd;
  }

  &:active {
    background-color: $grey-10;
    border-color: #613fdd;
    box-shadow: 0px 4px 8px 0px $grey-30;
  }
}

.support-persona-card__name {
  font-size: 1.25rem;
  color: $grey-90;
  margin: 0;
  padding-bottom: 0.25rem;
}

.support-persona-card__icon {
  width: 80px;
  height: 80px;
  object-fit: contain;
  padding: 0.5rem;
  margin-right: 0.5rem;
}

.support-persona-card__description {
  color: $grey-50;
  font-family: $font-roboto;
  font-size: 0.875rem;
  margin: 0;
}

.support-persona-card__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
