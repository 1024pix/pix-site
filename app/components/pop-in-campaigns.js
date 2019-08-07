import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  classNames: ['pop-in-campaigns'],
  classNameBindings: ['isClose:collapse'],
  title: computed('isClose', function() {
    if(this.isClose) {
      return "code parcours"
    }
    return htmlSafe('Vous avez un <span class="bold">code parcours ?</span>');
  }),
  isClose: null,

  actions: {
    togglePopIn() {
      this.toggleProperty('isClose');
    },
  }
});
