import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit'
import { resolve } from 'rsvp';
import Service from '@ember/service';

module('Unit | Service | hot-news', function(hooks) {
  setupTest(hooks);

  test('it should load hot news', async function(assert) {
    // Given
    const expectedNews = {
      id: 'XTglrBIAACQASurY',
      uid: null,
      type: 'hot_news',
      href: '',
      tags: [],
      first_publication_date: '2019-07-24T09:32:32+0000',
      last_publication_date: '2019-08-27T08:39:57+0000',
      slugs: [],
      linked_documents: [],
      lang: 'fr-fr',
      alternate_languages: [],
      data: {}
    };

    const prismicStub = Service.create({
      getHotNews: () => resolve(expectedNews)
    });
    const hotNews = this.owner.lookup('service:hotNews');
    hotNews.set('prismic', prismicStub);

    // When
    await hotNews.load();

    // Then
    assert.deepEqual(Object.keys(hotNews.news), Object.keys(expectedNews));
  });
});
