import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | as-html', function(hooks) {

  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    const prismicFragment = [{
      type: 'paragraph',
      text: 'Lorem ipsum dolor sit amet',
      spans: []
    }];
    this.set('fragment', prismicFragment);

    await render(hbs`{{as-html fragment}}`);

    assert.equal(this.element.innerHTML, '<p>Lorem ipsum dolor sit amet</p>');
  });
});
