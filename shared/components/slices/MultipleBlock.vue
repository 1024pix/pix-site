<template>
  <section
    :id="`slice-${indexForId}`"
    :class="blockClass"
    :style="[background]"
  >
    <prismic-rich-text
      v-if="hasTitle && shouldDisplayTitle"
      :class="`${blockClass}__title`"
      :field="title"
    />
    <prismic-rich-text v-else class="sr-only" :field="title" />
    <prismic-rich-text
      v-if="shouldUseSubtitle && hasSubtitle"
      :class="`${blockClass}__subtitle`"
      :field="subtitle"
    />
    <div
      :class="`${blockClass}__wrapper ${blockClass}__wrapper-${items.length}-items`"
    >
      <div
        v-for="(item, itemIndex) in items"
        :key="`item-${itemIndex}`"
        :class="`${blockClass}-wrapper__item`"
      >
        <div :class="`${blockClass}-wrapper-item__image`">
          <img
            v-if="hasImage(item)"
            :src="item.item_image.url"
            alt=""
          />
        </div>
        <div :class="`${blockClass}-wrapper-item__content`">
          <prismic-rich-text
            :class="`${blockClass}-wrapper-item-content__title`"
            :field="item.item_title"
          />
          <prismic-rich-text
            :class="`${blockClass}-wrapper-item-content__description`"
            :field="item.item_description"
            :serializer="customPrismicRichTextSerializer"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SlicesMultipleBlock",
  props: {
    slice: {
      type: Object,
      default: null,
    },
    indexForId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      rows: [],
    };
  },
  setup() {
    const { customPrismicRichTextSerializer } = usePrismicRichTextSerializer();
    return { customPrismicRichTextSerializer };
  },
  computed: {
    background() {
      return {
        backgroundColor: `${this.slice.primary.block_background_color}`,
      };
    },
    blockClass() {
      return this.slice.primary.block_style;
    },
    items() {
      return this.slice.items;
    },
    shouldDisplayTitle() {
      return this.slice.primary.block_should_display_title;
    },
    shouldUseSubtitle() {
      return this.slice.primary.block_should_use_subtitle;
    },
    hasTitle() {
      return (
        this.slice.primary.block_title &&
        this.slice.primary.block_title.length &&
        this.slice.primary.block_title[0].text &&
        this.slice.primary.block_title[0].text.length
      );
    },
    hasSubtitle() {
      return (
        this.slice.primary.block_subtitle &&
        this.slice.primary.block_subtitle.length &&
        this.slice.primary.block_subtitle[0].text &&
        this.slice.primary.block_subtitle[0].text.length
      );
    },
    title() {
      return this.slice.primary.block_title;
    },
    subtitle() {
      return this.slice.primary.block_subtitle;
    },
  },
  methods: {
    hasImage(item) {
      const image = item.item_image;
      return image?.url !== undefined && image?.url !== null;
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/components/slices/features.scss";
@import "../../assets/scss/components/slices/process.scss";
@import "../../assets/scss/components/slices/statistics.scss";
</style>
