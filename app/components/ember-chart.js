import Component from '@ember/component';
import { Chart } from 'chart.js';
import ENV from 'pix-site/config/environment';

export default Component.extend({

  // Element
  classNames: ['ember-chart'],

  // Data props
  type: 'line',
  data: null,
  width: null,
  height: null,
  chart: null,

  didInsertElement() {
    this._super(...arguments);
    if (this.data !== null) {
      this.chart = new Chart(document.getElementById(this.elementId).children, {
        type: this.type,
        data: this.data,
      });
    }
  },

  didDestroyElement() {
    if (!ENV.environnement === 'test') {
      this.chart.destroy();
    }
  },
});
