import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | faq-menu', function(hooks) {

  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // when
    await render(hbs`{{faq-menu}}`);

    // then
    assert.equal(this.element.textContent.trim(), '');
  });
});
