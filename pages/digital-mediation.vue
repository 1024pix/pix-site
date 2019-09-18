<template>
  <div class="page digital-mediation">
    <section class="hero">
      <div class="background"></div>
      <div class="container padding-container">
        <prismic-rich-text :field="document[0].primary.title" />
        <a class="btn" :href="document[0].items[0].link_button">{{
          $prismic.richTextAsPlain(document[0].items[0].title_button)
        }}</a>
      </div>
    </section>

    <section class="partnerships">
      <div class="background"></div>
      <div class="container padding-container">
        <prismic-rich-text :field="document[1].primary.title" />
        <ul class="partners">
          <li
            v-for="(item, index) in document[1].items"
            :key="`item-${index}`"
            class="partner"
          >
            <prismic-rich-text :field="item.paragraph" />
          </li>
        </ul>
      </div>
    </section>

    <section class="diagnostic">
      <div class="background"></div>
      <div class="container padding-container">
        <prismic-rich-text :field="document[2].primary.title" />
        <prismic-rich-text :field="document[2].primary.description" />
        <div class="features-wrapper">
          <ul class="features">
            <li
              v-for="(item, index) in document[2].items"
              :key="`item-${index}`"
              class="feature"
            >
              <prismic-rich-text :field="item.paragraph" />
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="certification">
      <div class="background"></div>
      <div class="container flex padding-container">
        <div class="container-column">
          <prismic-rich-text :field="document[3].primary.title" />
          <prismic-rich-text :field="document[3].primary.description" />
          <ul class="features">
            <li
              v-for="(item, index) in document[3].items"
              :key="`item-${index}`"
              class="feature"
            >
              <prismic-rich-text :field="item.paragraph" />
            </li>
          </ul>
        </div>
        <div class="container-column">
          <div class="certification-illustration"></div>
        </div>
      </div>
    </section>

    <section class="prescription">
      <div class="background"></div>
      <div class="container padding-container">
        <prismic-rich-text :field="document[4].primary.title" />
        <prismic-rich-text :field="document[4].primary.description" />
        <div class="features-wrapper">
          <ul class="features">
            <li
              v-for="(item, index) in document[4].items"
              :key="`item-${index}`"
              class="feature"
            >
              <prismic-rich-text :field="item.paragraph" />
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="abc-pix">
      <div class="container padding-container">
        <div class="trapeze">
          <!--          <img src="{{rootURL}}/images/ABCPix.svg" alt="" />-->
          <prismic-rich-text :field="document[5].primary.title" />
          <prismic-rich-text :field="document[5].primary.description" />

          <div class="container flex">
            <div
              v-for="(item, index) in document[5].items"
              :key="`item-${index}`"
              class="container-column"
            >
              <prismic-rich-text :field="item.column" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import DocumentFetcher from '~/services/document-fetcher'

export default {
  async asyncData({ app, error }) {
    try {
      const document = await DocumentFetcher(app.i18n).getMediation()
      console.log('paragraph[0]', document.data.body[1].items[0].paragraph[0])
      console.log('items', JSON.stringify(document.data.body[1].items))
      return {
        document: document.data.body
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style scoped></style>
