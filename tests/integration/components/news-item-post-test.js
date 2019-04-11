import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | news-item-post', function(hooks) {

  setupRenderingTest(hooks);

  let newsItem;

  hooks.beforeEach(function() {
    newsItem = {
      last_publication_date: '2019-04-09T13:19:32+0000',
      data: {
        category: 'Announcement',
        title: [{ spans:[], text: 'The title of the news post', type: 'heading1' }],
        body: [{ spans:[], text: 'The body of the news post', type: 'paragraph' }],
      }
    };
    this.set('newsItem', newsItem);
  });

  test('it renders the category', async function(assert) {

    // when
    await render(hbs`{{news-item-post newsItem=newsItem}}`);

    // then
    assert.dom('.news-item-post__category').exists();
    assert.dom('.news-item-post__category').hasText('Annonce');
  });

  test('it renders the title', async function(assert) {

    // when
    await render(hbs`{{news-item-post newsItem=newsItem}}`);

    // then
    assert.dom('.news-item-post__title').exists();
    assert.dom('.news-item-post__title').hasText('The title of the news post');
  });

  test('it renders the last publication date', async function(assert) {

    // when
    await render(hbs`{{news-item-post newsItem=newsItem}}`);

    // then
    assert.dom('.news-item-post__date').exists();
    assert.dom('.news-item-post__date').hasText('le 9 avril 2019');
  });

  test('it renders the body', async function(assert) {

    // when
    await render(hbs`{{news-item-post newsItem=newsItem}}`);

    // then
    assert.dom('.news-item-post__excerpt').exists();
    assert.dom('.news-item-post__excerpt').hasText('The body of the news post');
  });
});
