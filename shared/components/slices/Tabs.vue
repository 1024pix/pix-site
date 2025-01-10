<template>
  <div class="slice-tabs">
    <h2 class="slice-tabs__title">{{ props.slice.primary.block_title }}</h2>
    <el-tabs v-model="activeTab" class="slice-tabs__tabs">
      <el-tab-pane
        v-for="(item, index) in props.slice.items"
        :key="item.tab_title"
        class="slide-tabs__item"
        :label="item.tab_title"
        :name="index"
      >
        <prismic-rich-text :field="item.tab_textual_content" class="slice-tabs__item-text" />
        <div>
          <nuxt-img :src="item.tab_image.url" :alt="item.tab_image.alt" class="slice-tabs__item-image" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
const props = defineProps({
  slice: {
    type: Object,
    default: null,
  },
  indexForId: {
    type: Number,
    default: 0,
  },
});

const activeTab = ref(0);
</script>

<style lang='scss' scoped>
.slice-tabs {
  max-width: 87rem;
  margin: 4rem auto;
  padding-inline: 1rem;
}

.slice-tabs__title {
  color: $grey-90;
  font-weight: $font-normal;
  letter-spacing: 0.00875rem;
  line-height: 2.875rem;
  text-align: center;
  margin-block: 0 3rem;
}

.slice-tabs :deep(.el-tabs__header) {
  display: inline-flex;
  margin: 0 auto 2rem;
  background-color: transparent;
}

.slice-tabs :deep(.el-tabs__item) {
  padding: 2rem !important;
  background: $grey-5;
  border-radius: 2rem;
  border: 1px solid $grey-15;
  font-size: 1rem;
  color: $grey-70;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }

  &:hover {
    background: $grey-10;
  }
}

.slice-tabs :deep(.el-tabs__item.is-active) {
  color: $blue;
  border-color: currentColor;
}

.slice-tabs :deep(.el-tabs__active-bar) {
  display: none;
}

.slice-tabs :deep(.el-tabs__nav-wrap:after) {
  content: none
}

.slide-tabs__item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2rem;

  & > * {
    flex: 1;
    flex-basis: max(calc(50% - 1rem), 30rem);
  }
}
</style>
