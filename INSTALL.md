# Installation

## Builpack

Ce projet est compatible avec les buildpacks de scalingo.
Deux répertoires 
- pix-site
- pix-pro

## Docker

Un dockerfile est diposible à la racine du projet, pour pix-site et pix-pro

### Build pix-site

```
docker build \
--build-arg "DOMAIN_FR=localhost:8080" \
--build-arg "DOMAIN_ORG=localhost:8080" \
--build-arg "SITE=pix-site" \
-t pix-site .
```
### Run pix-site

```
docker run -ti -p 8080:80 pix-site

```

### Build pix-pro

```
docker build \
--build-arg "DOMAIN_FR=localhost:8080" \
--build-arg "DOMAIN_ORG=localhost:8080" \
--build-arg "SITE=pix-pro" \
-t pix-pro .
```

### Run pix-pro

```
docker run -ti -p 8080:80 pix-pro

```
