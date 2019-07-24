import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';

module('Integration | Component | hot-news-banner', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Given
    const news = {
      type: "hot_news",
      data: {
        description: [
          {
            type: "paragraph",
            text: "On a rencontré un problème, mais pas de panique, nous sommes en train de le résoudre rapidement,enfin on fait tout ce qu’est possible pour que vous puissiez revenir faire vos tests.",
            spans: []
          }
        ]
      }
    }
    this.owner.register('service:hotNews', Service.extend({ news: news}));

    // When
    await render(hbs`<HotNewsBanner />`);

    // then
    assert.dom('.hot-news').exists();
    assert.dom('.hot-news').hasText('On a rencontré un problème, mais pas de panique, nous sommes en train de le résoudre rapidement,enfin on fait tout ce qu’est possible pour que vous puissiez revenir faire vos tests.');
  });
});
