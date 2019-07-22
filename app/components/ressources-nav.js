import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
   //props
   classNames: ['ressources-nav'],
   navigations: service(),
   nav: null,

   init() {
     this._super(...arguments);
     const nav = this.navigations.nav;
     const items = nav.data.body.filter(body => body.primary.type === 'ressources-nav');
     this.set('items', items);
   },
});
