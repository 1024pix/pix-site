import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({

  //props
  navigations: service(),
  itemsTop: null,
  itemsBottom: null,

  init() {
    this._super(...arguments);
    const nav = this.navigations.nav;
    const itemsTop = nav.data.body.filter(body => body.primary.type === 'burger-menu-top');
    const itemsBottom = nav.data.body.filter(body => body.primary.type === 'burger-menu-bottom');
    this.set('itemsTop', itemsTop);
    this.set('itemsBottom', itemsBottom);
  },
});
