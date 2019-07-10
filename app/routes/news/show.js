import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  prismic: service(),
  headData: service(),
  router: service(),

  model({ uid }) {
    return this.prismic.getNewsItemByUid(uid);  
  },

  afterModel(model) {
    this.set('headData.href', this.router.location.location.href); 
    model.data.meta.forEach(meta => {
      if(meta.slice_type === 'general_card') {
        this.set('headData.general', meta.primary);
      } else if(meta.slice_type === 'twitter_card') {
        this.set('headData.twitter', meta.primary);
      }
    });
  },
});
