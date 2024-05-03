FROM node:18.20-alpine AS build-stage

RUN apk update  \
  && apk add ruby

COPY pix-site code/pix-site
COPY shared code/shared

ENV SITE=pix-site

WORKDIR /code/shared
RUN npm install

WORKDIR ../pix-site
RUN npm install
RUN npm run build

ENV PORT=80
RUN erb servers.conf.erb > nginx.conf

FROM nginx:alpine AS run-stage

COPY --from=build-stage /code/pix-site/build /app/build/
COPY --from=build-stage /code/pix-site/nginx.conf /etc/nginx/conf.d/pix-site.conf

RUN chown -R nginx:nginx /app/
RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.backup

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
