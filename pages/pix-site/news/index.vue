<template>
  <div class="news">
    <header class="page-header">
      <div class="container md padding-container">
        <h1 class="page-header__title">
          {{ $t('news-page-title') }}
        </h1>
      </div>
    </header>

    <main class="page-body">
      <div class="news__list">
        <template v-if="newsItems && newsItems.length">
          <news-item-card
            v-for="(item, index) in newsItems"
            :key="`item-${index}`"
            :slice="item.data"
            :uid="item.uid"
          />
        </template>
        <template v-else>
          <p>{{ $t('news-page-no-news') }}</p>
        </template>
      </div>
    </main>
  </div>
</template>
<script>
import { documentFetcher } from '~/services/document-fetcher'
import NewsItemCard from '@/components/NewsItemCard'

export default {
  name: 'Index',
  nuxtI18n: {
    paths: {
      fr: '/actualites',
      'fr-fr': '/actualites',
      'en-gb': '/news',
    },
  },
  components: {
    NewsItemCard,
  },
  async asyncData({ app, error, req }) {
    try {
      const newsItems = await documentFetcher(
        app.$prismic,
        app.i18n,
        req
      ).findNewsItems()
      return { newsItems }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error({ e })
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    const pageTitle = this.$t('page-titles.news')
    return {
      title: pageTitle,
    }
  },
}
</script>

<style lang="scss">
.news {
  h1,
  h2,
  h3,
  h4,
  p {
    font-family: $font-open-sans;
  }

  &__list {
    max-width: 1140px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    @media (min-width: 700px) {
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-evenly;
    }
  }
}
</style>
