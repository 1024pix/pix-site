<template>
  <section class="section-demo">
    <div class="section-demo__container">
      <div v-if="hasImage" class="column">
        <prismic-image :field="image" />
      </div>
      <div class="column">
        <prismic-rich-text :field="title" />
        <prismic-rich-text :field="description" />
        <div v-for="(item, index) in paragraphs" :key="`item-${index}`">
          <prismic-rich-text :field="item.paragraph" />
        </div>
        <div>
          <a v-if="hasButton" :href="buttonLink" class="section-demo__button">
            {{ $prismic.asText(buttonText) }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'DemoSection',
  props: {
    content: {
      type: Object,
      default: null,
    },
  },
  computed: {
    paragraphs() {
      return this.content.items
    },
    title() {
      return this.content.primary.title
    },
    image() {
      return this.content.primary.logo
    },
    description() {
      return this.content.primary.description
    },
    buttonLink() {
      return this.content.primary.button_link.url
    },
    buttonText() {
      return this.content.primary.button_title
    },
    hasImage() {
      return this.image && this.image.url
    },
    hasButton() {
      return this.buttonText && this.buttonText.length
    },
  },
}
</script>

<style lang="scss">
.section {
  font-family: $open-sans, Arial, sans-serif;
  text-align: center;
  margin: 0 auto;
  padding: 32px 0;
  @include device-is('large-mobile') {
    padding: 64px 0;
  }

  &__container {
    max-width: 1140px;
    margin: 0 auto;
  }

  &__flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    @include device-is('large-mobile') {
      flex-direction: row;
    }
  }

  &__flex-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 80%;

    @include device-is('large-mobile') {
      max-width: 45%;
    }

    h2 {
      color: $blue-5;
      font-size: 2rem;
      font-family: $open-sans;
      font-weight: normal;
      letter-spacing: 0.00875rem;
      line-height: 2.875rem;
      text-align: left;
    }

    p {
      color: $grey-10;
      font-size: 1.25rem;
      line-height: 2rem;
      text-align: justify;

      &.block-img img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        max-width: 100%;
      }
    }
  }
}

.section-demo {
  background-color: #eeeeee;
  padding: 60px 0;

  &__container .column {
    text-align: center;

    img {
      margin-bottom: 20px;
    }

    h1 {
      font-size: 36px;
      line-height: 49px;
      font-weight: 400;
    }

    p {
      margin: 20px 30px;
    }
  }

  &__button {
    display: inline-block;
    background: #3d68ff;
    color: #ffffff;
    border-radius: 5px;
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    letter-spacing: 0.5px;

    &:hover {
      transition: opacity 0.5s ease-out;
      background: $blue-3;
    }

    &:hover:after {
      opacity: 1;
    }
  }

  &__container {
    display: flex;
    flex-flow: column;
    align-items: center;

    @include device-is('tablet') {
      flex-flow: row wrap;
      justify-content: center;

      img {
        margin-right: 100px;
      }

      .column {
        display: flex;
        flex-direction: column;
        text-align: left;
      }

      .column p {
        margin-left: 0;
      }
    }
  }
}
</style>
