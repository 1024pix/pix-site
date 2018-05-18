import Service from '@ember/service';
import { Promise } from "rsvp";

export default Service.extend({

  getApi() {
    return new Promise(function(resolve, reject) {
      Prismic.api('https://pix-site.cdn.prismic.io/api/v2', function(error, api) {
        if (error) {
          reject(error);
        }
        resolve(api);
      });
    });
  },

  getUid(document) {
    return document.uid;
  },

  getText(fragment) {
    return PrismicDOM.RichText.asText(fragment);
  },

  getHtml(fragment) {
    return PrismicDOM.RichText.asHtml(fragment);
  }

});
