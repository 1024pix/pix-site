import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({

  //props
  classNames: ['navigation'],
  prismic: service(),

  init() {
    this._super(...arguments);
    this.prismic.getMenus().then(nav => {
      if(this.isDestroyed) {
        return;
      }
      const items = nav.data.body.filter(body => {
        if(body.primary.type === 'main-nav') {
          return true;
        }
        return false;
      });
      this.set('items', items);
    })
  },
});
