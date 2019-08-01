import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | pop-in-campaigns', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    //when
    await render(hbs`<PopInCampaigns />`);
    //then
    assert.dom('.pop-in-campaigns').exists();
    assert.dom('.pop-in-campaigns-content').exists();
    assert.dom('.pop-in-campaigns-content__close').exists();
    assert.dom('.pop-in-campaigns-content__logo').exists();
    assert.dom('.pop-in-campaigns-content__title').exists();
    assert.dom('.pop-in-campaigns__btn').exists();
  });
});
