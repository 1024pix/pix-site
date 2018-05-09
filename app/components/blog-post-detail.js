import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  // Inherited props
  classNames: ['blog-post-detail'],

  // Data props
  post: null,

  // CPs
  title: computed('post', function() {
    const post = this.get('post');
    return PrismicDOM.RichText.asText(post.rawJSON.title);
  }),

  content: computed('post', function() {
    const post = this.get('post');
    return PrismicDOM.RichText.asHtml(post.rawJSON.content);
  }),

});
