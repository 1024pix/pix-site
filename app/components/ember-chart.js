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
  legendPosition: 'bottom',
  chart: null,

  didInsertElement() {
    this._super(...arguments);
    if (this.data !== null) {
      this.chart = new Chart(document.getElementById(this.elementId).children, {
        type: this.type,
        data: this.data,
        options: {
          legend: {
            poisition: this.legendPosition,
          }
        }
      });
    }
  },

  didDestroyElement() {
    if (!ENV.environnement === 'test') {
      this.chart.destroy();
    }
  },
});
