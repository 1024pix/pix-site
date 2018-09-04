import Route from '@ember/routing/route';

export default Route.extend({

  redirect(model, transition) {
    transition.abort();
    window.location.replace("https://app.pix.fr/certifications");
  }
});
