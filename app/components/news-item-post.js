import Component from '@ember/component';
import { computed } from '@ember/object';

const categoryTranslations = {
  'Announcement': 'Annonce',
  'Engineering': 'Ingénierie',
  'Event': 'Événement',
  'Feature': 'Nouveauté',
  'Society': 'Société',
};

export default Component.extend({

  tagName: 'article',
  classNames: ['news-item-post'],

  categoryLabel: computed('newsItem.data.category', function() {
    return categoryTranslations[this.newsItem.data.category];
  }),

  categoryClassName: computed('newsItem.data.category', function() {
    return `news-item-post__category--${this.newsItem.data.category.toLowerCase()}`;
  })

});
