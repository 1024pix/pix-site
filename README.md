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

`FORWARDED_HOST`
Indicates whether host is forwarded.
Shall be set to `true` on Review Apps.

- presence: optional
- type: Boolean
- default: false

## Build Setup

```bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
