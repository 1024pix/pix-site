<template>
  <section class="faq-post">
    <div class="faq-post__content-wrapper">
      <h1 class="faq-post__title">{{ content.title[0].text }}</h1>
      <prismic-rich-text class="faq-post__content" :field="content.content" />
      <div class="faq-post__contact">
        <h2 class="faq-post__contact-title">
          {{ $t('support.faq.more-help') }}
        </h2>
        <p class="faq-post__contact-text">
          {{ $t('support.faq.contact-text') }}
        </p>
        <a href="#" class="faq-post__contact-link">
          {{ $t('support.faq.contact-cta') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import { DOCUMENTS } from '~/services/document-fetcher'

export default {
  name: 'SupportFaqPost',
  nuxtI18n: {
    paths: {
      en: '/support/faq/:slug',
      fr: '/support/faq/:slug',
      'fr-fr': '/support/faq/:slug',
      'fr-be': '/support/faq/:slug',
    },
  },
  async asyncData({ app, error, route }) {
    try {
      const locale = app.i18n.locale || app.i18n.defaultLocale
      const document = await app.$prismic.api.query(
        app.$prismic.predicates.at(
          `my.${DOCUMENTS.SUPPORT_FAQ_POST}.uid`,
          route.params.slug
        ),
        { lang: locale }
      )
      const content = document.results[0].data
      return { content }
    } catch (error) {
      console.error(error)
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

<style lang="scss">
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

.faq-post__contact {
  border: 1px solid $grey-22;
  border-radius: 0.5rem;
  padding: 2rem;
  margin-top: 2rem;
  text-align: center;
}

.faq-post__contact-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
}

.faq-post__contact-text {
  font-size: 1.125rem;
}

.faq-post__contact-link {
  margin-top: 1rem;
  padding: 0.5em 1em;
  border-radius: 2rem;
  background-color: #613fdd;
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
}
</style>
