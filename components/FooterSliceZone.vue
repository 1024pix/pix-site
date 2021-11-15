<template>
  <footer class="footer" role="contentinfo">
    <div class="footer__left">
      <div
        v-for="(slice, index) in usedMainFooter"
        :key="`footer-slice-left-${index}`"
      >
        <template v-if="slice.slice_type === 'logos_zone'">
          <slices-logos-zone :slice="slice" class="footer-left__logos" />
        </template>
        <prismic-rich-text
          v-if="slice.slice_type === 'text'"
          class="footer-left__description"
          :field="slice.primary.text"
        />
        <ul
          v-if="slice.slice_type === 'social_media'"
          class="footer-left__social-media"
        >
          <li>
            <pix-link
              v-for="(socialMedia, socialMediaIndex) in slice.items"
              :key="`socialMedia-${socialMediaIndex}`"
              :field="socialMedia.socialmedia_url"
              class="footer-social-media__icon"
            >
              <pix-image
                :field="socialMedia.socialmedia_image"
                width="30"
                height="30"
              />
            </pix-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer__right">
      <slices-navigation-group
        v-for="(slice, index) in navigationGroups"
        :key="`footer-slice-right-${index}`"
        class="footer-right__navigation"
        :slice="slice"
      />
    </div>
  </footer>
</template>

<script>
import { keyBy } from '~/services/key-by'
import { documentFetcher, documents } from '~/services/document-fetcher'

export default {
  name: 'FooterSliceZone',
  data() {
    return {
      socialMediasHoverMap: {},
      mainFooters: null,
    }
  },
  async fetch() {
    this.mainFooters = await documentFetcher(
      this.$prismic,
      this.$i18n
    ).findByType(documents.mainFooter)
  },
  computed: {
    isPixPro() {
      return process.env.isPixPro
    },
    usedMainFooter() {
      const mainFooterBySite = keyBy(
        this.mainFooters,
        (mainFooter) => mainFooter?.data?.footer_for
      )
      if (this.isPixPro && mainFooterBySite['pix-pro']) {
        return mainFooterBySite['pix-pro'].data.body
      }
      return mainFooterBySite['pix-site'].data.body
    },
    navigationGroups() {
      return this.usedMainFooter.filter(
        (slice) => slice.slice_type === 'navigation_group'
      )
    },
  },
}
</script>

<style lang="scss">
.footer {
  background-color: $grey-10;
  border-top: 1px solid $grey-22;
  padding: 63px 32px;
}

.footer-left {
  &__logos.logos-zone {
    justify-content: flex-start;

    .logos-zone__content {
      margin-right: 32px;
      display: inline;

      img {
        height: 96px;
      }
    }
  }
  &__social-media {
    list-style: none;
    display: flex;
    padding: 0;
    li::before {
      content: none;
    }
    li {
      align-self: center;
      display: inline;
      padding: 0;
    }
  }
  &__description {
    font-size: 0.875rem;
    margin: 0 0 24px 0;
    color: $grey-60;
  }
}

.footer-social-media {
  &__icon {
    margin-right: 16px;
    &:hover {
      filter: brightness(60%);
    }
  }
}

@include device-is('tablet') {
  .footer {
    &__right {
      display: flex;

      .navigation-group:first-child {
        width: 194px;
        padding-left: 0;
      }
      .navigation-group:last-child {
        width: 194px;
        border-right: none;
      }
    }
  }

  .footer-left {
    &__description {
      width: 350px;
    }
  }
}

@include device-is('large-screen') {
  .footer {
    display: flex;
    padding: 47px 98px;
    justify-content: center;

    &__left {
      margin-right: 40px;
    }

    &__right {
      display: flex;

      .navigation-group {
        padding-top: 0;
        padding-bottom: 0;
      }
    }
  }

  .footer-left {
    &__logos.logos-zone {
      margin-right: 0;
    }

    &__description {
      width: 293px;
    }
  }
}
</style>
