import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { all } from 'rsvp';

export default Route.extend({

  navigations: service(),
  hotNews: service(),

  beforeModel() {
    return all([this._loadHotNews(),this._loadNavigation()]);
  },

  _loadHotNews() {
    return this.hotNews.load();
  },

  _loadNavigation() {
    return this.navigations.load();
  },
});
