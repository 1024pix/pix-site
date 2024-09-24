<template>
  <div v-if="isOpen && hotNews" class="hot-news">
    <prismic-rich-text :field="hotNews" :serializer="customPrismicRichTextSerializer" />
    <img class="close" src="/images/close-icon.svg" alt="Fermer" @click.stop="closeBanner" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const { client, filter } = usePrismic();
const { locale: i18nLocale } = useI18n();

const { customPrismicRichTextSerializer } = usePrismicRichTextSerializer();
const isOpen = ref(true);

const { data: hotNews } = await useAsyncData(async () => {
  const hotNews = await client.get({
    filters: [filter.at('document.type', 'hot_news')],
    lang: i18nLocale.value,
  });

  return hotNews?.results[0].data.description;
});

const closeBanner = () => {
  isOpen.value = false;
};
</script>

<style lang="scss">
.hot-news {
  top: 0;
  left: 0;
  height: 70px;
  width: 100%;

  color: $grey-200;
  background-color: $yellow;
  padding: 2px;

  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    text-align: center;
    line-height: 1rem;
    font-size: 0.875rem;
    margin: 0 auto;

    p {
      margin: 0;
    }
  }

  a {
    color: $grey-200;
    text-decoration: underline;
  }
}
.close {
  margin-right: 20px;
  opacity: 0.5;
  transition: 0.5s;
  cursor: pointer;
  height: 20px;

  @media (min-width: 769px) {
    margin-right: 32px;
  }

  &:hover {
    opacity: 1;
  }
}
</style>
