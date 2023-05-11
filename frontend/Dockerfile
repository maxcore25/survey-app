# Stage 0, Install Node.JS
FROM node:latest as build-stage

WORKDIR /app
COPY ./frontend/proxy/nginx.conf /nginx.conf
COPY ./frontend /app
RUN yarn install && yarn build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:latest
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
