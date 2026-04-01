# Installation


## Builpack

Ce projet est compatible avec les buildpacks de scalingo.
Un répertoire :
- pix-site


## Docker

Un dockerfile est disponible à la racine du projet, pour pix-site

### Build pix-site

```shell
docker build \
--build-arg "DOMAIN_FR=localhost:8080" \
--build-arg "DOMAIN_ORG=localhost:8080" \
--build-arg "SITE=pix-site" \
-t pix-site .
```

### Run pix-site

```shell
docker run -ti -p 8080:80 pix-site
```

