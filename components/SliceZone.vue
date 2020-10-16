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
      <template v-if="slice.slice_type === 'old-banner'">
        <hero-banner
          :section-class="'index__hero-banner'"
          :background-class="'hero-banner__background'"
          :content-class="'hero-banner__content'"
          :button-class="'hero-banner-content__button'"
          :slice="slice"
        >
        </hero-banner>
      </template>
      <template v-if="slice.slice_type === 'old-demo'">
        <img-text-column
          :slice="slice"
          :section-class="'section-demo'"
          :container-class="'section-demo__container'"
          :button-class="'section-demo__button'"
        ></img-text-column>
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
      <template v-if="slice.slice_type === 'features'">
        <features-slice :slice="slice" />
      </template>
      <template v-if="slice.slice_type === 'article'">
        <article-slice :slice="slice" :button-class="'section-demo__button'" />
      </template>
      <template v-if="slice.slice_type === 'process'">
        <process-slice :slice="slice" />
      </template>
      <template v-if="slice.slice_type === 'multiple_block'">
        <multiple-block-slice :slice="slice" />
      </template>
      <template v-if="slice.slice_type === 'partners_logos'">
        <partners-logos-slice :slice="slice" />
      </template>
    </section>
  </div>
</template>

<script>
import ProcessSlice from '@/components/slices/Process'
import PageBanner from '@/components/slices/PageBanner'
import ArticleSlice from '@/components/slices/Article'
import HeroBanner from '@/components/slices/HeroBanner'
import ImgTextColumn from '@/components/slices/ImgTextColumn'
import MultipleColumn from '@/components/slices/MultipleColumn'
import PopInCampaigns from '@/components/slices/PopInCampaigns'
import PageSection from '@/components/slices/PageSection'
import WebSnippet from '@/components/slices/WebSnippet'
import FeaturesSlice from '@/components/slices/Features'
import MultipleBlockSlice from '@/components/slices/MultipleBlock'
import PartnersLogosSlice from '@/components/slices/PartnersLogos'

export default {
  name: 'SliceZone',
  components: {
    MultipleBlockSlice,
    PageBanner,
    ArticleSlice,
    HeroBanner,
    ImgTextColumn,
    MultipleColumn,
    PopInCampaigns,
    PageSection,
    WebSnippet,
    FeaturesSlice,
    ProcessSlice,
    PartnersLogosSlice,
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
