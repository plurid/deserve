# Stage 0
FROM node:16-alpine

ARG DESERVE_DATABASE_TOKEN
ARG DESERVE_EVENT_TOKEN
ARG DESERVE_STORAGE_TOKEN

ENV PORT 8080
ENV HOST 0.0.0.0
ENV NODE_ENV production
ENV ENV_MODE production

WORKDIR /app

COPY . .

RUN yarn install --production --network-timeout 1000000

CMD [ "yarn", "prepare" ]
