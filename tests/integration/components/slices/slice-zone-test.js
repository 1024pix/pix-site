import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | slices/slice-zone', function(hooks) {
  setupRenderingTest(hooks);
  let slices;

  hooks.beforeEach(function() {
    slices =[
      {
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
      }, {
        "slice_type": "web_snippet",
        "slice_label": null,
        "primary": {
          "code": [
            {
              "spans": [],
              "text": "<span class=\"text-l\">Texte l</span>",
              "type": "paragraph"
            }
          ]
        }
      }
    ];

    this.set('slices', slices);
  });


  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{slices/slice-zone slices=slices}}`);

    assert.dom('.text-xl').exists();
    assert.dom('.text-l').exists();
  });
});
