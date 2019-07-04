import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  prismic: service(),

  async model({ uid }) {
    const document = await this.prismic.getNewsItemByUid(uid);
    return document
  },
  
});
