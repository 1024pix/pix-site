import Component from '@ember/component';

export default Component.extend({

    //Element
    classNames: ['key-numbers'],
    tagName: 'section',

    // Props
    title: 'Pix, c’est…',

    init() {
        this._super(...arguments);
        this.set('keynumbers', [{
            number: '350 000',
            desc: 'comptes créés'
        }, {
            number: '28 millions',
            desc: 'de questions répondues'
        }, {
            number: '3 000',
            desc: 'parcours de tests passés'
        }, {
            number: '50 000',
            desc: 'certifications Pix délivrées'
        }]);
    }
});
