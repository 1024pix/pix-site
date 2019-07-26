import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | burger-menu-nav', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Given
    const navigations = this.owner.lookup('service:navigations');
    await navigations.load();

    // When
    await render(hbs`<BurgerMenuNav />`);

    // Then
    assert.dom('.nav-top').exists();
  });
});
