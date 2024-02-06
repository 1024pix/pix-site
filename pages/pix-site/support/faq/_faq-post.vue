<template>
  <div class="faq-post">
    <support-header
      :title="currentPersona.faq_page_title[0].text"
      :icon="currentPersona.icon.url"
      :back-link="`/support/${$nuxt.$route.params.parent_persona}/${$nuxt.$route.params.current_persona}`"
    />
    <section class="faq-post__content-wrapper">
      <h1 class="faq-post__title">{{ content.title[0].text }}</h1>
      <prismic-rich-text class="faq-post__content" :field="content.content" />
      <support-contact
        v-if="contactForm"
        :contact-link="`/support/form/${contactForm.uid}`"
      />
    </section>
  </div>
</template>

<script>
import { DOCUMENTS } from '~/services/document-fetcher'
import SupportContact from '~/components/SupportContact.vue'

export default {
  name: 'SupportFaqPost',
  components: { SupportContact },
  nuxtI18n: {
    paths: {
      en: '/support/:parent_persona/:current_persona/:post_uid',
      fr: '/support/:parent_persona/:current_persona/:post_uid',
      'fr-fr': '/support/:parent_persona/:current_persona/:post_uid',
      'fr-be': '/support/:parent_persona/:current_persona/:post_uid',
    },
  },
  async asyncData({ app, error, route }) {
    try {
      const locale = app.i18n.locale || app.i18n.defaultLocale

      const document = await app.$prismic.api.getByUID(
        DOCUMENTS.SUPPORT_FAQ_POST,
        route.params.post_uid,
        { lang: locale }
      )

      const currentPersona = await app.$prismic.api.getByUID(
        DOCUMENTS.SUPPORT_FAQ_PERSONA,
        route.params.current_persona,
        { lang: locale }
      )

      const contactForm = document.data.contact_form_link.id
        ? await app.$prismic.api.getByID(document.data.contact_form_link.id)
        : null

      return {
        content: document.data,
        currentPersona: {
          uid: currentPersona.uid,
          ...currentPersona.data,
        },
        contactForm,
      }
    } catch (err) {
      console.error(err)
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

<style lang="scss">
.faq-post {
  font-family: $font-roboto;
  background: $grey-10;
}

.faq-post__content-wrapper {
  max-width: 50rem;
  padding: 2rem 1rem 3rem;
  margin: 0 auto;
  color: $grey-90;

  h1,
  h2,
  h3 {
    line-height: 1.3;
  }
}

.faq-post__title {
  font-size: 2.25rem;
  font-weight: 700;
  border-bottom: 1px solid #613fdd;
  padding-bottom: 0.5em;
  margin-bottom: 1em;
}

.faq-post__content {
  font-size: 1.125rem;
  line-height: 1.5;

  .block-img {
    text-align: center;
  }

  iframe {
    width: 100%;
    height: auto;
    aspect-ratio: 16/9;
  }

  ol,
  ul {
    list-style: initial;
    margin-left: 1em;

    li::before {
      content: none;
    }
  }

  ol {
    list-style: decimal;
  }

  a {
    color: #613fdd;
    text-decoration: underline;
  }

  h2 {
    margin-top: 1em;
    font-size: 1.75rem;
    font-weight: 700;
  }

  h3 {
    margin-top: 1em;
    font-size: 1.25rem;
    font-weight: 700;
  }
}
</style>
