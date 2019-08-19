import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  hotNews: service(),
  isClose: false,

  actions: {
    closeBanner() {
      this.set('isClose', true);
    }
  },
});
