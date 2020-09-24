# 1. Migration de pix-pro dans pix-site

Date : 2020-09-24

## État

Accepté

## Contexte

Afin de monter et déployer rapidement le site [pix-pro](pro.pix.fr), il a été décidé de dupliquer le projet [pix-site](pix.fr) qui utilise la même technologie (Nuxt), les mêmes composants et le même gestionnaire de contenu éditorial (Prismic). 

Par conséquent les évolutions appliquées à pix-site (composant de navigation, composants génériques) ne sont pas impactées sur pix-pro et inversement.

## Décision

Il a été décidé de migrer les pages pix-pro dans pix-site afin que les deux sites puissent profiter des nouvelles évolutions et conservent des composants communs et génériques.

Dans un second temps les pages pix-pro seront réécrites dans le même pattern que celles de pix-site afin qu'elles soient facilement éditables via Prismic.

## Conséquences

### Architecture

- Les pages spécifiques pix-site et pix-pro sont séparées dans des répertoires dédiés
- Les composants, les assets et la configuration sont partagés entre les deux sites
- Une variable d'environnement (`SITE`) permet de définir quel site est démarré ou construit 

### Release

Comme pix-site et pix-pro sont hébergés sous le même repository et partagent la même gestion de version (celle de pix-site actuellement), les deux sites seront toujours déployés simultanément.

### Déploiement

Les sites pix-site et pix-pro ont chacun :
- un template de review app sous Scalingo (avec la variable d'environnement SITE)
- un template d'intégration sous Scalingo (avec la variable d'environnement SITE)
- un template de production sous Scalingo (avec la variable d'environnement SITE)

