import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  navigations: service(),

  beforeModel() {
    return this._loadNavigation();
  },

  _loadNavigation() {
    return this.navigations.load();
  }

});
