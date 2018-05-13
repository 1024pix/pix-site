import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  // Element
  tagName: 'article',
  classNames: ['blog-post-list-item'],

  // Data props
  post: null,

  // CPs
  uid: computed('post', function() {
    return this.get('post.uid');
  }),

  category: computed('post', function() {
    const post = this.get('post');
    return PrismicDOM.RichText.asText(post.rawJSON.category);
  }),

  publicationDate: computed('post', function() {
    const post = this.get('post');
    const date = PrismicDOM.Date(post.lastPublicationDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  }),

  title: computed('post', function() {
    const post = this.get('post');
    return PrismicDOM.RichText.asText(post.rawJSON.title);
  }),

  firstParagraph: computed('post', function() {
    const post = this.get('post');
    const firstParagraph = post.rawJSON.content.find((fragment) => fragment.type === 'paragraph');
    return PrismicDOM.RichText.asHtml([firstParagraph]);
  }),

  author: computed('post', function() {
    const post = this.get('post');
    return PrismicDOM.RichText.asText(post.rawJSON.author.data.name);
  }),

});
