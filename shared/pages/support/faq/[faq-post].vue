<template>
  <div class="faq-post">
    <support-header
      :title="data.currentPersona.faq_page_title[0].text"
      :icon="data.currentPersona.icon.url"
      :back-link="backLink"
    />
    <section class="faq-post__content-wrapper">
      <h1 class="faq-post__title">{{ data.content.title[0].text }}</h1>
      <prismic-rich-text class="faq-post__content" :field="data.content.content" />
      <support-contact v-if="data.contactForm" :contact-form-id="data.contactForm.uid" />
    </section>
  </div>
</template>

<script setup>
const { client } = usePrismic();
const { locale: i18nLocale } = useI18n();
const route = useRoute();

/* I18n Routes */
defineI18nRoute({
  paths: {
    en: '/support/[parent_persona]/[current_persona]/[post_uid]',
    fr: '/support/[parent_persona]/[current_persona]/[post_uid]',
    'fr-fr': '/support/[parent_persona]/[current_persona]/[post_uid]',
    'fr-be': '/support/[parent_persona]/[current_persona]/[post_uid]',
    'nl-be': '/support/[parent_persona]/[current_persona]/[post_uid]',
  },
});

const backLink = computed(() => {
  const localeUrl = i18nLocale.value !== 'fr-fr' ? `/${i18nLocale.value}` : '';
  return `${localeUrl}/support/${route.params.parent_persona}/${route.params.current_persona}`;
});

/* Fetch post data */
const { data } = await useAsyncData(async () => {
  try {
    const document = await client.getByUID('support__faq_post', route.params.post_uid, { lang: i18nLocale.value });

    const currentPersona = await client.getByUID('support__persona_faq', route.params.current_persona, {
      lang: i18nLocale.value,
    });

    const contactForm = document.data.contact_form_link.id
      ? await client.getByID(document.data.contact_form_link.id, { lang: i18nLocale.value })
      : null;

    return {
      content: document.data,
      currentPersona: {
        uid: currentPersona.uid,
        ...currentPersona.data,
      },
      contactForm,
    };
  } catch (err) {
    console.error(err);
    error({ statusCode: 404, message: 'Page not found' });
  }
});
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
