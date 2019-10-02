<template>
  <div class="employers">
    <hero-banner
      :section-class="'employers__hero-banner'"
      :background-class="'hero-banner__background'"
      :content-class="'hero-banner__content'"
      :button-class="'hero-banner-content__button'"
      :content="document[0]"
    >
    </hero-banner>

    <section-slice
      :content="document[1]"
      :section-class="'employers__mesurer'"
      :container-class="'mesurer__container'"
      :flex-container-class="'mesurer-container__list'"
      :flex-content-class="'mesurer-container-list__item'"
    >
    </section-slice>

    <section-column-slice
      :content="document[2]"
      :section-class="'employers__developper'"
      :ul-class="'developper__list'"
      :li-class="'developper__item'"
      :right-class="'developper__image'"
    >
    </section-column-slice>

    <section-slice
      :content="document[3]"
      :section-class="'employers__valoriser'"
      :container-class="'valoriser__container'"
      :flex-container-class="'valoriser-container__list'"
      :flex-content-class="'valoriser-container-list__item'"
      :button-class="'valoriser-container__button'"
    >
    </section-slice>

    <section-slice
      :content="document[4]"
      :section-class="'employers__confiance'"
      :container-class="'confiance__container'"
      :flex-container-class="'confiance-container__list'"
      :flex-content-class="'confiance-container-list__item'"
    >
    </section-slice>

    <section class="section-comment-ca-marche">
      <prismic-rich-text :field="document[5].primary.title" />
      <div class="container">
        <div
          v-for="(item, index) in document[5].items"
          :key="`item-${index}`"
          class="column"
        >
          <div class="inner">
            <prismic-rich-text :field="item.card_title" />
            <prismic-rich-text :field="item.card_description" />
          </div>
        </div>
      </div>
    </section>

    <key-numbers :content="keyNumbers" :content-id="keyNumbersId" />

    <section-slice
      :content="document[6]"
      :section-class="'employers__collaborateur'"
      :container-class="'collaborateur__container'"
      :button-class="'collaborateur-container__button'"
    >
    </section-slice>
    <prismic-edit-button :document-id="documentId" />
  </div>
</template>

<script>
import { documents, documentFetcher } from '~/services/document-fetcher'
import HeroBanner from '~/components/slices/hero-banner'
import SectionSlice from '~/components/slices/section'
import SectionColumnSlice from '~/components/slices/section-column'
import KeyNumbers from '~/components/key-numbers'

export default {
  name: 'Employers',
  nuxtI18n: {
    paths: {
      'fr-fr': '/employeurs',
      'fr-be': '/employeurs',
      'en-gb': '/employers'
    }
  },
  components: { HeroBanner, KeyNumbers, SectionColumnSlice, SectionSlice },
  async asyncData({ app, error, currentPagePath }) {
    try {
      const document = await documentFetcher(app.i18n).get(documents.employers)
      const keyNumbers = await documentFetcher(app.i18n).get(
        documents.keyNumbers
      )
      if (process.client) window.prismic.setupEditButton()
      return {
        currentPagePath,
        meta: document.data.meta,
        document: document.data.body,
        keyNumbers: keyNumbers.data,
        keyNumbersId: keyNumbers.id,
        documentId: document.id
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    const meta = this.$getMeta(this.meta, this.currentPagePath, this.$prismic)
    return {
      meta
    }
  }
}
</script>

<style lang="scss">
.employers {
  h1,
  h2,
  h3,
  h4,
  p {
    font-family: 'Open Sans', Arial, sans-serif;
  }

  &__hero-banner {
    height: 395px;
    overflow: hidden;
    color: white;
    padding-top: 60px;
    position: relative;

    @include device-is('tablet') {
      padding: 200px 0 100px;
      height: 520px;
      padding-top: 160px;
    }
  }

  &__mesurer {
    position: relative;
    padding: 70px 20px 40px;
    margin-bottom: 36px;

    @include device-is('large-mobile') {
      margin-bottom: 60px;
      padding-left: 0;
      padding-right: 0;
    }
    @include device-is('tablet') {
      padding-top: 80px;
      padding-bottom: 140px;
    }

    h2 {
      font-weight: 400;
      text-align: center;
      margin-bottom: 16px;
      font-size: 36px;
      line-height: 49px;
    }

    h3 {
      margin-bottom: 72px;
      margin-top: 0;
      font-weight: 300;
      text-align: center;
      font-size: 18px;
      line-height: 24px;

      @include device-is('large-mobile') {
        padding: 0 90px;
      }
      @include device-is('tablet') {
        padding: 0 0;
        font-size: 22px;
        line-height: 30px;
      }
    }

    .background {
      position: absolute;
      z-index: -1;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: $white;
      transform: skewY(-3deg);
      transform-origin: bottom right;
    }
  }

  &__developper {
    position: relative;
    padding: 80px 0 110px;

    & > .background {
      position: absolute;
      z-index: -1;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135.25deg, #388aff 0%, #985fff 100%);
      transform: skewY(3deg);
      transform-origin: bottom right;
    }
    & > .container {
      flex-direction: column-reverse;

      @include device-is('tablet') {
        flex-direction: row-reverse;
      }

      & > .container-column {
        width: 100%;

        @include device-is('tablet') {
          width: 50%;
        }
      }
    }
  }

  &__valoriser {
    position: relative;
    padding: 70px 20px 40px;
    margin-bottom: 36px;

    @include device-is('large-mobile') {
      margin-bottom: 60px;
      padding-left: 0;
      padding-right: 0;
    }
    @include device-is('tablet') {
      padding-top: 80px;
      padding-bottom: 50px;
    }

    .background {
      background: $white;
    }
  }

  &__confiance {
    position: relative;
    background-color: #f5f5f5;
    padding: 50px 20px;

    @include device-is('large-mobile') {
      padding-left: 0;
      padding-right: 0;
    }
    @include device-is('tablet') {
      padding-top: 80px;
      padding-bottom: 120px;
    }

    h2 {
      @include device-is('large-mobile') {
        padding: 0 90px;
      }
      @include device-is('tablet') {
        padding: 0 0;
      }
    }

    .background {
      background: $white;
    }
  }

  &__collaborateur {
    position: relative;
    padding: 100px 20px;
    background: linear-gradient(132.01deg, #388aff 0%, #5427ab 100%);

    @include device-is('tablet') {
      padding: 120px 0;
    }
  }
}

.hero-banner {
  &__background {
    position: absolute;
    background: linear-gradient(46deg, rgba(13, 125, 196, 0.4) 0, #213371 100%),
      url(/images/background-hero-mobile-pro.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
    transform-origin: top left;
    transform: skewY(-3deg);
    z-index: -1;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;

    @include device-is('tablet') {
      background: linear-gradient(
          46deg,
          rgba(13, 125, 196, 0.4) 0,
          #213371 100%
        ),
        url('/images/background-hero-pro.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: top center;
    }
  }

  &__content {
    h1 {
      font-size: 30px;
      line-height: 38px;
      margin-bottom: 20px;
      font-weight: 700;
      color: $white;
      text-align: left;

      @include device-is('large-mobile') {
        width: 450px;
      }
      @include device-is('tablet') {
        width: 600px;
        font-size: 46px;
        line-height: 62px;
      }
    }

    max-width: 1140px;
    margin: 0 auto;
    padding: 0 20px;
  }

  &-content {
    &__button {
      font-family: 'Roboto', Arial, sans-serif;
      display: inline-block;
      cursor: pointer;
      user-select: none;
      font-size: 16px;
      letter-spacing: 0.5px;
      text-decoration: none;
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      position: relative;
      background: linear-gradient(180deg, #ffbe00 0%, #ff9f00 100%);
      color: #222;
      border-radius: 5px;
      -webkit-backface-visibility: hidden;
      z-index: 1;

      &:hover {
        transition: opacity 0.5s ease-out;
        background: linear-gradient(180deg, #ff9d00 0%, #ff7900 100%);
      }

      &:hover:after {
        opacity: 1;
      }

      span {
        position: relative;
        z-index: 3;
      }
    }
  }
}

.mesurer {
  &__container {
    max-width: 1140px;
    margin: 0 auto;
  }

  &-container {
    &__list {
      display: flex;
      flex-flow: column;

      @include device-is('large-mobile') {
        flex-flow: row wrap;
      }
    }

    &-list {
      &__item {
        width: 100%;

        @include device-is('large-mobile') {
          width: 50%;
          padding: 0 38px;
        }
        @include device-is('tablet') {
          padding: 0 50px;
        }

        h4 {
          font-weight: 400;
          text-align: left;
          margin-bottom: 6px;
          font-size: 20px;
          line-height: 27px;
        }

        p {
          font-weight: 300;
          font-size: 15px;
          line-height: 24px;
        }
      }
    }
  }
}

.developper {
  &__list {
    margin-top: 0;
  }

  &__item {
    color: $white;
    list-style: none;

    &:before {
      content: none;
    }

    h2 {
      font-weight: 400;
      margin-bottom: 32px;
      margin-top: 0;
      font-size: 36px;
      line-height: 49px;
    }

    h4 {
      font-weight: 600;
      margin-bottom: 6px;
      font-size: 18px;
      line-height: 24px;
    }
  }

  &__image {
    width: 100%;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}

.valoriser {
  &__container {
    h2 {
      margin-top: 0;
      font-weight: 400;
      text-align: center;
      margin-bottom: 16px;
      font-size: 36px;
      line-height: 49px;
    }

    h3 {
      margin-bottom: 72px;
      margin-top: 0;
      font-weight: 300;
      text-align: center;
      font-size: 18px;
      line-height: 24px;
      @include device-is('tablet') {
        font-size: 22px;
        line-height: 30px;
      }
    }

    max-width: 1140px;
    margin: 0 auto;
    text-align: center;
  }

  &-container {
    &__list {
      display: flex;
      flex-flow: column;
      text-align: left;
      @include device-is('large-mobile') {
        flex-flow: row wrap;
      }
    }

    &__button {
      font-family: 'Roboto', Arial, sans-serif;
      display: inline-block;
      cursor: pointer;
      user-select: none;
      font-size: 16px;
      letter-spacing: 0.5px;
      text-decoration: none;
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      position: relative;
      background: linear-gradient(180deg, #ffbe00 0%, #ff9f00 100%);
      color: #222;
      border-radius: 5px;
      -webkit-backface-visibility: hidden;
      z-index: 1;

      &:hover {
        transition: opacity 0.5s ease-out;
        background: linear-gradient(180deg, #ff9d00 0%, #ff7900 100%);
      }

      &:hover:after {
        opacity: 1;
      }

      span {
        position: relative;
        z-index: 3;
      }
    }

    &-list {
      &__item {
        width: 100%;

        @include device-is('large-mobile') {
          width: 50%;
          padding: 0 38px;
        }
        @include device-is('tablet') {
          padding: 0 50px;
        }

        h4 {
          font-weight: 400;
          text-align: left;
          margin-bottom: 6px;
          font-size: 20px;
          line-height: 27px;
        }

        p {
          font-weight: 300;
          font-size: 15px;
          line-height: 24px;
        }
      }
    }
  }
}

.confiance {
  &__container {
    max-width: 1140px;
    margin: 0 auto;

    h2 {
      margin-top: 26px;
      margin-bottom: 60px;
      font-weight: 400;
      text-align: center;
      font-size: 36px;
      line-height: 49px;
    }
  }

  &-container {
    &__list {
      display: flex;
      flex-flow: column;

      @include device-is('large-mobile') {
        flex-flow: row wrap;
      }
    }

    &-list {
      &__item {
        width: 100%;

        @include device-is('large-mobile') {
          width: 20%;
          padding: 0 38px;
        }
        @include device-is('tablet') {
          padding: 0 50px;
        }

        p {
          &.block-img {
            height: 146px;
            display: block;
            text-align: center;
            @include device-is('tablet') {
              display: flex;
            }

            img {
              max-height: 146px;
            }
          }
        }
      }
    }
  }
}

.section-comment-ca-marche {
  position: relative;
  background: url('/images/background-comment-ca-marche.jpg') no-repeat center
    center;
  background-size: cover;
  padding-top: 80px;
  padding-bottom: 108px;

  h2 {
    margin-top: 0;
    margin-bottom: 60px;
    font-weight: 400;
    text-align: center;
    font-size: 36px;
    line-height: 49px;
  }

  .container {
    display: flex;
    flex-flow: row wrap;
  }

  .inner {
    padding: 60px 22px;
    background-color: white;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0 15px 16px 0 rgba(12, 22, 58, 0.15),
      0 3px 6px 0 rgba(0, 0, 0, 0.1);

    h4 {
      font-weight: 400;
      margin-bottom: 26px;
      font-size: 18px;
      line-height: 24px;
    }

    p {
      margin: 0 0 12px;
      font-weight: 300;
      font-size: 14px;
      line-height: 24px;
    }
  }

  .column {
    width: 100%;
    padding: 0 20px;

    @include device-is('large-mobile') {
      width: 33.33%;
      padding: 0 10px;
    }
    @include device-is('tablet') {
      padding: 0 10px;
    }
  }

  .column:nth-child(1),
  .column:nth-child(2) {
    margin-bottom: 48px;

    @include device-is('large-mobile') {
      margin-bottom: 0;
    }
  }
}

.key-numbers {
  padding: 50px 20px;

  @include device-is('large-mobile') {
    margin-bottom: 60px;
    padding-left: 0;
    padding-right: 0;
  }

  &__title {
    margin-bottom: 60px;
    text-align: center;
    font-size: 36px;
    line-height: 49px;
    font-weight: 400;
    color: $grey-1;
  }

  &__list {
    display: flex;
    flex-flow: column wrap;

    @include device-is('tablet') {
      flex-flow: row wrap;
    }
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

.key-number {
  &__item {
    margin-bottom: 30px;

    @include device-is('large-mobile') {
      width: 50%;
    }

    @include device-is('tablet') {
      width: 25%;
      margin-bottom: inherit;
    }
  }

  &__value {
    font-weight: 600;
    color: $blue-1;
    text-align: center;
    font-size: 36px;
    line-height: 65px;

    @media (min-width: 960px) {
      font-size: 42px;
    }
  }

  &__description {
    color: $grey-1;
    text-align: center;

    @include device-is('large-mobile') {
      font-size: 14px;
      line-height: 19px;
    }

    @include device-is('tablet') {
      font-size: 16px;
      line-height: 24px;
    }
  }
}

.collaborateur {
  &__container {
    text-align: center;

    h2 {
      margin-top: 0;
      font-weight: 400;
      color: $white;
      text-align: center;
      margin-bottom: 32px;
      font-size: 36px;
      line-height: 49px;
    }
  }
  &-container {
    &__button {
      font-family: 'Roboto', Arial, sans-serif;
      display: inline-block;
      cursor: pointer;
      user-select: none;
      font-size: 16px;
      letter-spacing: 0.5px;
      text-decoration: none;
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      position: relative;
      background: linear-gradient(180deg, #ffbe00 0%, #ff9f00 100%);
      color: #222;
      border-radius: 5px;
      -webkit-backface-visibility: hidden;
      z-index: 1;

      &:hover {
        transition: opacity 0.5s ease-out;
        background: linear-gradient(180deg, #ff9d00 0%, #ff7900 100%);
      }

      &:hover:after {
        opacity: 1;
      }

      span {
        position: relative;
        z-index: 3;
      }
    }
  }
}
</style>
