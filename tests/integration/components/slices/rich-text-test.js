import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | slices/rich-text', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
  //given
  this.set('slice', {
    slice_type: "rich_text",
    primary: {
      text: [
        {
          type: "paragraph",
          text: "test text",
          spans: []
        }
      ]
    },
  });

  //when
  await render(hbs `{{slices/rich-text slice=slice}}`);

  //then
  assert.dom('.rich-text').hasText('test text');
  });
});
