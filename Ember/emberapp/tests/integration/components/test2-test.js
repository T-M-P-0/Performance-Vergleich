import { module, test } from 'qunit';
import { setupRenderingTest } from 'emberapp/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | test2', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Test2 />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <Test2>
        template block text
      </Test2>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
