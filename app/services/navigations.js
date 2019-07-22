import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({

  prismic: service(),
  nav: null,

  async load() {
    const nav = await this.prismic.getMenus();
    this.set('nav', nav);
  }
});
