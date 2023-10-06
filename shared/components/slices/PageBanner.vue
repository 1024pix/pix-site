<template>
  <div :id="`slice-${indexForId}`" :style="[background]">
    <section class="banner row-block">
      <div class="row-block__main-content">
        <prismic-rich-text
          :field="slice.primary.banner_title"
          class="title--big"
          :class="`title--${slice.primary.banner_font_contrast}`"
        />
        <prismic-rich-text
          :field="slice.primary.banner_content"
          class="text--normal"
          :class="`text--${slice.primary.banner_font_contrast}`"
        />
        <slot></slot>
        <div class="banner__button-group">
          <div v-for="(link, index) in slice.items" :key="`item-${index}`">
            <nuxt-link
              v-if="!isVideo(link)"
              :to="link.banner_link_url.url"
              class="button"
              :class="videoClass(link)"
            >
              {{ link.banner_link_text }}
            </nuxt-link>
            <template v-if="isVideo(link)">
              <button
                class="button button-video"
                :class="`button--${fontContrast}`"
                @click="toggleModal"
              >
                <fa icon="play-circle" />
                {{ link.banner_link_text }}
              </button>
              <modal v-if="showModal" @close-modal="toggleModal">
                <media-player :video-url="link.banner_link_url.url" />
              </modal>
            </template>
          </div>
        </div>
      </div>
      <pix-image
        v-if="hasImage"
        :field="slice.primary.banner_image"
        class="row-block__side-content"
      />
    </section>
  </div>
</template>

<script setup>
const img = useImage();

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

/* Background */
const hasBackgroundImage =
  props.slice.primary.banner_background &&
  props.slice.primary.banner_background.url;

let background = {};
if (hasBackgroundImage) {
  background = {
    // Use @nuxt/image to download image during static build
    background: `no-repeat url(${img(
      props.slice.primary.banner_background.url
    )})`,
    backgroundSize: "cover",
    backgroundPosition: "bottom",
  };
} else {
  background.backgroundColor = props.slice.primary.banner_background_color;
}

/* Image */
const hasImage =
  props.slice.primary.banner_image && props.slice.primary.banner_image.url;

/* Video */
function isVideo(link) {
  return link?.banner_link_url?.url?.includes("pix-videos/");
}

function videoClass(link) {
  return isVideo(link)
    ? "banner__video"
    : "button--" + props.slice.primary.banner_font_contrast;
}

/* Modal */
const showModal = ref(false);

function toggleModal() {
  showModal.value = !showModal.value;
}
</script>

<style lang="scss">
.banner {
  text-align: center;

  .text--normal p {
    margin: 16px 0 24px;
  }

  .banner__button-group {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .button {
      margin: 5px 0;
    }
  }

  &.row-block {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      "a a a a"
      "b b b b";
    grid-gap: 16px;

    font-family: $font-open-sans;
    padding: 81px 0;
    margin: 0 16px;

    & > * {
      max-width: 100%;
    }

    .row-block__main-content {
      grid-area: a;
    }

    .row-block__side-content {
      grid-area: b;
      display: none;
    }
  }
}

@include device-is("tablet") {
  .banner {
    padding: 80px 0;

    .banner__button-group {
      flex-direction: row;

      .button {
        width: initial;
        margin: 0 10px;
      }
    }

    &.row-block {
      margin: 0 32px;
      grid-template-columns: repeat(8, 1fr);
      grid-template-areas:
        "a a a a a a a a"
        "b b b b b b b b";
    }
  }
}

@include device-is("desktop") {
  .banner.row-block {
    margin: 0 32px;
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "a a a a a a a a a a a a"
      ". . . b b b b b b . . .";

    .row-block__side-content {
      display: initial;
      width: 100%;
      box-sizing: border-box;
    }
  }
}

@include device-is("large-screen") {
  .banner.row-block {
    margin: 0 auto;
    grid-template-columns: 1.2fr repeat(12, 1fr) 1.2fr;
    grid-template-areas: ". a a a a a a . b b b b b .";
    grid-gap: 24px;

    .row-block__main-content {
      text-align: left;
      align-self: center;

      .banner__button-group {
        justify-content: flex-start;

        .button {
          margin: 0 20px 0 0;
        }
      }
    }
  }
}
</style>
