# pix-site

> Site vitrine de Pix.

## Variables d'environnement

`PRISMIC_API_ENDPOINT`  
URL of the Prismic API used for content management.

- presence: required
- type: Url
- default: none

`PRISMIC_API_TOKEN`
API token of the Prismic API used for content management.

- presence: required
- type: String
- default: none

`DOMAIN_FR`
Domain name for `.fr` extension.

- presence: required
- type: String
- default: none

`DOMAIN_ORG`
Domain name for `.org` extension.

- presence: required
- type: String
- default: none

`MATOMO_URL`
If not present, nuxt-matomo will not be loaded and analytics will not be active

- presence: optional
- type: Url
- default: none

`MATOMO_CONTAINER`
If not present, nuxt-matomo will not be loaded and tag managers will not be active

- presence: optional
- type: Url
- default: none

`MATOMO_DEBUG`
If not present, nuxt-matomo is not in debug mode

- presence: optional
- type: Boolean
- default: false

`METABASE_API_URL`
If not present, Metabase cards will not be loaded.

- presence: optional
- type: Url
- default: none

`METABASE_USERNAME`
If not present, Metabase cards will not be loaded.

- presence: optional
- type: String
- default: none

`METABASE_PASSWORD`
If not present, Metabase cards will not be loaded.

- presence: optional
- type: String
- default: none

## Build Setup pix-site

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:5000
$ npm run dev:site

# build for production and launch server
$ npm run build:site
$ npm run start:site
```

## Build Setup pix-pro

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:5000
$ npm run dev:pro

# build for production and launch server
$ npm run build:pro
$ npm run start:pro
```


## Build Setup sur Scalingo

```bash
# install dependencies
$ npm install

# build for production and launch server
$ npm run build
$ npm run start
```

La variable d'environnement `SITE` doit être assignée en fonction du site à déployer

```bash
SITE=pix-site
# ou
SITE=pix-pro
```

## Conventions de nommage

### Fichiers

Les noms de **fichier des composants** (classes dans `/components`) doivent être en _PascalCase_.

Exemples :

- components/AppFooter.vue
- components/slices/FeatureList.vue

Les noms des **autres fichiers** (_.js, _.vue, *.scss, etc.) en *kebab-case\*.

Exemples :

- layout/default.vue

Les **fichiers Sass** (*.scss) doivent être préfixés par un *underscore\* (`_`), **sauf app.scss** (convention Sass).

Exemples :

- assets/scss/components/\_app-header.scss
- assets/scss/globals/\_text.scss

### Fichier spécifique pour chaque site

Seul les pages et les middlewares sont spécifiques à chaque site (pix-site et pix-pro), le reste est commun.
Par conséquent, on va retrouver cette architecture de répertoire:

```
middleware/
   pix-site/
   pix-pro/
pages/
   pix-site/
   pix-pro/
```

### Composants

Les **noms des composants** doivent être composés d'au moins _2 mots_ afin de pallier à toute éventuelle collision avec une évolution de la spec HTML et diminuer le risque d'une éventuelle collision avec une lib externe.

Exemples :

- components/AppFooter.vue
- components/MediaPlayer.vue

```
Fun fact : nous avons rencontré cette pratique pour la première fois dans les conventions Ember. Elle a été reprise par le projet Slice Machine de Prismic.
```

### Prismic

Les **clés d'API** (API ID) de tous les objets de modélisation des types de document (nom, champs, labels, slices) en _snake_case_ car :

- c’est la convention qui ressort de la documentation Prismic
- c’est plus facile pour manipuler les champs dans le code

De même que pour les composants Vue, les **noms des slices** doivent être composés de _2 mots minimum_ :

- préconisé par le CLI prismic (via prismic sm --create-slice)
- permet de se prémunir contre des futures collision de nom en cas d'évolution du langage HTML (même justification qu’Ember)

Exemples :

- article_item
- article_list
- feature_item
- feature_list
- hero_banner

Le contenu d'une slice est passé _en entier_ et tel-quel au composant Vue équivalent via une propriété exposée `:slice`.

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

### NGINX

Pour tester la configuration NGINX des sites statiques en local, il suffit de faire:

```
npm run build:site

PORT=80 erb servers.conf.erb > nginx.conf && docker-compose up
```

Aller sur `http://localhost` ou `http://localhost.org`

Pour que localhost.org soit fonctionnel, il faut éditer votre fichier `/etc/hosts` en y ajoutant la ligne suivante :

```
127.0.0.1	localhost.org
```

Des tests unitaires existent dans `tests.sh`.
Pour les lancer il faut exécuter la commande:

```
bash tests.sh
```
