import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  // Elements
  classNames: ['multiple-column'],
  slice: null,
  verticalAlignCenter: computed('slice', function() {
    if(this.slice && this.slice.primary.vertical_align_center === "true") {
      return true;
    }
  }),

});
