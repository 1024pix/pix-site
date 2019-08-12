import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  prismic: service(),

  async model() {
    const accounts = {
      data: {
        labels: null,
        datasets: [{
          label: 'Comptes Pix créés',
          data: [],
          type: 'line',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
        }]
      }
    };
    const campaigns = {
      data: {
        labels: null,
        datasets: [{
          label: 'Campagnes d’évaluation',
          data: [],
          type: 'line',
          backgroundColor: 'rgba(255, 205, 86, 0.2)',
          borderColor: 'rgb(255, 205, 86)',
        }]
      }
    };
    const certifications = {
      data: {
        labels: null,
        datasets: [{
          label: 'Certifications Pix délivrées',
          data: [],
          type: 'line',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
        }]
      }
    };
    const organizations = {
      data: {
        labels: null,
        datasets: [{
          label: 'Organisations partenaires',
          data: [],
          type: 'line',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgb(153, 102, 255)',
        }]
      }
    };

    const dates = [];
    const accountsData = [];
    const campaignsData = [];
    const certificationsData = [];
    const organizationsData = [];

    const doc = await this.prismic.getPage('statistiques');

    doc.data.stats.forEach(stats => {
      const date = new Date(stats.primary.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear().toString().substr(2);

      dates.push(`${month}/${year}`);
      accountsData.push(stats.primary.accounts);
      campaignsData.push(stats.primary.campaigns);
      certificationsData.push(stats.primary.certifications);
      organizationsData.push(stats.primary.organizations);
    });

    accounts.data.labels = dates;
    accounts.data.datasets[0].data = accountsData;

    campaigns.data.labels = dates;
    campaigns.data.datasets[0].data = campaignsData;

    certifications.data.labels = dates;
    certifications.data.datasets[0].data = certificationsData;

    organizations.data.labels = dates;
    organizations.data.datasets[0].data = organizationsData;

    return {doc, accounts, campaigns, certifications, organizations};
  }
});
