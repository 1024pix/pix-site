ARG SITE=pix-site

FROM node:18.20-alpine AS build-stage

ARG SITE
COPY ${SITE}/package-lock.json /code/${SITE}/package-lock.json
COPY ${SITE}/package.json /code/${SITE}/package.json

COPY shared /code/shared

WORKDIR /code/shared

RUN npm ci

WORKDIR /code/${SITE}

RUN npm ci

RUN ls /code/
RUN ls /code/
COPY ${SITE}/ /code/${SITE}

RUN npm run build

FROM nginx:1.26.0-alpine AS run-stage
ARG SITE

ENV PORT=80
ENV NGINX_GEOAPI_UPSTREAM_HOST=localhost

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
 && ln -sf /dev/stderr /var/log/nginx/error.log

COPY --from=build-stage /code/${SITE}/build /usr/share/nginx/html 
COPY ${SITE}/nginx/templates /etc/nginx/templates
COPY ${SITE}/nginx/includes /etc/nginx/includes

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
