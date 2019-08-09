import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | news-item-card', function(hooks) {

  setupRenderingTest(hooks);

  let newsItem;

  hooks.beforeEach(function() {
    newsItem = {
      last_publication_date: '2019-04-09T13:19:32+0000',
      first_publication_date: '2019-03-09T13:19:32+0000',
      data: {
        date: '2019-03-10',
        category: 'Announcement',
        title: [{ spans:[], text: 'The title of the news post', type: 'heading1' }],
        excerpt: [{ spans:[], text: 'The excerpt of the news post', type: 'paragraph' }],
      }
    };
    this.set('newsItem', newsItem);
  });

  test('it renders the illustration', async function(assert) {

    // when
    await render(hbs`{{news-item-card newsItem=newsItem}}`);

    // then
    assert.dom('.news-item-card__illustration').exists();
  });

  test('it renders the category', async function(assert) {

    // when
    await render(hbs`{{news-item-card newsItem=newsItem}}`);

    // then
    assert.dom('.news-item-card__category').exists();
    assert.dom('.news-item-card__category').hasText('Annonce');
  });

  test('it renders the title', async function(assert) {

    // when
    await render(hbs`{{news-item-card newsItem=newsItem}}`);

    // then
    assert.dom('.news-item-card__title').exists();
    assert.dom('.news-item-card__title').hasText('The title of the news post');
  });

  test('it renders the excerpt', async function(assert) {

    // when
    await render(hbs`{{news-item-card newsItem=newsItem}}`);

    // then
    assert.dom('.news-item-card__excerpt').exists();
    assert.dom('.news-item-card__excerpt').hasText('The excerpt of the news post');
  });

  test('it renders the chosen date', async function(assert) {

    // when
    await render(hbs`{{news-item-card newsItem=newsItem}}`);

    // then
    assert.dom('.news-item-card__date').exists();
    assert.dom('.news-item-card__date').hasText('le 10 mars 2019');
  });
});
