<template>
  <div class="slice-zone">
    <section v-for="(slice, index) in slices" :key="`slice-${index}`">
      <template v-if="slice.slice_type === 'rich_text'">
        <prismic-rich-text :field="slice.primary.text" />
      </template>
      <template v-if="slice.slice_type === 'pop-in'">
        <pop-in-campaigns :slice="slice" :index-for-id="index" />
      </template>
      <template v-if="slice.slice_type === 'banner'">
        <page-banner :slice="slice" :index-for-id="index" />
      </template>
      <template v-if="slice.slice_type === 'article'">
        <article-slice :slice="slice" :index-for-id="index" />
      </template>
      <template v-if="slice.slice_type === 'multiple_block'">
        <multiple-block-slice :slice="slice" :index-for-id="index" />
      </template>
      <template v-if="slice.slice_type === 'partners_logos'">
        <partners-logos-slice :slice="slice" :index-for-id="index" />
      </template>
      <template v-if="slice.slice_type === 'latest_news'">
        <latest-news-slice :slice="slice" :index-for-id="index" />
      </template>
      <template v-if="slice.slice_type === 'stat'">
        <stat :slice="slice" :index-for-id="index" />
      </template>
    </section>
  </div>
</template>

<script>
import PageBanner from '@/components/slices/PageBanner'
import ArticleSlice from '@/components/slices/Article'
import LatestNewsSlice from '@/components/slices/LatestNews'
import PopInCampaigns from '@/components/slices/PopInCampaigns'
import MultipleBlockSlice from '@/components/slices/MultipleBlock'
import PartnersLogosSlice from '@/components/slices/PartnersLogos'
import Stat from '@/components/slices/Stat'

export default {
  name: 'SliceZone',
  components: {
    MultipleBlockSlice,
    PageBanner,
    ArticleSlice,
    LatestNewsSlice,
    PopInCampaigns,
    PartnersLogosSlice,
    Stat,
  },
  props: {
    slices: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style></style>
