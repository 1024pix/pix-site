import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | web-snippet', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('inputValue', [
      {
        primary: {
          code: [
            {text: '1234'},
            {text: '5678'},
          ],
        },
      },
    ]);

    await render(hbs`{{web-snippet inputValue}}`);

    assert.equal(this.element.textContent.trim(), '1234 5678');
  });
});
