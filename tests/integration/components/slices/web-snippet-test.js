import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | slices/web-snippet', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    //given
    let slice = {
      "slice_type": "web_snippet",
      "slice_label": null,
      "primary": {
        "code": [
          {
            "spans": [],
            "text": "<span class=\"text-xl\">Texte large</span>",
            "type": "paragraph"
          }
        ]
      }
    };

    this.set('slice', slice);
    
    //when
    await render(hbs `{{slices/web-snippet slice=slice}}`);

    //then 
    assert.dom('.text-xl').exists();
    assert.dom('.text-xl').hasText('Texte large');
  });
});
