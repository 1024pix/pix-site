import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  prismic: service(),

  model() {
    return this.get('prismic').getApi()
      .then(api => api.query(
        Prismic.Predicates.at('document.type', 'blog_post'),
        {
          fetchLinks: ['author.name'],
          orderings: '[my.blog_post.date desc]'
        }
      ))
      .then((response) => {
        return response.results;
      });
  }

});
