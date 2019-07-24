import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | hot-news', function(hooks) {
  setupTest(hooks);

  test('it should load hot news', async function(assert) {
    // Given
    const hotNews = this.owner.lookup('service:hotNews');

    // When
    await hotNews.load();

    // Then
    const expectObjectKeys = {
      id: '',
      uid: null,
      type: '',
      href: '',
      tags: [],
      first_publication_date: '',
      last_publication_date: '',
      slugs: [],
      linked_documents: [],
      lang: '',
      alternate_languages: [],
      data: {}
    }
    assert.deepEqual(Object.keys(hotNews.news), Object.keys(expectObjectKeys));
  });
});
