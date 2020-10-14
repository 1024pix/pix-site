<template>
  <footer class="footer" role="contentinfo">
    <div
      v-for="(slice, index) in usedMainFooter.data.body"
      :key="`footer-slice-left-${index}`"
    >
      <template v-if="slice.slice_type === 'logos_zone'">
        <logos-zone :slice="slice" class="footer__logos" />
      </template>
      <div
        v-if="slice.slice_type === 'social_media'"
        class="footer__social-media"
      >
        <pix-link
          v-for="(sm, smIndex) in slice.items"
          :key="`sm-${smIndex}`"
          :field="sm.socialmedia_url"
          class="footer-social-media__icon"
        >
          <pix-image :field="sm.socialmedia_image" />
        </pix-link>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'
import { groupBy } from 'lodash'
import LogosZone from '@/components/slices/LogosZone'

export default {
  name: 'FooterSliceZone',
  components: {
    LogosZone,
  },
  data() {
    return {
      socialMediasHoverMap: {},
    }
  },
  computed: {
    ...mapState(['mainFooters']),
    usedMainFooter() {
      const groupBySite = groupBy(this.mainFooters, 'data.footer_for')
      if (this.isPixPro && groupBySite['pix-pro']) {
        return groupBySite['pix-pro'][0]
      }
      return groupBySite['pix-site'][0]
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

.footer__logos.logos-zone {
  justify-content: flex-start;

  .logos-zone__content {
    margin-right: 32px;
    display: inline;

    img {
      height: 96px;
    }
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
</style>
