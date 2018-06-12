import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  prismic: service(),

  async model(params) {
    const prismic = this.get('prismic');
    const document = await prismic.getJobByUid(params.uid);
    return document;
  }
});
