<template>
  <div class="faq-persona">
    <support-header
      :title="currentPersona.faq_page_title[0].text"
      :icon="currentPersona.icon.url"
      :back-link="`/support/${$nuxt.$route.params.parent_persona}`"
    />
    <div class="faq-persona__content-wrapper">
      <section
        v-if="currentPersona.popular_posts.length"
        class="faq-persona__popular-posts"
      >
        <h2 class="faq-persona-popular-posts__title">
          {{ currentPersona.popular_posts_title[0]?.text }}
        </h2>
        <ul class="faq-persona-popular-posts-list">
          <li
            v-for="popularPost in currentPersona.popular_posts"
            :key="popularPost.post.slug"
          >
            <nuxt-link :to="`${$nuxt.$route.path}/${popularPost.post.uid}`">
              {{ getPostTitle(popularPost.post.uid) }}
            </nuxt-link>
          </li>
        </ul>
      </section>
      <section v-if="currentPersona.body" class="faq-persona__posts">
        <ul class="faq-persona-posts__primary-list">
          <li v-for="category in currentPersona.body" :key="category.id">
            <details>
              <summary>
                <h3 class="title">
                  {{ category.primary.category_name[0].text }}
                </h3>
                <p class="description">
                  {{ category.primary.category_description[0].text }}
                </p>
              </summary>
              <ul class="faq-persona-posts__secondary-list">
                <li v-for="post in category.items" :key="post.post.id">
                  <h4 v-if="post.sub_category" class="sub-category">
                    {{ post.sub_category }}
                  </h4>
                  <nuxt-link :to="`${$nuxt.$route.path}/${post.post.uid}`">
                    {{ getPostTitle(post.post.uid) }}
                  </nuxt-link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </section>
      <support-contact
        v-if="contactForm"
        :contact-link="`/support/form/${contactForm.uid}`"
      />
    </div>
  </div>
</template>

<script>
import { DOCUMENTS } from '~/services/document-fetcher'
import SupportHeader from '~/components/SupportHeader.vue'
import SupportContact from '~/components/SupportContact.vue'

export default {
  name: 'SupportPersona',
  components: { SupportHeader, SupportContact },
  nuxtI18n: {
    paths: {
      en: '/support/:parent_persona/:current_persona',
      fr: '/support/:parent_persona/:current_persona',
      'fr-fr': '/support/:parent_persona/:current_persona',
      'fr-be': '/support/:parent_persona/:current_persona',
    },
  },
  async asyncData({ app, error, route }) {
    try {
      const locale = app.i18n.locale || app.i18n.defaultLocale

      const queryPersona = await app.$prismic.api.getByUID(
        DOCUMENTS.SUPPORT_FAQ_PERSONA,
        route.params.current_persona,
        { lang: locale }
      )

      const queryPosts = await app.$prismic.api.query(
        [
          app.$prismic.predicates.at(
            'document.type',
            DOCUMENTS.SUPPORT_FAQ_POST
          ),
        ],
        { lang: locale }
      )

      const contactForm = queryPersona.data.contact_form_link.id
        ? await app.$prismic.api.getByID(queryPersona.data.contact_form_link.id)
        : null

      return {
        currentPersona: {
          uid: queryPersona.uid,
          ...queryPersona.data,
        },
        personaPosts: queryPosts.results,
        contactForm,
      }
    } catch (err) {
      console.error(err)
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {
    getPostTitle(uid) {
      const post = this.personaPosts.find((post) => {
        return post.uid === uid
      })
      return post?.data.title[0].text
    },
  },
}
</script>

<style lang="scss">
.faq-persona {
  font-family: $font-roboto;
  background: $grey-10;
}

.faq-persona__content-wrapper {
  max-width: 50rem;
  padding: 2rem 1rem 3rem;
  margin: 0 auto;
  color: $grey-90;

  ul,
  ol {
    list-style-type: none;
  }

  li {
    padding: 0;
  }

  li::before {
    content: none;
  }
}

// Popular posts
.faq-persona-popular-posts__title {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.3;
}

.faq-persona-popular-posts-list {
  margin: 1rem 0 2rem;
  padding-left: 0;

  li + li {
    margin-top: 0.5rem;
  }

  a {
    display: block;
    padding: 0.125em 0;
    font-size: 1.125rem;
    color: $blue;

    &:hover {
      text-decoration: underline;
    }
  }
}

// Posts
.faq-persona-posts__primary-list {
  margin: 0;
  padding-left: 0;

  & > li + li {
    margin-top: 0.75rem;
  }

  details {
    border: 1px solid $grey-22;
    border-radius: 0.5rem;
    overflow: hidden;
  }

  summary {
    position: relative;
    padding: 1rem 3rem 1rem 1rem;
    background: white;

    &:hover {
      cursor: pointer;
      background: $grey-10;
    }

    &::marker {
      content: none;
    }

    &::after {
      position: absolute;
      top: calc(50% - 0.25rem);
      right: 1.25rem;
      width: 0.5rem;
      height: 0.5rem;
      border-left: 2px solid currentColor;
      border-top: 2px solid currentColor;
      transform: rotate(-135deg);
      content: '';
    }

    .title {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 700;
      line-height: 1.3;
      color: $grey-80;
    }

    .description {
      margin: 0;
      font-size: 0.875rem;
      color: $grey-50;
    }
  }

  details[open] summary::after {
    top: 50%;
    transform: rotate(45deg);
  }
}

.faq-persona-posts__secondary-list {
  margin: 0;
  padding: 1.5rem 0;
  background: white;
  border-top: 1px solid $grey-22;

  .sub-category {
    padding: 0 1rem;
    color: $grey-50;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    text-transform: uppercase;
  }

  li:not(:first-child) .sub-category {
    margin-top: 1rem;
  }

  a {
    display: block;
    padding: 0.375rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: $communication-dark;

    &:hover {
      color: $grey-90;
      background: #b0d3f4;
    }
  }
}
</style>
