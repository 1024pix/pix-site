import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | pop-in-campagns', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    //when
    await render(hbs`<PopInCampagns />`);
    //then
    assert.dom('.pop-in-campagns').exists();
  });
});
