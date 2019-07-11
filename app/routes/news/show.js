import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  prismic: service(),

  model({ uid }) {
    return this.prismic.getNewsItemByUid(uid);  
  },

});
