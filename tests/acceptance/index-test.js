import { module, test } from 'qunit';
import { click, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);

  test('User should reduce pop-in/', async function(assert) {
    //given
    await visit('/index');
    //when
    await click('.pop-in-campaigns-content__close');
    //then
    assert.dom('.pop-in-campaigns.collapse').exists();
  });

  test('User should open pop-in', async function(assert) {
    //given
    await visit('/index');
    //when
    await click('.pop-in-campaigns-content__close');
    await click('.pop-in-campaigns-content');
    //then
    assert.dom('.pop-in-campaigns__btn').exists();
  });
});
