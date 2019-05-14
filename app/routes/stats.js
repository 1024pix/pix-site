import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return {
      accounts: {
        data: {
          labels: ['05/18', '06/18', '07/18', '08/18', '09/18', '10/18', '11/18', '12/18', '01/19', '02/19', '03/19', '04/19'],
          datasets: [{
            label: 'Comptes Pix créés',
            data: [57450, 60588, 62109, 63349, 100892, 127596, 146492, 160055, 192281, 211985, 234103, 250656],
            type: 'line',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
          }],
        },
      },
      campaigns: {
        data: {
          labels: ['05/18', '06/18', '07/18', '08/18', '09/18', '10/18', '11/18', '12/18', '01/19', '02/19', '03/19', '04/19'],
          datasets: [{
            label: 'Campagnes d’évaluation',
            data: [0, 0, 0, 10, 31, 64, 261, 687, 1272, 1896, 2487, 3034],
            type: 'line',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
          }],
        },
      },
      certifications: {
        data: {
          labels: ['05/18', '06/18', '07/18', '08/18', '09/18', '10/18', '11/18', '12/18', '01/19', '02/19', '03/19', '04/19'],
          datasets: [{
            label: 'Certifications Pix délivrées',
            data: [7277, 8471, 8554, 8677, 9083, 9366, 10697, 18333, 23859, 24171, 27567, 38235],
            type: 'line',
            backgroundColor: 'rgba(255, 205, 86, 0.2)',
            borderColor: 'rgb(255, 205, 86)',
          }],
        },
      },
      feedbacks: {
        data: {
          labels: ['05/18', '06/18', '07/18', '08/18', '09/18', '10/18', '11/18', '12/18', '01/19', '02/19', '03/19', '04/19'],
          datasets: [{
            label: 'Signalements d’épreuves',
            data: [8598, 9204, 9354, 9500, 10728, 13397, 15292, 16641, 18600, 20862, 25086, 28108],
            type: 'line',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgb(153, 102, 255)',
          }],
        },
      },
      organizations: {
        data: {
          labels: ['Établissements scolaires', 'Établissements d’enseignement supérieur', 'Autres partenaires'],
          datasets: [{
            label: 'Organisations partenaires',
            data: [1181, 98, 106],
            backgroundColor:['rgb(54, 162, 235)','rgb(255, 205, 86)', 'rgb(153, 102, 255)'],
          }],
        },
      }
    }
  }
});


