import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  prismic: service(),

  async model(params) {

    const prismic = this.prismic;
    return await prismic.getNewsItemByUid(params.uid);
  }
});
