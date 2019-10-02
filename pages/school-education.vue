<template>
  <div class="school-education">
    <hero-banner
      :section-class="'school-education__hero-banner'"
      :background-class="'hero-banner__background'"
      :content-class="'hero-banner__content'"
      :button-class="'hero-banner-content__button'"
      :content="document[0]"
    >
    </hero-banner>

    <section-slice
      :content="document[1]"
      :section-class="'school-education__infos'"
      :flex-container-class="'features'"
      :flex-content-class="'feature'"
    >
    </section-slice>

    <section-slice
      :content="document[2]"
      :section-class="'school-education__pourquoi-pix'"
      :container-class="'pourquoi-pix__container'"
      :flex-container-class="'pourquoi-pix-container__list'"
      :flex-content-class="'pourquoi-pix-container-list__item'"
    >
    </section-slice>

    <section-slice
      :content="document[3]"
      :section-class="'school-education__mesurer'"
      :container-class="'mesurer__container'"
      :flex-container-class="'mesurer-container__list'"
      :flex-content-class="'mesurer-container-list__item'"
    >
    </section-slice>

    <section-column-slice
      :content="document[4]"
      :section-class="'school-education__developper'"
      :ul-class="'developper__list'"
      :li-class="'developper__item'"
      :right-class="'developper__image'"
    >
    </section-column-slice>

    <section-slice
      :content="document[5]"
      :section-class="'school-education__valoriser'"
      :container-class="'valoriser__container'"
      :flex-container-class="'valoriser-container__list'"
      :flex-content-class="'valoriser-container-list__item'"
    >
    </section-slice>

    <div id="pix-orga">
      <section class="section-utiliser-pix">
        <prismic-rich-text :field="document[6].primary.title" />
        <div class="container">
          <div
            v-for="(item, index) in document[6].items"
            :key="`item-${index}`"
            class="column"
          >
            <prismic-rich-text :field="item.column_number" />
            <prismic-rich-text :field="item.column_title" />
            <hr class="text-left mb-2 mt-2" />
            <prismic-rich-text :field="item.column_description" />
          </div>
        </div>
      </section>
    </div>

    <section-slice
      :content="document[7]"
      :section-class="'school-education__deploiement'"
      :container-class="'deploiement__container'"
      :flex-container-class="'deploiement-container__list'"
      :flex-content-class="'deploiement-container-list__item'"
    >
    </section-slice>

    <section class="section-agenda">
      <div class="background"></div>
      <div class="container">
        <prismic-image :field="document[8].primary.logo" />
        <prismic-rich-text :field="document[8].primary.title" />
        <div style="margin:auto;">
          <div
            v-for="(item, index) in document[8].items"
            :key="`item-${index}`"
            class="column mb-0-2"
          >
            <prismic-rich-text :field="item.card_title" />
            <prismic-rich-text :field="item.card_description" />
          </div>
        </div>
      </div>
    </section>

    <section-slice
      :content="document[9]"
      :section-class="'school-education__deploiement-end'"
      :container-class="'deploiement-end__container'"
      :flex-container-class="'deploiement-end-container__list'"
      :flex-content-class="'deploiement-end-container-list__item'"
    >
    </section-slice>

    <key-numbers :content="keyNumbers" :content-id="keyNumbersId" />
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
  name: 'SchoolEducation',
  nuxtI18n: {
    paths: {
      'fr-fr': '/enseignement-scolaire',
      'fr-be': '/enseignement-scolaire',
      'en-gb': '/school-education'
    }
  },
  components: { HeroBanner, KeyNumbers, SectionColumnSlice, SectionSlice },
  async asyncData({ app, error, req, currentPagePath }) {
    try {
      const document = await documentFetcher(app.i18n, req).get(
        documents.schoolEducation
      )
      const keyNumbers = await documentFetcher(app.i18n, req).get(
        documents.keyNumbers
      )
      if (process.client) window.prismic.setupEditButton()
      return {
        currentPagePath,
        meta: document.data.meta,
        document: document.data.body,
        documentId: document.id,
        keyNumbers: keyNumbers.data,
        keyNumbersId: keyNumbers.id
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
.school-education {
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

  &__infos {
    position: relative;
    padding-top: 40px;
    padding-bottom: 0;

    @include device-is('large-mobile') {
      padding-top: 50px;
      padding-bottom: 0;
    }

    @include device-is('tablet') {
      padding-top: 80px;
      padding-bottom: 0;
    }

    .background {
      background-color: $white;
    }

    .features {
      display: flex;
      flex-direction: column;

      @include device-is('tablet') {
        flex-direction: row;
        max-width: 1140px;
        margin: 0 auto;
      }

      .feature {
        display: block;
        text-align: left;
        margin-bottom: 15px;

        @include device-is('tablet') {
          margin-bottom: 0;
          padding-left: 15px;
          min-width: 33%;
          max-width: 33%;
        }

        p {
          @include device-is('tablet') {
            min-height: 140px;
            text-align: center;
          }

          &.block-img {
            width: 100%;
            min-height: 100px;

            img {
              max-width: 100%;
              max-height: 100%;
            }
          }
        }
      }
    }
  }

  &__pourquoi-pix {
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
      padding-bottom: 40px;
    }

    h2 {
      font-weight: 400;
      text-align: center;
      margin-bottom: 60px;
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
      background: $grey-3;
      transform: skewY(-3deg);
      transform-origin: bottom right;
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

    h2 {
      margin-top: 0;
      margin-bottom: 10px;
      font-weight: 400;
      color: $white;
      font-size: 36px;
      line-height: 49px;
      padding-left: 20px;
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

  &__deploiement {
    position: relative;
    padding: 70px 20px 40px;

    @include device-is('large-mobile') {
      padding-left: 0;
      padding-right: 0;
    }
    @include device-is('tablet') {
      padding-top: 80px;
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
      background: $grey-3;
    }
  }

  &__deploiement-end {
    position: relative;
    padding: 70px 20px 40px;

    @include device-is('large-mobile') {
      padding-left: 0;
      padding-right: 0;
    }
    @include device-is('tablet') {
      padding-top: 80px;
      padding-bottom: 100px;
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
      background-color: $grey-3;
      transform: skewY(-3deg);
      transform-origin: top left;
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

.pourquoi-pix {
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
    padding-left: 20px;
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
    padding-right: 20px;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}

.valoriser {
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

.section-utiliser-pix {
  position: relative;
  background: linear-gradient(
      180deg,
      rgba(18, 163, 255, 0.9) 0%,
      rgba(61, 104, 255, 0.9) 100%
    ),
    url('/images/background-utiliser-pix.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  padding-top: 80px;
  padding-bottom: 70px;
  color: $white;

  h2 {
    text-align: center;
    margin-bottom: 60px;
    margin-top: 0;
    font-weight: 400;
    font-size: 36px;
    line-height: 49px;
  }

  .container {
    display: flex;
    flex-flow: row wrap;
  }

  .column {
    width: 100%;
    padding: 0 20px;

    @include device-is('large-mobile') {
      width: 25%;
      padding: 0 38px;
    }
    @include device-is('tablet') {
      padding: 0 20px;
    }

    h3 {
      font-weight: 300;
      font-size: 58px;
      line-height: 68px;
      text-align: left;
    }

    h4 {
      font-weight: 300;
      text-align: left;
      font-size: 28px;
      line-height: 38px;
    }

    p {
      font-size: 14px;
      font-weight: 700;
      text-align: left;
    }

    &:nth-child(1),
    &:nth-child(2) {
      margin-bottom: 48px;

      @include device-is('large-mobile') {
        margin-bottom: 0;
      }
    }
  }
}

.deploiement {
  &__container {
    max-width: 1140px;
    margin: 0 auto;
    text-align: center;
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
        text-align: left;

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

.section-agenda {
  position: relative;
  overflow: hidden;
  padding: 0 20px 80px 20px;

  @include device-is('large-mobile') {
    padding: 0 0;
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
    background-color: $grey-3;
  }

  h2 {
    margin-top: 32px;
    font-weight: 400;
    margin-bottom: 60px;
    font-size: 28px;
    line-height: 38px;
  }

  .container {
    display: flex;
    flex-flow: column;
    padding: 0;

    .column {
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
      background-color: $white;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      padding: 20px 20px;

      @include device-is('tablet') {
        width: 760px;
        padding: 26px 90px;
      }

      h4 {
        margin-bottom: 6px;
        font-weight: 600;
        text-align: left;
        font-size: 18px;
        line-height: 24px;
      }

      p {
        margin: 0;
      }
    }
  }
}

.deploiement-end {
  &__container {
    max-width: 1140px;
    margin: 0 auto;
    text-align: center;
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
        text-align: left;

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

.key-numbers {
  &__title {
    margin-bottom: 60px;
    text-align: center;
    font-size: 36px;
    font-weight: 400;
    line-height: 49px;
    color: $grey-1;
  }

  &__list {
    display: flex;
    flex-flow: row wrap;
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
</style>
