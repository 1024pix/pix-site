<template>
  <div class="content">
    <div v-if="hasDescription" class="content__description">
      <pix-image
        v-if="hasImage"
        class="content-description__image"
        :field="content.image"
      />

      <header class="content-description__title">
        <prismic-rich-text :field="content.title" />
      </header>

      <section class="content-description__body">
        <prismic-rich-text :field="content.body" />
      </section>
    </div>

    <div v-if="hasForm" class="content__form">
      <iframe class="content-form" :style="[heightForIframe]" :src="formUrl">
        {{ $t(`form.not-supported`) }}
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormPage',
  props: {
    content: {
      type: Object,
      default: null,
    },
  },
  computed: {
    formUrl() {
      const queryParamsAsObject = this.$route.query
      const queryParamsAsString = Object.keys(queryParamsAsObject)
        .map((key) => `${key}=${queryParamsAsObject[key]}`)
        .join('&')
      return this.content.formbuilder_url.url + `?${queryParamsAsString}`
    },
    hasDescription() {
      return this.content.title && this.content.body
    },
    hasForm() {
      return this.content.formbuilder_url && this.content.formbuilder_url.url
    },
    hasImage() {
      return this.content.image && this.content.image.url
    },
    heightForIframe() {
      const style = {}
      style.minHeight = (this.content.minimum_height || '650') + 'px'
      return style
    },
  },
}
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  padding: 30px 15px;
  justify-content: space-between;

  @include device-is('desktop') {
    flex-direction: row;
    padding: 60px 30px;
  }

  @include device-is('large-screen') {
    flex-direction: row;
    padding: 60px 90px;
  }

  &__description {
    display: flex;
    flex-direction: column;
    margin: 0 10px;

    @include device-is('desktop') {
      margin: 0 15px;
    }

    @include device-is('large-screen') {
      margin: 0 38px;
    }
  }

  &__form {
    box-shadow: 0 24px 32px 0 rgba($grey-200, 0.03),
      0 8px 32px 0 rgba($grey-200, 0.06);
    border-radius: 20px;
    margin: 0 10px;
    height: 100%;

    @include device-is('desktop') {
      margin: 0 15px;
    }

    @include device-is('large-screen') {
      width: 640px;
      margin: 0 38px;
    }
  }
}

.content-description {
  &__image {
    width: 230px;
    height: 160px;
    align-self: center;
    margin-top: 20px;
    margin-bottom: 44px;
  }

  &__title {
    border-bottom: $grey-20 1px solid;
    padding-bottom: 24px;
    margin-bottom: 32px;

    h1 {
      color: $grey-90;
      font-size: 2rem;
      letter-spacing: 0.009rem;
      font-family: $font-open-sans;
      font-weight: $font-normal;
      line-height: 2.68rem;
    }
  }

  &__body {
    font-family: $font-roboto;
    font-size: 1rem;
    font-weight: $font-normal;
    letter-spacing: 0.009rem;
    color: $grey-45;

    ::before {
      content: none;
    }

    ul {
      margin: 0;
      padding-left: 33px;
    }

    li {
      padding-bottom: 16px;
    }

    a {
      color: $grey-50;
      font-size: 0.875rem;
      font-weight: $font-medium;
      text-decoration: underline;
    }
  }
}

.content-form {
  height: inherit;
  width: 100%;
  overflow: auto;
  border: none;

  @include device-is('desktop') {
    width: 480px;
  }

  @include device-is('large-screen') {
    width: 640px;
  }
}
</style>
