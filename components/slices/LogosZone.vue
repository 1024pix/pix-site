<template>
  <div class="logos-zone">
    <div
      v-for="(logo, index) in slice.items"
      :key="`logo-${index}`"
      class="logos-zone__content"
    >
      <nuxt-link v-if="hasLink(logo)" :to="logo.url">
        <pix-image
          :field="logo.image"
          :has-fixed-dimensions="true"
          :max-height="maxHeight"
        />
      </nuxt-link>
      <pix-image
        v-else
        :field="logo.image"
        :has-fixed-dimensions="true"
        :max-height="maxHeight"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SlicesLogosZone",
  props: {
    slice: {
      type: Object,
      default: null,
    },
    maxHeight: {
      type: Number,
      default: undefined,
    },
  },
  methods: {
    hasLink(item) {
      return item.url.link_type !== "Any";
    },
  },
};
</script>

<style scoped lang="scss">
.logos-zone {
  display: flex;
  justify-content: flex-end;

  .logos-zone__content {
    margin-right: 12px;

    @include device-is("large-screen") {
      margin-right: 24px;
    }

    img {
      margin: 15px 0 15px 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
  @include device-is("desktop") {
    justify-content: flex-start;
  }

  @include device-is("large-screen") {
    margin-right: 40px;
  }
}
</style>
