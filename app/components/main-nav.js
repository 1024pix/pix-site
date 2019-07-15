import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({

  //props
  classNames: ['navigation'],
  prismic: service(),

  async init() {
    this._super(...arguments);
    const nav = await this.prismic.getMenus();
    await this.set('nav', nav);
  },
});
