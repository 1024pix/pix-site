import Vue from 'vue'
import VuePlyr from 'vue-plyr/dist/vue-plyr.ssr.js'

Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: true }
  }
})
