import AxeBuilder from '@axe-core/playwright';

import { test, expect } from '@playwright/test';

const routes = [
  { path: 'http://localhost:7002/support/', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen', title: 'Support' },
  { path: 'http://localhost:7002/support/form/eleve', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/cl-pix-comment-ca-marche', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/cl-quest-ce-quun-code-parcours-et-comment-lutiliser', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/cl-je-suis-en-situation-de-handicap-visuel-puis-je-utiliser-pix', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/dispositif-daide-pendant-la-certification', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/comment-les-donnees-personnelles-des-eleves-sont-elles-gerees', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/cl-comment-creer-mon-compte-pix', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/cl-comment-me-connecter-a-mon-compte-pix', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/jai-oublie-ma-methode-de-connexion-comment-faire', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/cl-jai-oublie-mon-mot-de-passe-comment-faire', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/un-message-indique-que-mon-compte-est-bloque-definitivement', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/je-rencontre-une-erreur-lors-de-ma-connexion-que-faire', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/les-outils-necessaires-pour-utiliser-pix', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/puis-je-passer-les-tests-pix-sur-smartphone-ou-tablette', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/puis-je-passer-les-tests-pix-sans-connexion-internet', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/utiliser-pix-sur-mac-linux-chromebook', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/ai-je-le-droit-de-maider-dinternet-pour-repondre', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/comment-ouvrir-modifier-ou-retrouver-un-fichier', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/signification-score-et-niveaux-pix', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/comment-ameliorer-mon-score-pix', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/passer-au-niveau-superieur', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/reinitialiser-mes-competences', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/cl-quest-ce-quun-code-parcours-et-comment-lutiliser', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/comment-envoyer-mon-profil-pix', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/verifier-que-mes-resultats-ou-mon-profil-ont-bien-ete-envoyes', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/rejouer-un-parcours-pix', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/pourquoi-mon-parcours-me-propose-t-il-tres-peu-de-', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/erreur-de-saisie-dans-mon-identifiant-de-participation', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/comment-modifier-mon-prenom-ou-mon-nom', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/cl-comment-utiliser-pix-dans-une-autre-langue', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/je-souhaite-modifier-mon-mot-de-passe-comment-faire', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/je-souhaite-modifier-mon-adresse-e-mail-comment-faire', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/je-souhaite-ajouter-une-methode-de-connexion-a-mon-compte-pix', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/je-quitte-le-systeme-scolaire-et-souhaite-conserver-mon-compte-pix', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/comment-supprimer-mon-compte-pix', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/jai-plusieurs-comptes-pix-comment-faire', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/la-certification-pix-cest-quoi', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/suis-je-concerne-par-lobligation-de-passer-la-certfication-pix', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/je-suis-inscrit-au-cned-et-je-dois-passer-la-certification-pix', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/comment-savoir-si-je-peux-passer-la-certification-pix', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/ou-puis-je-passer-la-certification-pix', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/cl-puis-je-passer-la-certification-pix-a-distance', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/cl-comment-se-deroule-la-session-de-certification-pix', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/cl-quest-ce-quun-numero-de-session-et-ou-le-trouver', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/cl-ai-je-acces-a-internet-pendant-la-certification', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/cl-puis-je-amener-mon-ordinateur-pour-la-certification', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/cl-que-faire-en-cas-de-probleme-pendant-la-certification', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/comment-consulter-mes-resultats-de-certification', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/comment-interpreter-mes-resultats-de-certification', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/cl-je-nai-pas-obtenu-ma-certification-pix-puis-je-la-passer-plusieurs-fois', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/comment-telecharger-mes-resultats-de-certification', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/comment-faire-apparaitre-ma-certification-pix-sur-parcoursup', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/comment-modifier-les-informations-personnelles-sur-mon-attestation', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/je-souhaite-faire-un-retour-dexperience', title: 'Support' },
  { path: 'http://localhost:7002/support/enseignement-scolaire/collegien-ou-lyceen/cl-je-souhaite-faire-un-retour-sur-une-epreuve', title: 'Support' },
];

routes.forEach(({ path, title }) => {
  test(`check a11y for route ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'networkidle' });
    // await expect(page).toHaveTitle(title);

    const axeBuilder = new AxeBuilder({ page });
    axeBuilder.include('#app');
    const accessibilityScanResults = await axeBuilder.analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
