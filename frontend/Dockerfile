FROM node:18-alpine AS builder
ENV NODE_ENV production

WORKDIR /usr/app

COPY package*.json .
RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.24.0-alpine as production
ENV NODE_ENV production

COPY --from=builder ./usr/app/dist /usr/share/nginx/html

COPY ./.infra/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
