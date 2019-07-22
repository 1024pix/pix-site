import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({

  //props
  classNames: ['navigation'],
  navigations: service(),
  nav: null,

  init() {
    this._super(...arguments);
    const nav = this.navigations.nav;
    const items = nav.data.body.filter(body => body.primary.type === 'main-nav');
    this.set('items', items);
  },
});
