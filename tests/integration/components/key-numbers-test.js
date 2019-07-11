import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | key-numbers', function(hooks) {
  setupRenderingTest(hooks);

  test('it should have element class key-number', async function(assert) {
    // when
    await render(hbs`{{key-numbers}}`);

    // then
    assert.dom('.key-numbers__list').exists();
    assert.dom('.key-number__item').exists({ count: 4 });
  });
});
