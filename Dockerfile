ARG SITE=pix-site
FROM node:18.20-alpine AS build-stage
ARG SITE

# Copy des packages.json 
COPY ${SITE}/package-lock.json /code/${SITE}/package-lock.json
COPY ${SITE}/package.json /code/${SITE}/package.json

COPY shared/package-lock.json /code/shared/package-lock.json
COPY shared/package.json /code/shared/package.json

WORKDIR /code/shared

# Installation des nodes_modules 
RUN npm ci

WORKDIR /code/${SITE}

RUN npm ci

# Copy du code
COPY shared /code/shared
COPY ${SITE}/ /code/${SITE}

# Build de l'application 

RUN npm run build

FROM nginx:1.26.0-alpine AS run-stage
ARG SITE

# Prise en compte des logs nginx avec Alpine 
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
 && ln -sf /dev/stderr /var/log/nginx/error.log

ENV PORT=80
ENV NGINX_GEOAPI_UPSTREAM_HOST=localhost

# Récupération du build et de la configuration 
COPY --from=build-stage /code/${SITE}/build /usr/share/nginx/html 
COPY ${SITE}/nginx/templates /etc/nginx/templates
COPY ${SITE}/nginx/includes /etc/nginx/includes

CMD ["nginx", "-g", "daemon off;"]