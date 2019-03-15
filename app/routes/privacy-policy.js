import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  prismic: service(),

  async model() {
    const prismic = this.prismic;
    return await prismic.getPage('privacy_policy_page');
  }

});
