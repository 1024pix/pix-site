import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | as-url', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // given
    this.set('inputValue', 'https://pix.fr/enseignement-scolaire');
    // when
    await render(hbs`{{as-url inputValue}}`);
    // then
    assert.equal(this.element.textContent.trim(), '/enseignement-scolaire');
  });

  test('it should return entire url', async function(assert) {
    // given
    this.set('inputValue', 'https://youtube.fr/tgsbfjd');
    // when
    await render(hbs`{{as-url inputValue}}`);
    // then
    assert.equal(this.element.textContent.trim(), 'https://youtube.fr/tgsbfjd');
  });
});
