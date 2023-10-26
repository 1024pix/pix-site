import Vue from 'vue'
import {
  Push,
  PushRotate,
  Reveal,
  ScaleDown,
  ScaleRotate,
  Slide,
} from 'vue-burger-menu'
import { FocusTrap } from 'focus-trap-vue'

Vue.component('SlideMenu', Slide)
Vue.component('ScaleDownMenu', ScaleDown)
Vue.component('ScaleRotateMenu', ScaleRotate)
Vue.component('RevealMenu', Reveal)
Vue.component('PushMenu', Push)
Vue.component('PushRotateMenu', PushRotate)

Vue.component('FocusTrap', FocusTrap)
