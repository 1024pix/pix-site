import Component from '@ember/component'; 

export default Component.extend({

    //Element
    classNames: ['key-numbers'],
    tagName: 'section',

    // Props
    title: 'Pix, c’est…',
    keynumbers: [{
        number: '250 000',
        desc: 'comptes créés'
    }, {
        number: '27 millions',
        desc: 'de questions répondues'
    }, {
        number: '3 000',
        desc: 'parcours de tests passées'  
    }, {
        number: '1 500',
        desc: 'organisation partenaires'
    }, {
        number: '35 000',
        desc: 'certification Pix délivrées'
    }],


});

