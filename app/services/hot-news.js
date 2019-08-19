import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({

  prismic: service(),
  news: null,

  async load() {
    const news = await this.prismic.getHotNews();
    this.set('news', news);
  },
});
