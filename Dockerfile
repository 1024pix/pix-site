ARG SITE=pix-site
FROM node:18.20.4-alpine AS install-stage
ARG SITE
# Installation des dépendances 

# Copy des packages.json 
COPY ${SITE}/package-lock.json /code/${SITE}/package-lock.json
COPY ${SITE}/package.json /code/${SITE}/package.json

COPY shared/package-lock.json /code/shared/package-lock.json
COPY shared/package.json /code/shared/package.json

# Installation des nodes_modules 
WORKDIR /code/shared
RUN npm ci

WORKDIR /code/${SITE}
RUN npm ci

FROM install-stage AS build-stage

# Mandatory build args 
ARG DOMAIN_FR=localhost
ARG DOMAIN_ORG=localhost
ARG MATOMO_CONTAINER
ARG EASIWARE_SCRIPT_URL
ARG FORM_KEYS_TO_MAP={"masteryPercentage":"control1808388","stage":"control1808389"}

# Copy du code
COPY shared /code/shared
COPY ${SITE}/ /code/${SITE}

# Build de l'application 
RUN npm run build

FROM nginx:1.27.1-alpine AS run-stage
ARG SITE

ENV NGINX_GEOAPI_UPSTREAM_HOST=localhost
# Prise en compte des logs nginx avec Alpine 
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log

# Récupération du build et de la configuration 
COPY --from=build-stage /code/${SITE}/build /usr/share/nginx/html 
COPY ${SITE}/nginx/templates /etc/nginx/templates
COPY ${SITE}/nginx/includes /etc/nginx/includes

CMD ["nginx", "-g", "daemon off;"]