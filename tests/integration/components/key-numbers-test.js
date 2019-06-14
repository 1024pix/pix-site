import { module, only } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | key-numbers', function(hooks) {
  setupRenderingTest(hooks);

  only('it should have element class key-number', async function(assert) {
    // given

    // when
    await render(hbs`{{key-numbers}}`);

    // then
    assert.dom('.key-numbers__list').exists();
    assert.equal(this.element.querySelectorAll('.key-number__item').length, 5);
   
  });
});
