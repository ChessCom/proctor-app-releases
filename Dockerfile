# syntax=docker/dockerfile:1

FROM node:22-alpine3.21 AS base
WORKDIR /home/app
COPY ./ ./
RUN yarn install --frozen-lockfile
RUN yarn run build
USER node:node
CMD ["/usr/local/bin/node", "-r", "source-map-support/register", "dist/index.js"]
