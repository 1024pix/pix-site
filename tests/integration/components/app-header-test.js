import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | app-header', function(hooks) {

  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // when
    await render(hbs`{{app-header}}`);

    // then
    assert.equal(this.element.textContent.trim(), '');
  });

  test('it contains the logo to Pix.fr', async function(assert) {
    // when
    await render(hbs`{{app-header}}`);

    // then
    const $appLogoPixLink = this.element.querySelector('a.app-logo-pix__link');
    assert.equal($appLogoPixLink.getAttribute('href'), 'https://pix.fr');

    const $appLogoPixImage = $appLogoPixLink.querySelector('img.app-logo-pix__image');
    assert.equal($appLogoPixImage.getAttribute('src'), '/logo-pix.png');
    assert.equal($appLogoPixImage.getAttribute('alt'), 'Revenir sur le site Pix.fr');
  });

  test('it contains the logo of the French Republic', async function(assert) {
    // when
    await render(hbs`{{app-header}}`);

    // then
    const $appLogoPixMarianne = this.element.querySelector('img.app-logo-marianne__image');
    assert.equal($appLogoPixMarianne.getAttribute('src'), '/logo-marianne.svg');
    assert.equal($appLogoPixMarianne.getAttribute('alt'), 'Logo de la République Française');
  });
});
