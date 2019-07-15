import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | slices/multiple-column', function (hooks) {
  setupRenderingTest(hooks);

  test('it render', async function(assert) {
    await render(hbs `{{slices/multiple-column}}`);
    assert.equal(this.element.textContent.trim(), '');
  });

  test('it should have columns', async function (assert) {
    //given
    this.set('slice', {
      "slice_type": "multiple_column",
      "slice_label": null,
      "items": [
        {
          "column_content": [
            {
              "type": "paragraph",
              "text": "Column 1",
              "spans": []
            }
          ]
        },
        {
          "column_content": [
            {
              "type": "paragraph",
              "text": "Column 2",
              "spans": []
            }
          ]
        },
        {
          "column_content": [
            {
              "type": "image",
              "url": "https://pix-site.cdn.prismic.io/pix-site/3a29bf3168b1357d462651dde9526d427e98eced_recruitment.jpg",
              "alt": null,
              "copyright": null,
              "dimensions": {
                "width": 350,
                "height": 200
              }
            }
          ]
        }
      ],
      "primary": {}
    });

    //when
    await render(hbs `{{slices/multiple-column slice=slice}}`);

    //then
    assert.dom('.multiple-column>.column:first-child').hasText('Column 1');
    assert.dom('.multiple-column>.column:nth-child(2)').hasText('Column 2');
    assert.dom('.column').exists({ count: 3 });
    assert.dom('.block-img').exists();
  });
});
