import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  prismic: service(),

  async model(params) {

    const prismic = this.prismic;
    const newsItems = await prismic.findNewsItems(params);
    return newsItems;
  }
});
