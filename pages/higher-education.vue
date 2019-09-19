<template>
  <div class="page higher-education">
    <section class="hero">
      <div class="background"></div>
      <div class="container padding-container">
        <prismic-rich-text :field="document[0].primary.title" />
        <a class="btn" :href="document[0].items[0].link_button">
          {{ $prismic.richTextAsPlain(document[0].items[0].title_button) }}
        </a>
      </div>
    </section>

    <section class="partnerships">
      <div class="container padding-container justify">
        <div
          v-for="(item, index) in document[1].items[0]"
          :key="`item-${index}`"
          class="column"
        >
          <prismic-rich-text :field="item.paragraph" />
        </div>
      </div>
    </section>
    <section-slice
      :content="document[2]"
      :section-class="'diagnostic'"
      :ul-class="'features'"
      :li-class="'feature'"
    >
    </section-slice>

    <section-column-slice
      :content="document[3]"
      :section-class="'section-developper'"
      :ul-class="'features'"
      :li-class="'feature'"
      :right-class="'certification-illustration'"
    >
    </section-column-slice>

    <section-slice
      :content="document[4]"
      :section-class="'prescription'"
      :ul-class="'features'"
      :li-class="'feature'"
    >
    </section-slice>

    <section class="section-utiliser-pix">
      <prismic-rich-text :field="document[5].primary.title" />
      <div class="container">
        <div
          class="column"
          v-for="(item, index) in document[5].items"
          :key="`item-${index}`"
        >
          <prismic-rich-text :field="item.column_number" />
          <prismic-rich-text :field="item.column_title" />
          <hr class="text-left mb-2 mt-2" />
          <prismic-rich-text :field="item.column_description" />
        </div>
        <div style="margin:auto;">
          <a class="btn" :href="document[5].primary.button_link">
            {{ $prismic.richTextAsPlain(document[5].primary.button_text) }}
          </a>
        </div>
      </div>
    </section>

    <section class="section-comment-ca-marche">
      <prismic-rich-text :field="document[6].primary.title" />
      <div class="container">
        <div
          class="column"
          v-for="(item, index) in document[6].items"
          :key="`item-${index}`"
        >
          <div class="inner">
            <prismic-rich-text :field="item.card_title" />
            <prismic-rich-text :field="item.card_description" />
          </div>
        </div>
      </div>
    </section>

    <section class="section-agenda">
      <div class="hero-background"></div>
      <div class="container">
        <prismic-image :field="document[7].primary.logo" />
        <prismic-rich-text :field="document[7].primary.title" />
        <div style="margin:auto;">
          <div
            class="column mb-0-2"
            v-for="(item, index) in document[7].items"
            :key="`item-${index}`"
          >
            <prismic-rich-text :field="item.card_title" />
            <prismic-rich-text :field="item.card_description" />
          </div>
        </div>
      </div>
    </section>
    <key-numbers :content="document[8].primary.ressources_content">
    </key-numbers>
  </div>
</template>

<script>
import DocumentFetcher from '~/services/document-fetcher'
import SectionSlice from '~/components/slices/section'
import SectionColumnSlice from '~/components/slices/section-column'
import KeyNumbers from '~/components/slices/key-numbers'

export default {
  name: 'HigherEducation',
  components: { KeyNumbers, SectionSlice, SectionColumnSlice },
  async asyncData({ app, error }) {
    try {
      const document = await DocumentFetcher(app.i18n).getHigherEducation()
      console.log(
        'body',
        JSON.stringify(document.data.body[8].primary.ressources_content)
      )
      console.log(
        'data',
        JSON.stringify(document.data.body[8].primary.ressources_content.data)
      )
      return {
        document: document.data.body
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style lang="scss">
.page.higher-education {
  color: #222222;

  h1 {
    font-family: 'Open Sans', Arial, sans-serif;
    font-weight: bold;
    margin: 0 0 30px;
    font-size: 1.875rem;
    line-height: 2.375rem;

    @include device-is('tablet') {
      font-size: 2.875rem;
      line-height: 3.875rem;
    }
  }

  h2 {
    font-family: 'Open Sans', Arial, sans-serif;
    font-size: 2.25rem;
    line-height: 3.125rem;
    font-weight: normal;
    margin: 0;
    text-align: center;
    padding: 40px 0;

    @include device-is('tablet') {
      padding-bottom: 10px;
    }
  }

  h3 {
    font-family: 'Open Sans', Arial, sans-serif;
    font-weight: 300;
    font-size: 1.375rem;
    line-height: 1.875rem;
    margin: 0 0 15px;
  }

  h4 {
    font-family: 'Open Sans', Arial, sans-serif;
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: normal;
    margin: 0 0 5px;
  }

  p {
    font-family: 'Open Sans', Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.6rem;
    font-weight: 300;
    margin: 0 0 15px;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    @include device-is('tablet') {
      flex-direction: row;
      justify-content: space-between;
    }

    li {
      margin: 0;
      padding: 0;
      flex-basis: 0;
      flex-grow: 1;
      text-align: center;
      box-sizing: border-box;

      @include device-is('tablet') {
        margin: 0;
      }

      &::before {
        content: '';
        margin: 0;
        padding: 0;
      }
    }
  }

  section {
    position: relative;

    @include device-is('tablet') {
      padding: 60px 0 80px;
    }

    .features-wrapper {
      display: flex;
      flex-direction: column;

      @include device-is('tablet') {
        flex-direction: row;
        justify-content: space-between;
      }

      .features {
        display: flex;
        flex-direction: column;

        @include device-is('tablet') {
          flex-direction: row;
          margin-left: -15px;
        }

        .feature {
          display: block;
          text-align: left;
          margin-bottom: 15px;

          @include device-is('tablet') {
            margin-bottom: 0;
            padding-left: 15px;
            min-width: 50%;
            max-width: 50%;
          }

          p {
            @include device-is('tablet') {
              min-height: 140px;
            }
          }
        }
      }
    }

    .container-flex {
      display: flex;
      flex-direction: column;

      @include device-is('tablet') {
        flex-direction: row;
        flex-flow: row wrap;
        justify-content: space-between;
      }
    }

    .container-column {
      width: 100%;

      .block-img {
        height: 25px;

        & > img {
          width: 50px;
        }
      }

      @include device-is('tablet') {
        width: 50%;
      }
    }

    &.hero {
      height: 395px;
      overflow: hidden;
      color: white;
      padding-top: 60px;

      @include device-is('tablet') {
        padding: 200px 0 100px;
        height: 520px;
        padding-top: 160px;
      }

      .background {
        position: absolute;
        background: linear-gradient(
            180deg,
            rgba(18, 163, 255, 0.8) 0,
            rgba(61, 104, 255, 0.8) 100%
          ),
          url('/images/bg-hero-mednum.jpg');
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
              180deg,
              rgba(18, 163, 255, 0.8) 0,
              rgba(61, 104, 255, 0.8) 100%
            ),
            url('/images/bg-hero-mednum@2x.jpg');
          background-repeat: no-repeat;
          background-size: cover;
          background-position: top center;
        }
      }

      .padding-container {
        padding: 0 10px;
      }

      h1 {
        @include device-is('tablet') {
          max-width: 686px;
        }
      }
    }

    &.partnerships {
      h2 {
        margin-bottom: 30px;
      }

      background-color: $white;

      .partners {
        .partner {
          margin-bottom: 30px;

          @include device-is('tablet') {
            margin: 0 60px;
          }

          img {
            margin-bottom: 20px;
            max-width: 100%;

            @include device-is('tablet') {
              height: 100px;
              margin-bottom: 10px;
            }
          }
        }
      }
    }

    &.diagnostic {
      padding-bottom: 30px;

      @include device-is('tablet') {
        padding-top: 90px;
        padding-bottom: 80px;
      }

      h2 {
        padding-bottom: 10px;
      }

      h3 {
        text-align: center;
        max-width: 760px;
        margin: 0 auto 60px;

        @include device-is('tablet') {
          margin-bottom: 90px;
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

    &.certification {
      color: white;
      padding: 30px 0 140px;

      @include device-is('tablet') {
        height: 790px;
        padding-bottom: 60px;
      }

      .background {
        position: absolute;
        background: linear-gradient(135.25deg, #985fff 0%, #388aff 100%);
        transform: skewY(3deg);
        transform-origin: bottom right;
        z-index: -1;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      h2 {
        text-align: left;
        padding-top: 0;

        @include device-is('tablet') {
          margin-top: 30px;
        }
      }

      h4 {
        font-weight: 600;
      }

      p {
        font-weight: 400;
      }

      .features {
        display: flex;
        flex-direction: column;

        .feature {
          text-align: left;
          margin-top: 30px;

          @include device-is('tablet') {
            margin-top: 60px;
          }
        }
      }

      .certification-illustration {
        background: url(/images/certif-illustration.png);
        background-repeat: no-repeat;
        display: block;
        height: 240px;
        width: 200px;
        content: ' ';
        background-size: 100%;
        position: absolute;
        left: 20%;

        @include device-is('tablet') {
          display: block;
          background: url('/images/certif-illustration@2x.png');
          background-repeat: no-repeat;
          background-size: 100%;
          position: absolute;
          top: 40px;
          left: auto;
          height: 100%;
          width: 600px;
          max-width: 50%;
        }
      }
    }

    &.prescription {
      padding-top: 140px;
      padding-bottom: 0;
      margin-top: -30px;

      @include device-is('tablet') {
        margin-top: -90px;
        padding-top: 60px;
      }

      h2 {
        padding-bottom: 10px;
      }

      h3 {
        text-align: center;
        max-width: 760px;
        margin: 0 auto 60px;

        @include device-is('tablet') {
          margin-bottom: 90px;
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
        background: white;
        transform: skewY(-3deg);
        transform-origin: top left;
      }
    }

    &.abc-pix {
      padding: 0;
      margin-bottom: 90px;

      img {
        display: block;
      }

      h2 {
        color: white;
        text-align: left;
        padding-top: 0;

        @include device-is('tablet') {
          margin-bottom: 40px;
        }
      }

      h4 {
        font-weight: 600;
        text-transform: uppercase;
      }

      p {
        font-size: 1.125rem;
        line-height: 1.875rem;
        font-weight: 400;
        margin-bottom: 40px;
        max-width: 430px;
      }

      .trapeze {
        background: linear-gradient(to right, #ffbe00 0%, #ff9f00 100%);
        border-radius: 20px;
        padding: 15px;
        padding-bottom: 0;

        @include device-is('tablet') {
          padding: 70px;
        }
      }

      .info {
        &:before {
          display: block;
          content: ' ';
          margin: 30px auto;

          @include device-is('tablet') {
            position: absolute;
            display: inline-block;
          }
        }

        .info__body {
          @include device-is('tablet') {
            padding-left: 74px;
          }
        }
      }

      .info--experiment {
        &:before {
          background: url('/images/experiment-results-icon.svg') no-repeat;
          width: 51px;
          height: 65px;
        }
      }

      .info--forthcoming {
        &:before {
          background: url('/images/a-venir-icon.svg') no-repeat;
          width: 64px;
          height: 64px;
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

    .container {
      display: flex;
      flex-flow: row wrap;
    }

    .column {
      width: 100%;
      padding: 0 20px;

      @include device-is('large-mobile') {
        width: 33.33%;
        padding: 0 38px;
      }
      @include device-is('tablet') {
        padding: 0 20px;
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

  .section-comment-ca-marche {
    position: relative;
    background: url('/images/background-comment-ca-marche.jpg') no-repeat center
      center;
    background-size: cover;
    padding-top: 80px;
    padding-bottom: 108px;

    .container {
      display: flex;
      flex-flow: row wrap;
    }

    .inner {
      padding: 60px 22px;
      background-color: white;
      min-height: 300px;
      border-radius: 10px;
      box-shadow: 0 15px 16px 0 rgba(12, 22, 58, 0.15),
        0 3px 6px 0 rgba(0, 0, 0, 0.1);
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

  .section-agenda {
    position: relative;
    overflow: hidden;
    padding: 80px 20px;

    @include device-is('large-mobile') {
      padding: 0 0;
    }

    .container {
      display: flex;
      flex-flow: column;

      @include device-is('large-mobile') {
        padding: 80px 38px;
      }
      @include device-is('tablet') {
        padding: 100px 0 160px 0;
      }

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
      }
    }

    .hero-background {
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

  .section-developper {
    position: relative;
    padding: 60px 0 70px 0;
    color: $white;

    @include device-is('large-mobile') {
      padding: 100px 0 100px 0;
    }
    @include device-is('tablet') {
      padding: 100px 0 180px 0;
    }

    .box {
      width: 100%;
      @include device-is('large-mobile') {
        width: 471px;
        height: 581px;
      }
    }

    .margin-top {
      margin-top: 48px;

      @include device-is('large-mobile') {
        margin-top: 0;
      }
    }

    .column-sup {
      @include device-is('large-mobile') {
        padding: 0 43px 0 0;
      }
      @include device-is('tablet') {
        padding: 0 46px;
      }
    }

    .title-top {
      max-width: 1140px;
      margin: auto;
      margin-bottom: 64px;
      padding-left: 20px;

      @include device-is('large-mobile') {
        padding-left: 38px;
      }
      @include device-is('tablet') {
        padding-left: 46px;
      }
    }

    .container {
      display: flex;
      flex-flow: column;
      padding: 0 20px;

      @include device-is('large-mobile') {
        padding: 0 38px;
        flex-flow: row;
      }
      @include device-is('tablet') {
        padding: 0 0;
      }

      .txt {
        display: flex;
        flex-flow: column;

        @include device-is('large-mobile') {
          flex-flow: row;
          width: 600px;
        }
      }

      .column {
        @include device-is('large-mobile') {
          padding: 0 0 0 46px;
        }
        @include device-is('tablet') {
          padding: 60px 46px;
        }
      }

      img {
        max-width: 100%;
        height: auto;
        display: block;
        border-radius: 0 0 0 0;
        margin-bottom: 24px;

        @include device-is('large-mobile') {
          margin-bottom: 0;
        }
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
      background: linear-gradient(135.25deg, #388aff 0%, #985fff 100%);
      transform: skewY(3deg);
      transform-origin: bottom right;
    }

    .features {
      display: flex;
      flex-direction: column;

      .feature {
        text-align: left;
        margin-top: 30px;

        @include device-is('tablet') {
          margin-top: 60px;
        }
      }
    }
  }
}
</style>
