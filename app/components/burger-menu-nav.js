import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({

  //props
  navigations: service(),
  itemsTop: null,
  itemsBottom: null,

  init() {
    this._super(...arguments);
    const navBody = this.navigations.nav.data.body;
    const itemsTop = navBody.filter(body => body.primary.type === 'burger-menu-top');
    const itemsBottom = navBody.filter(body => body.primary.type === 'burger-menu-bottom');
    this.set('itemsTop', itemsTop);
    this.set('itemsBottom', itemsBottom);
  },
});
