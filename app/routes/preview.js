import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  prismic: service(),

  async model({ documentId, token }) {
    const routeParameters = await this.prismic.getPreviewDocumentRoute(documentId, token);

    return this.transitionTo(...routeParameters);
  },

});
