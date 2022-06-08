# pix-site Changelog

## v4.0.0 (08/06/2022)


### :building_construction: Tech
- [#408](https://github.com/1024pix/pix-site/pull/408) [TECH] Supprimer les redirections pix.fr (PIX-4497).

## v3.31.0 (31/05/2022)


### :rocket: Amélioration
- [#407](https://github.com/1024pix/pix-site/pull/407) [FEATURE] - Builder pix site et pix pro pour tous les contextes (PIX-4980).
- [#405](https://github.com/1024pix/pix-site/pull/405) [FEATURE] Ajout du switch de langues sur Pix Pro (PIX-4808).

### :bug: Correction
- [#406](https://github.com/1024pix/pix-site/pull/406) [BUGFIX] Ne pas afficher le LanguageSwitcher sur pro.pix.fr si le FT est mis à `true` (PIX-4934)

## v3.30.0 (20/05/2022)


### :building_construction: Tech
- [#404](https://github.com/1024pix/pix-site/pull/404) [TECH] Supprimer les appels inutiles à /undefined (PIX-4966).

## v3.29.0 (20/05/2022)


### :rocket: Amélioration
- [#400](https://github.com/1024pix/pix-site/pull/400) [FEATURE] Ajout d'un FT pour l'affichage du Language-Switcher dans pro.pix.org (PIX-4934).
- [#398](https://github.com/1024pix/pix-site/pull/398) [FEATURE] Générer les routes en fonctions de la variable SITE_DOMAIN (fr,org) (PIX-4807).
- [#395](https://github.com/1024pix/pix-site/pull/395) [FEATURE] Générer les pages des sites en fonctions des tags Prismic (PIX-4905).
- [#393](https://github.com/1024pix/pix-site/pull/393) [FEATURE] Renvoyer vers les bonnes locales quand les pages de prismic référencent des liens vers d'autres pages (PIX-4903).

### :building_construction: Tech
- [#403](https://github.com/1024pix/pix-site/pull/403) [TECH] Accéder au domaine .org sur les RA (PIX-4963).
- [#397](https://github.com/1024pix/pix-site/pull/397) [TECH] Ajouter un commentaire avec les liens des RA et de la PR GitHub directement sur le ticket Jira associée (PIX-4918).
- [#394](https://github.com/1024pix/pix-site/pull/394) [TECH] Utilisation du tag index dans le link-resolver.
- [#392](https://github.com/1024pix/pix-site/pull/392) [TECH] Supprimer les types de document Prismic inutiles (PIX-4895).
- [#380](https://github.com/1024pix/pix-site/pull/380) [TECH] Utiliser la nouvelle version LTS de node 16.14.0
- [#387](https://github.com/1024pix/pix-site/pull/387) [TECH] Séparer les sources compilées de pix.fr et pix.org (PIX-4806)
- [#386](https://github.com/1024pix/pix-site/pull/386) [TECH] Supprime des fichiers inutiles de l'image compilée (PIX-4805)

### :bug: Correction
- [#401](https://github.com/1024pix/pix-site/pull/401) [BUGFIX] Répare l'environnement de dev

## v3.28.3 (14/03/2022)


### :bug: Correction
- [#381](https://github.com/1024pix/pix-site/pull/381) [BUGFIX] Utilise nuxt/image sur toute les images

### :coffee: Autre
- [#321](https://github.com/1024pix/pix-site/pull/321) Bump path-parse from 1.0.6 to 1.0.7
- [#322](https://github.com/1024pix/pix-site/pull/322) Bump tar from 6.0.5 to 6.1.11

## v3.28.2 (09/03/2022)


### :rocket: Amélioration
- [#378](https://github.com/1024pix/pix-site/pull/378) [FEATURE] Ne cache pas la donnée au click sur la légende d'un graphique

### :building_construction: Tech
- [#373](https://github.com/1024pix/pix-site/pull/373) [TECH] Améliorer la propreté du code
- [#377](https://github.com/1024pix/pix-site/pull/377) [TECH] Correction tests NGINX

### :bug: Correction
- [#379](https://github.com/1024pix/pix-site/pull/379) [BUGFIX] Traduction page d'erreur et liens localisés

## v3.28.1 (04/03/2022)


### :bug: Correction
- [#376](https://github.com/1024pix/pix-site/pull/376) [BUGFIX] Bloquer l'indexation Google des liens dépréciés

## v3.28.0 (03/03/2022)


### :bug: Correction
- [#375](https://github.com/1024pix/pix-site/pull/375) [BUGFIX] Redirige les pages localisées de pix.fr vers pix.org (PIX-4496)

## v3.27.2 (02/03/2022)


### :bug: Correction
- [#374](https://github.com/1024pix/pix-site/pull/374) [BUGFIX] Suppression de liens vers pix.fr/fr et pix.fr/en-gb

## v3.27.1 (23/02/2022)


### :bug: Bug fix
- [#372](https://github.com/1024pix/pix-site/pull/372) [BUGFIX] Permettre d'afficher 4 blocks dans les multiple blocks "process" quelque soit la résolution (PIX-4012)

## v3.27.0 (10/02/2022)


### :rocket: Enhancement
- [#371](https://github.com/1024pix/pix-site/pull/371) [FEATURE] Ajoute de l'espacement en dessous du language switcher du burger menu
- [#366](https://github.com/1024pix/pix-site/pull/366) [FEATURE] Ajoute le Language Switcher sur pix.fr (PIX-4302)
- [#362](https://github.com/1024pix/pix-site/pull/362) [FEATURE] Supprime le feature toggle `IS_FR_BE_LANGUAGE_LOCALE_AVAILABLE`

### :building_construction: Tech
- [#370](https://github.com/1024pix/pix-site/pull/370) [TECH] Ajoute un fichier .env d'exemple
- [#365](https://github.com/1024pix/pix-site/pull/365) [TECH] Supprime le composant LanguageSwitcherLegacy

### :coffee: Various
- [#369](https://github.com/1024pix/pix-site/pull/369) [DOCS] Lance Prettier sur le readme
- [#323](https://github.com/1024pix/pix-site/pull/323) Bump tmpl from 1.0.4 to 1.0.5
- [#359](https://github.com/1024pix/pix-site/pull/359) chore(deps): bump nanoid from 3.1.20 to 3.2.0
- [#367](https://github.com/1024pix/pix-site/pull/367) build(deps): bump browserslist from 4.14.7 to 4.19.1
- [#338](https://github.com/1024pix/pix-site/pull/338) chore(deps): bump color-string from 1.5.4 to 1.9.0
- [#354](https://github.com/1024pix/pix-site/pull/354) chore(deps): bump postcss from 7.0.35 to 7.0.39
- [#368](https://github.com/1024pix/pix-site/pull/368) build(deps): bump ssri from 6.0.1 to 6.0.2
- [#364](https://github.com/1024pix/pix-site/pull/364) build(deps): bump simple-get from 4.0.0 to 4.0.1
- [#358](https://github.com/1024pix/pix-site/pull/358) [STYLE] Correctifs sur le switch de langue sur Pix.org (PIX-4133).

## v3.26.2 (27/01/2022)


### :bug: Bug fix
- [#363](https://github.com/1024pix/pix-site/pull/363) [BUGFIX] Les URLs inter-locales ne fonctionnent pas correctement

## v3.26.1 (26/01/2022)


### :coffee: Various
- [#360](https://github.com/1024pix/pix-site/pull/360) [FIX] Correction des redirections vers le site belge renvoyant une page 404.

## v3.25.2 (18/01/2022)


### :building_construction: Tech
- [#356](https://github.com/1024pix/pix-site/pull/356) [TECH] Ajoute un log pour afficher le nombre de routes générées

### :bug: Bug fix
- [#357](https://github.com/1024pix/pix-site/pull/357) [BUGFIX] Ne pas inclure les routes à générer si la langue n'est pas gérée (PIX-4173)

## v3.25.1 (12/01/2022)


### :bug: Bug fix
- [#355](https://github.com/1024pix/pix-site/pull/355) [BUGFIX] Affichage de la bannière de nouveautés

## v3.25.0 (12/01/2022)


### :rocket: Enhancement
- [#353](https://github.com/1024pix/pix-site/pull/353) [FEATURE] Ajout d'un Feature Toggle pour le switch de langue FR-BE  (PIX-4101).
- [#349](https://github.com/1024pix/pix-site/pull/349) [FEATURE] Ajouter le menu Switch de langue sur le .org (PIX-4038)
- [#348](https://github.com/1024pix/pix-site/pull/348) [FEATURE] Ajouter le langage 'FR-BE' dans pix-site (PIX-4035)

### :building_construction: Tech
- [#352](https://github.com/1024pix/pix-site/pull/352) [TECH] Montée de version action d'auto-merge en v0.1.2
- [#351](https://github.com/1024pix/pix-site/pull/351) [TECH] Utiliser la github action d'auto-merge commune de Pix
- [#343](https://github.com/1024pix/pix-site/pull/343) [TECH] Meilleure gestion de la var d'env `SITE` (PIX-4014)

### :bug: Bug fix
- [#345](https://github.com/1024pix/pix-site/pull/345) [BUGFIX] Éviter les redirections permanentes sur des liens qui peuvent changer
- [#346](https://github.com/1024pix/pix-site/pull/346) [BUGFIX] Laisse Google indexer le site seulement si `SEO_ENABLE_INDEXING` est settée à `true` (PIX-4040)
- [#347](https://github.com/1024pix/pix-site/pull/347) [BUGFIX] Logo Pix qui bouge selon les environnements (PIX-3927)

## v3.24.1 (14/12/2021)


### :building_construction: Tech
- [#342](https://github.com/1024pix/pix-site/pull/342) [TECH] Supprime le dossier `store` qui était inutilisé (PIX-4011)

### :bug: Bug fix
- [#344](https://github.com/1024pix/pix-site/pull/344) [BUGFIX] Boucle infinie Nginx sur les 404 pix.org
- [#341](https://github.com/1024pix/pix-site/pull/341) [BUGFIX] Lance Prettier sur les fichiers SCSS (PIX-4010)

## v3.24.0 (10/12/2021)


### :building_construction: Tech
- [#327](https://github.com/1024pix/pix-site/pull/327) [TECH] Migration vers @nuxt/image (PIX-3945)
- [#336](https://github.com/1024pix/pix-site/pull/336) [TECH] Nettoyage document fetcher (PIX-3929, PIX-3932)
- [#337](https://github.com/1024pix/pix-site/pull/337) [TECH] Les pages en erreur renvoient une erreur Nginx

### :bug: Bug fix
- [#340](https://github.com/1024pix/pix-site/pull/340) [BUGFIX] Ajout de roles sémantiques dans les balises html (PIX-3999)
- [#339](https://github.com/1024pix/pix-site/pull/339) [BUGFIX] Utilisation d'unités relatives pour les colonnes de features

## v3.23.2 (18/11/2021)


### :bug: Bug fix
- [#335](https://github.com/1024pix/pix-site/pull/335) [BUGFIX] Correction logo pix-pro

## v3.23.1 (18/11/2021)


### :rocket: Enhancement
- [#328](https://github.com/1024pix/pix-site/pull/328) [FEATURE] Corriger les titles pour les actualités.

### :building_construction: Tech
- [#334](https://github.com/1024pix/pix-site/pull/334) [TECH] Utilise le PIX_SERVICE_ACTIONS_TOKEN dans l'action d'automerge

### :bug: Bug fix
- [#325](https://github.com/1024pix/pix-site/pull/325) [BUGFIX] Ajoute les attributs `width` et `height` aux icônes
- [#312](https://github.com/1024pix/pix-site/pull/312) [BUGFIX] Amélioration de l'auto-merge.

### :coffee: Various
- [#333](https://github.com/1024pix/pix-site/pull/333) [INFRA] Mettre en cache les contenus des dossiers `images` et `scripts`
- [#331](https://github.com/1024pix/pix-site/pull/331) [INFRA] Setup Circle CI
- [#324](https://github.com/1024pix/pix-site/pull/324) [INFRA] Mise à jour de node de 14.16.0 à 14.17.0

## v3.23.0 (10/11/2021)


### :building_construction: Tech
- [#320](https://github.com/1024pix/pix-site/pull/320) [TECH] Supprimer le store Vuex (PIX-1468). 

### :bug: Bug fix
- [#318](https://github.com/1024pix/pix-site/pull/318) [BUGFIX] Redirections Nginx
- [#314](https://github.com/1024pix/pix-site/pull/314) [BUGFIX] a11y - Ordre des headers de la page d'actualités
- [#319](https://github.com/1024pix/pix-site/pull/319) [BUGFIX] Retirer le texte des actions de la barre de navigation sur mobile. 

### :coffee: Various
- [#305](https://github.com/1024pix/pix-site/pull/305) [INFRA] Utilise seulement le mode static de Nuxt

## v3.22.0 (03/11/2021)


### :building_construction: Tech
- [#306](https://github.com/1024pix/pix-site/pull/306) [TECH] Mettre à jour les dépendances
- [#313](https://github.com/1024pix/pix-site/pull/313) [TECH] Mettre à jour le package @nuxtjs/i18n
- [#316](https://github.com/1024pix/pix-site/pull/316) [TECH] Supprimer axios 
- [#315](https://github.com/1024pix/pix-site/pull/315) [TECH] Fixer la version de assets-extractor-module
- [#311](https://github.com/1024pix/pix-site/pull/311) [TECH] Utiliser sass au lieu de node-sass

### :bug: Bug fix
- [#317](https://github.com/1024pix/pix-site/pull/317) [BUGFIX] Affichage de la vidéo au scroll sur la page d'accueil
- [#310](https://github.com/1024pix/pix-site/pull/310) [BUGFIX] Problème de texte alternative sur les icones du menu.
- [#309](https://github.com/1024pix/pix-site/pull/309) [BUGFIX] Réaligner les éléments dans le menu action (PIX-3760).

## v3.21.1 (28/10/2021)


### :bug: Bug fix
- [#308](https://github.com/1024pix/pix-site/pull/308) [BUGFIX] Correction lien icones sur le site .org

## v3.21.0 (28/10/2021)


### :rocket: Enhancement
- [#300](https://github.com/1024pix/pix-site/pull/300) [FEATURE] Double navigation (PIX-3690 PIX-1723)

### :building_construction: Tech
- [#301](https://github.com/1024pix/pix-site/pull/301) [TECH] Ajoute les headers de cache navigateurs pour les dossiers _assets et _nuxt
- [#303](https://github.com/1024pix/pix-site/pull/303) [TECH] Importer seulement les fonctions de lodash qui sont utilisées.
- [#302](https://github.com/1024pix/pix-site/pull/302) [TECH] Mise à jour de l'assets-extractor

### :bug: Bug fix
- [#307](https://github.com/1024pix/pix-site/pull/307) [BUGFIX] Espacement de bloc feature
- [#299](https://github.com/1024pix/pix-site/pull/299) [BUGFIX] Corrige l'alignement vertical dans la bannière de nouvelles.

### :coffee: Various
- [#304](https://github.com/1024pix/pix-site/pull/304) [INFRA] Supprime la dépendance à lodash

## v3.20.0 (13/10/2021)

- [#298](https://github.com/1024pix/pix-site/pull/298) [CLEANUP] Supprimer le cahier des charges centre de certification osbolète

## v3.19.0 (16/09/2021)

- [#296](https://github.com/1024pix/pix-site/pull/296) [FEATURE] Permettre de changer les paramètres envoyés à 123FormBuilder. 
- [#297](https://github.com/1024pix/pix-site/pull/297) [BUGFIX] Corriger l'alignement des blocs process
- [#294](https://github.com/1024pix/pix-site/pull/294) [TECH] Extraire et utiliser le module assets-extractor 

## v3.18.0 (07/09/2021)

- [#295](https://github.com/1024pix/pix-site/pull/295) [BUGFIX] Bouton appel à l'action sur mobile.
- [#293](https://github.com/1024pix/pix-site/pull/293) Utilise support.pix.org plutôt que support.pix.fr

## v3.17.0 (13/08/2021)

- [#291](https://github.com/1024pix/pix-site/pull/291) [BUGFIX] Correction de l'affichage sur les écrans large (PIX-2764).
- [#292](https://github.com/1024pix/pix-site/pull/292) [TECH] Met à jour prismic-dom vers la version 2.2.6

## v3.16.0 (04/08/2021)

- [#290](https://github.com/1024pix/pix-site/pull/290) [FEATURE] Ajout du tag manager sur le site vitrine.
- [#288](https://github.com/1024pix/pix-site/pull/288) [FEATURE] Créer à chaque déploiement les graphiques de statistiques (PIX-2919). 

## v3.15.0 (20/07/2021)

- [#287](https://github.com/1024pix/pix-site/pull/287) [BUGFIX] Centrer les articles verticaux.
- [#284](https://github.com/1024pix/pix-site/pull/284) [BUGFIX] Afficher correctement le bloc statistiques sur un grand écran.
- [#279](https://github.com/1024pix/pix-site/pull/279) [BUGFIX] Aligner les logos des partenaires sur un grand écran.
- [#286](https://github.com/1024pix/pix-site/pull/286) [TECH] Utilise l'option modern du module prismic pour éviter un appel vers prismic sur la prod
- [#285](https://github.com/1024pix/pix-site/pull/285) [TECH] Mise à jour de Jest vers la 27.0.6
- [#278](https://github.com/1024pix/pix-site/pull/278) [TECH] Utiliser l'auto-import des composants proposé par Nuxt. 
- [#283](https://github.com/1024pix/pix-site/pull/283) [TECH] Suppression de l'appel à Google Font.
- [#281](https://github.com/1024pix/pix-site/pull/281) [TECH] Monter de version @nuxtjs/prismic
- [#280](https://github.com/1024pix/pix-site/pull/280) [TECH] Mettre à jour les dépendances. 
- [#282](https://github.com/1024pix/pix-site/pull/282) [FEAT] Ajout de Matomo à Pix Pro (PIX-2800).

## v3.14.0 (21/06/2021)

- [#275](https://github.com/1024pix/pix-site/pull/275) [FEATURE] Ajouter un état actif au éléments de la navigation (PIX-2235).
- [#276](https://github.com/1024pix/pix-site/pull/276) [FEATURE] Pré-remplir les champs de formulaire si des paramètres sont présents dans l'URL (PIX-2710).
- [#274](https://github.com/1024pix/pix-site/pull/274) Expliciter la différence entre les hotnews et le reste du site
- [#273](https://github.com/1024pix/pix-site/pull/273) [CLEAN] Suppression des anciennes pages de formulaires (PIX-1441).

## v3.13.1 (04/06/2021)

- [#271](https://github.com/1024pix/pix-site/pull/271) [TECH] Lire l'URL Matomo dans l'environnement
- [#272](https://github.com/1024pix/pix-site/pull/272) Activer ou désactiver les analytics

## v3.13.0 (20/05/2021)


## v3.12.0 (12/05/2021)

- [#266](https://github.com/1024pix/pix-site/pull/266) [FEATURE]  Changer les specs de la font (PIX-2269).
- [#264](https://github.com/1024pix/pix-site/pull/264) [FEATURE] Changer la taille des titres h2 des slices (PIX-2270).
- [#265](https://github.com/1024pix/pix-site/pull/265) [FEATURE] Changer la police des titres (PIX-2268).
- [#267](https://github.com/1024pix/pix-site/pull/267) [BUGFIX] Fix affichage du favicon sur le site .org (PIX-2351).
- [#269](https://github.com/1024pix/pix-site/pull/269) [TECH] Expliciter les règles utilisées par le hook de merge Github pour agir dans JIRA (PIX-2586).
- [#268](https://github.com/1024pix/pix-site/pull/268) [TECH] Ajouter le script d'automatisation JIRA post-merge (PIX-2579).

## v3.11.0 (07/05/2021)

- [#263](https://github.com/1024pix/pix-site/pull/263) [TECH] Amélioration du focus des boutons (PIX-2534).

## v3.10.0 (21/04/2021)

- [#261](https://github.com/1024pix/pix-site/pull/261) [BUGFIX] Accéder aux pages orphelines (PIX-2487).
- [#262](https://github.com/1024pix/pix-site/pull/262) [TECH] Faire échouer le build quand la génération d'une page statique est en erreur

## v3.9.0 (13/04/2021)

- [#260](https://github.com/1024pix/pix-site/pull/260) [CLEANUP] Correctif d'accessibilité (PIX-2459).

## v3.8.1 (09/04/2021)

- [#259](https://github.com/1024pix/pix-site/pull/259) [FEATURE] Changement de couleur des labels de navigation (PIX-2233).

## v3.8.0 (11/03/2021)

- [#258](https://github.com/1024pix/pix-site/pull/258) [FEATURE] Modifier les margins et paddings pour pouvoir mieux agrandir le menu (PIX-2347).
- [#249](https://github.com/1024pix/pix-site/pull/249) [FEATURE] Redesign du menu burger (PIX-2257).
- [#255](https://github.com/1024pix/pix-site/pull/255) [BUGFIX] Corriger l'affichage du language switcher (PIX-2317).
- [#254](https://github.com/1024pix/pix-site/pull/254) [TECH] Mise a jour de Node 14.15.0 vers 14.16.0.
- [#257](https://github.com/1024pix/pix-site/pull/257) [DESIGN] Modification des barres verticales sur le menu (PIX-2232).
- [#256](https://github.com/1024pix/pix-site/pull/256) [DESIGN] Changer la marge au niveau des logo (PIX-2236).
- [#253](https://github.com/1024pix/pix-site/pull/253) [DESIGN] Changer les specs de la font du drop-down (PIX-2239)
- [#252](https://github.com/1024pix/pix-site/pull/252) [DESIGN] Changer la position du drop-down ouvert (PIX-2240).
- [#250](https://github.com/1024pix/pix-site/pull/250) Activer l'asset-extractor et corriger l'affichage d'image sur pix.org

## v3.7.0 (02/03/2021)

- [#246](https://github.com/1024pix/pix-site/pull/246) [FEATURE] Générer les pages "orphelines" (PIX-2246).
- [#247](https://github.com/1024pix/pix-site/pull/247) [FEATURE] Ne plus bouger les icone quand on ouvre le burger menu (PIX-2242).
- [#248](https://github.com/1024pix/pix-site/pull/248) [DESIGN] Ajouter un arrondi sur les bannières de pages (PIX-2245).

## v3.6.0 (25/02/2021)

- [#243](https://github.com/1024pix/pix-site/pull/243) [FEATURE] Changement de design du language switcher (PIX-2216).
- [#240](https://github.com/1024pix/pix-site/pull/240) [FEATURE] Récupérer les meta descriptions depuis prismic.
- [#239](https://github.com/1024pix/pix-site/pull/239) [FEATURE] Affichage du changement de langue sur pix.org (PIX-1601).
- [#242](https://github.com/1024pix/pix-site/pull/242) [TECH] Bumper les paquets (PIX-2215).
- [#245](https://github.com/1024pix/pix-site/pull/245) [TECH] Ajouter le workflow d'automatisation des merges.
- [#244](https://github.com/1024pix/pix-site/pull/244) [FIX] Désactiver l'extraction des images pour qu'elles s'affichent sur les site .org
- [#241](https://github.com/1024pix/pix-site/pull/241) [BUILD] Add build module to extract assets (images, videos, pdf) in final bundle

## v3.5.0 (26/01/2021)

- [#238](https://github.com/1024pix/pix-site/pull/238) [BUGFIX] Rendre visible le burger menu en cas de message (PIX-1960).
- [#237](https://github.com/1024pix/pix-site/pull/237) [BUGFIX] Afficher le titre de la page en title (PIX-2028).

## v3.4.2 (21/01/2021)

- [#236](https://github.com/1024pix/pix-site/pull/236) [BUGFIX] Pouvoir avoir le footer pix-pro.

## v3.4.1 (15/01/2021)

- [#235](https://github.com/1024pix/pix-site/pull/235) [TECH] Désactiver la prévisualisation de Prismic quand le mode SSR n'est pas activé.
- [#234](https://github.com/1024pix/pix-site/pull/234) [TECH] Mauvaise version de NodeJS dans `.nvmrc`

## v3.4.0 (16/12/2020)

- [#233](https://github.com/1024pix/pix-site/pull/233) [TECH] Montée de version des packages eslint, nuxt et autoprefixer
- [#231](https://github.com/1024pix/pix-site/pull/231) [CLEANUP] Utiliser une SlicePage pour l'index du site vitrine (PIX-1444).
- [#232](https://github.com/1024pix/pix-site/pull/232) [CLEANUP] Supprimer la page Statistiques (PIX-1435).

## v3.3.0 (04/12/2020)

- [#228](https://github.com/1024pix/pix-site/pull/228) [FEATURE] Ajouter un ID sur les slices pour faire des liens dessus (PIX-1576).
- [#229](https://github.com/1024pix/pix-site/pull/229) [BUGFIX] Pouvoir voir tout le texte en mode mobile (PIX-1714).
- [#230](https://github.com/1024pix/pix-site/pull/230) [CLEANUP] Retirer les filtres pour les logos de la navigation (PIX-1428).
- [#227](https://github.com/1024pix/pix-site/pull/227) [CLEANUP] Supprimer l'ancienne nav et la sous-nav (PIX-1429).
- [#226](https://github.com/1024pix/pix-site/pull/226) [CLEANUP] Supprimer la page "Compétence" (PIX-1436).

## v3.2.0 (25/11/2020)

- [#224](https://github.com/1024pix/pix-site/pull/224) [FEATURE] Ajout d'un bloc Stat (PIX-1643).
- [#220](https://github.com/1024pix/pix-site/pull/220) [TECH] Mettre à jour Node et les paquets Pix Site (PIX-1633).
- [#225](https://github.com/1024pix/pix-site/pull/225) [CLEANUP] Supprimer les Slices inutiles (PIX-1430).
- [#223](https://github.com/1024pix/pix-site/pull/223) [CLEANUP] Suppression de la page Legal Notice
- [#222](https://github.com/1024pix/pix-site/pull/222) [CLEANUP] Suppression de la page CGU (PIX-1434).

## v3.1.2 (19/11/2020)

- [#218](https://github.com/1024pix/pix-site/pull/218) [BUGFIX] La page index de pix-pro affiche l'ancienne page (PIX-1438)

## v3.1.1 (18/11/2020)

- [#217](https://github.com/1024pix/pix-site/pull/217) [CLEANUP] Suppression de l'ancienne page Médiation Numérique

## v3.1.0 (16/11/2020)

- [#215](https://github.com/1024pix/pix-site/pull/215) [FEATURE] Ajout de la possibilité de servir le site en mode SSR ou en mode statique.
- [#216](https://github.com/1024pix/pix-site/pull/216) [BUGFIX] Pages en Erreur 404 sur les sites .fr et .org (PIX-1611)

## v3.0.0 (10/11/2020)

- [#201](https://github.com/1024pix/pix-site/pull/201) [FEATURE] Génération statique de pix-site

## v2.32.0 (05/11/2020)

- [#207](https://github.com/1024pix/pix-site/pull/207) [FEATURE] Ajouter les pages de formulaires contribuables (PIX-1508).
- [#213](https://github.com/1024pix/pix-site/pull/213) [CLEANUP] Supprimer la page "Enseignement Scolaire" (PIX-1432).
- [#211](https://github.com/1024pix/pix-site/pull/211) [CLEANUP] Supprimer la page "qui sommes nous" (PIX-1431).
- [#212](https://github.com/1024pix/pix-site/pull/212) [CLEANUP] Renommage de la route Legal Notice

## v2.31.1 (02/11/2020)

- [#206](https://github.com/1024pix/pix-site/pull/206) [BUGFIX] Correction des tailles d'images et de titres du MultipleBlock-Features (PIX-1530).
- [#210](https://github.com/1024pix/pix-site/pull/210) [CLEANUP] Supprimer les titres H1 sur les cartes des news
- [#208](https://github.com/1024pix/pix-site/pull/208) [CLEANUP] Correction de contraste

## v2.31.0 (22/10/2020)

- [#203](https://github.com/1024pix/pix-site/pull/203) [FEATURE] Afficher les dernières actualités (PIX-1201).
- [#202](https://github.com/1024pix/pix-site/pull/202) [FEATURE] Refonte footer (PIX-1298).
- [#204](https://github.com/1024pix/pix-site/pull/204) [FEATURE] Préciser le domaine Pix ou Pix pro dans les titres (PIX-1233).
- [#193](https://github.com/1024pix/pix-site/pull/193) [FEATURE] Création du bloc Statistiques et refacto (PIX-1200).
- [#198](https://github.com/1024pix/pix-site/pull/198) [CLEANUP] Supprimer les redirections de pro à pix-site.

## v2.30.0 (15/10/2020)

- [#186](https://github.com/1024pix/pix-site/pull/186) [FEATURE] Ajouter un nouveau slice logos (PIX-1199).
- [#190](https://github.com/1024pix/pix-site/pull/190) [FEATURE] Avoir une navigation principale pour Pix Pro (PIX-1368).
- [#200](https://github.com/1024pix/pix-site/pull/200) [TECH] Aligner les couleurs de pix-site
- [#199](https://github.com/1024pix/pix-site/pull/199) [CLEANUP] Suppresion de la page Education Sup.
- [#197](https://github.com/1024pix/pix-site/pull/197) Mise en place du nouveau Matomo
- [#191](https://github.com/1024pix/pix-site/pull/191) [CLEANUP] Pouvoir utiliser les slices pages coté pix-pro.
- [#189](https://github.com/1024pix/pix-site/pull/189) [TECH Ajout de commentaires de PR automatique contenant les urls des review apps.

## v2.29.2 (12/10/2020)

- [#196](https://github.com/1024pix/pix-site/pull/196) [BUGFIX] Empêcher les getSingle of undefined sur Pix.org (PIX-1404).
- [#195](https://github.com/1024pix/pix-site/pull/195) [BUGFIX] Fix appel à /undefined (PIX-1402).

## v2.29.1 (12/10/2020)

- [#194](https://github.com/1024pix/pix-site/pull/194) [BUGFIX] Gestion des liens sur Pix-pro.
- [#192](https://github.com/1024pix/pix-site/pull/192) [CLEANUP] Retirer la balise H1 déjà prise en compte par prismic-rich-text.

## v2.29.0 (08/10/2020)

- [#188](https://github.com/1024pix/pix-site/pull/188) [FEATURE] Suppression de l'execution des test au moment du preversion
- [#185](https://github.com/1024pix/pix-site/pull/185) [FEATURE] Ajouter la possibilité de mettre une vidéo sur Article (PIX-1310).
- [#179](https://github.com/1024pix/pix-site/pull/179) [FEATURE] Création du bloc process (PIX-1198).
- [#187](https://github.com/1024pix/pix-site/pull/187) [BUGFIX] Pouvoir cliquer sur l'icon du bouton dropdown de la navigation
- [#184](https://github.com/1024pix/pix-site/pull/184) [BUGFIX] La navigation ne s'affiche correctement sur les écrans intermédiaire. 
- [#183](https://github.com/1024pix/pix-site/pull/183) [TECH] Ajouter des tests pour LogosZone.

## v2.28.0 (08/10/2020)

- [#185](https://github.com/1024pix/pix-site/pull/185) [FEATURE] Ajouter la possibilité de mettre une vidéo sur Article (PIX-1310).
- [#179](https://github.com/1024pix/pix-site/pull/179) [FEATURE] Création du bloc process (PIX-1198).
- [#187](https://github.com/1024pix/pix-site/pull/187) [BUGFIX] Pouvoir cliquer sur l'icon du bouton dropdown de la navigation
- [#184](https://github.com/1024pix/pix-site/pull/184) [BUGFIX] La navigation ne s'affiche correctement sur les écrans intermédiaire. 
- [#183](https://github.com/1024pix/pix-site/pull/183) [TECH] Ajouter des tests pour LogosZone.

## v2.28.0 (05/10/2020)

- [#181](https://github.com/1024pix/pix-site/pull/181) [FEATURE] Modification du titre du bloc pour structure de page et a11y (PIX-1309)
- [#178](https://github.com/1024pix/pix-site/pull/178) [FEATURE] Intégrer la sous-navigation de pix-pro (PIX-1265)
- [#177](https://github.com/1024pix/pix-site/pull/177) [FEATURE] Pouvoir avoir les slices Article en vertical (PIX-1197).
- [#166](https://github.com/1024pix/pix-site/pull/166) [FEATURE] Implémentation de la nouvelle barre de navigation (PIX-1071).
- [#173](https://github.com/1024pix/pix-site/pull/173) [FEATURE] Deployer pix-pro sur les reviews app (PIX-1263)
- [#171](https://github.com/1024pix/pix-site/pull/171) [FEATURE] Corriger le style de la page mediation numérique (PIX-1261)
- [#172](https://github.com/1024pix/pix-site/pull/172) [FEATURE] Corriger le style de la page employeur (PIX-1261)
- [#170](https://github.com/1024pix/pix-site/pull/170) [FEATURE] Faire des builds dédiés pour pix-site et pix-pro (PIX-1260)
- [#168](https://github.com/1024pix/pix-site/pull/168) [FEATURE] Migrer les pages pro dans pix-site (PIX-1261)
- [#174](https://github.com/1024pix/pix-site/pull/174) [BUGFIX] Correction visuelle sur Pix-site (PF-1271).
- [#180](https://github.com/1024pix/pix-site/pull/180) [TECH] Amélioration du temps de chargement des pages. 
- [#182](https://github.com/1024pix/pix-site/pull/182) [FIX] Correction des instructions d'installation des dépendances dans le README.md
- [#176](https://github.com/1024pix/pix-site/pull/176) [CLEANUP] Ajout d'un component PixImage au dessus du PrismicImage (PIX-1323).
- [#175](https://github.com/1024pix/pix-site/pull/175) Ajout de l'ADR pour la migration de pix-pro dans pix-site

## v2.27.0 (18/09/2020)

- [#169](https://github.com/1024pix/pix-site/pull/169) [FEATURE] Mettre le logo de la république dans le pied de page.

## v2.26.0 (17/09/2020)

- [#167](https://github.com/1024pix/pix-site/pull/167) [BUGFIX] Ajuster l'alignement des titres d'articles (PIX-1286).



## v2.25.0 (14/09/2020)

- [#164](https://github.com/1024pix/pix-site/pull/164) [FEATURE] Changer le logo de la marianne (PIX-1234)
- [#156](https://github.com/1024pix/pix-site/pull/156) [FEATURE] Permettre de créer de nouvelles pages avec des slices sur Prismic (PIX-1169)
- [#161](https://github.com/1024pix/pix-site/pull/161) [FEATURE] Ajouter un sélecteur de contraste pour le texte de la bannière (PIX-1225).
- [#165](https://github.com/1024pix/pix-site/pull/165) [BUGFIX] Problèmes d'affichage sur la page Enseignement Supérieur du site vitrine (PIX-1218).
- [#163](https://github.com/1024pix/pix-site/pull/163) [BUGFIX] Fix les warnings console sur Firefox (PIX-1231)
- [#160](https://github.com/1024pix/pix-site/pull/160) [BUGFIX] Éviter les imports multiples de CSS (PIX-1227).
- [#162](https://github.com/1024pix/pix-site/pull/162) [BUGFIX] Élargir la barre de navigation (PIX-1203).
