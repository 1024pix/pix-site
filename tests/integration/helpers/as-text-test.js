import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | as-text', function(hooks) {

  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    const prismicFragment = [{
      type: 'heading1',
      text: 'Some heading 1'
    }];
    this.set('fragment', prismicFragment);

    await render(hbs`{{as-text fragment}}`);

    assert.equal(this.element.innerHTML, 'Some heading 1');
  });
});
