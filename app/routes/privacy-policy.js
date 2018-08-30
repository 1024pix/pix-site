import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  prismic: service(),

  async model() {
    const prismic = this.get('prismic');
    return await prismic.getPrivacyPolicyPage();
  }

});
