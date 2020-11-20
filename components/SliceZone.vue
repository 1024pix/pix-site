<template>
  <div class="slice-zone">
    <section v-for="(slice, index) in slices" :key="`slice-${index}`">
      <template v-if="slice.slice_type === 'rich_text'">
        <prismic-rich-text :field="slice.primary.text" />
      </template>
      <template v-if="slice.slice_type === 'multiple_column'">
        <multiple-column :slice="slice" />
      </template>
      <template v-if="slice.slice_type === 'web_snippet'">
        <web-snippet :slice="slice" />
      </template>
      <template v-if="slice.slice_type === 'pop-in'">
        <pop-in-campaigns :slice="slice" />
      </template>
      <template v-if="slice.slice_type === 'banner'">
        <page-banner :slice="slice"></page-banner>
      </template>
      <template v-if="slice.slice_type === 'old-features'">
        <page-section
          :slice="slice"
          :section-class="'index__features'"
          :container-class="'features__container'"
          :flex-container-class="'features-container__list'"
          :flex-content-class="'features-container-list__item'"
        >
        </page-section>
      </template>
      <template v-if="slice.slice_type === 'article'">
        <article-slice :slice="slice" :button-class="'section-demo__button'" />
      </template>
      <template v-if="slice.slice_type === 'multiple_block'">
        <multiple-block-slice :slice="slice" />
      </template>
      <template v-if="slice.slice_type === 'partners_logos'">
        <partners-logos-slice :slice="slice" />
      </template>
      <template v-if="slice.slice_type === 'latest_news'">
        <latest-news-slice :slice="slice" />
      </template>
      <template v-if="slice.slice_type === 'stat'">
        <stat :slice="slice" />
      </template>
    </section>
  </div>
</template>

<script>
import PageBanner from '@/components/slices/PageBanner'
import ArticleSlice from '@/components/slices/Article'
import LatestNewsSlice from '@/components/slices/LatestNews'
import MultipleColumn from '@/components/slices/MultipleColumn'
import PopInCampaigns from '@/components/slices/PopInCampaigns'
import PageSection from '@/components/slices/PageSection'
import WebSnippet from '@/components/slices/WebSnippet'
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
    MultipleColumn,
    PopInCampaigns,
    PageSection,
    WebSnippet,
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
