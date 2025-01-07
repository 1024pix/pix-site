<template>
  <section :id="`slice-${props.indexForId}`" class="slice-testimonials">
    <h2 class="slice-testimonials__title">{{ $t('slices.testimonials.title') }}</h2>
    <el-carousel
      ref="carouselElement"
      :type="carouselType"
      height="17rem"
      card-scale="0.66"
      :autoplay="false"
      indicator-position="none"
      arrow="always"
    >
      <el-carousel-item v-for="item in testimonials" :key="item.name+item.company">
        <div class="slice-testimonials__item">
          <div class="slice-testimonials__testimonial-header">
            <nuxt-img class="photo" :src="item.photo.url" alt="" />
            <div class="infos">
              <strong>{{ item.name }}</strong>
              <small>{{ item.job }}, {{ item.company }}</small>
            </div>
          </div>
          <blockquote class="slice-testimonials__testimonial-content">
            <prismic-rich-text :field="item.testimonial" />
          </blockquote>
          <pix-prismic-link
            v-if="item.link?.link_type === 'Web'"
            class="slice-testimonials__testimonial-link"
            :field="item.link"
          >
            {{ $t('slices.testimonials.link') }}
          </pix-prismic-link>
        </div>
      </el-carousel-item>
    </el-carousel>
  </section>
</template>

<script setup>
import { useResizeObserver, useThrottleFn, useWindowSize } from '@vueuse/core';

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

const testimonials = computed(() => {
  return props.slice.items;
});

const carouselElement = ref(null);
const { width } = useWindowSize();
const carouselType = ref(width.value > 800 ? 'card' : 'normal');

useResizeObserver(carouselElement, useThrottleFn(async ([entry]) => {
  const { width } = entry.contentRect;

  const previousCarouselType = carouselType.value;
  carouselType.value = width > 800 ? 'card' : 'normal';

  if (previousCarouselType !== carouselType.value) {
    carouselElement.value.next();
  }
}, 500));
</script>

<style lang="scss">
</style>
