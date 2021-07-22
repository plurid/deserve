FROM node:16-alpine AS builder

WORKDIR /app

COPY configurations ./configurations
COPY package.json yarn.lock ./

ENV ENV_MODE="production"
ENV NODE_ENV="production"

RUN yarn install --production false --network-timeout 1000000

COPY . .

RUN yarn build.production




FROM node:16-alpine

ARG PORT=33733

ARG DESERVE_NODE_LOG_LEVEL=""
ARG DESERVE_NODE_QUIET=""
ARG DESERVE_NODE_BASE_PATH=""
ARG DESERVE_NODE_COOKIE_DOMAIN=""
ARG DESERVE_NODE_DEFAULT_TUNNEL_HOST=""

ARG DESERVE_NODE_DATABASE_NAME=""
ARG DESERVE_NODE_STORAGE_NAME=""

ARG DESERVE_NODE_MONGO_CONNECTION_STRING="mongodb://127.0.0.1:33734/"

ARG DESERVE_NODE_MINIO_END_POINT="0.0.0.0"
ARG DESERVE_NODE_MINIO_PORT="33735"

ARG DESERVE_NODE_JWT_ALGORITHM="HS256"
ARG DESERVE_NODE_JWT_EXPIRATION="7d"
ARG DESERVE_NODE_JWT_ISSUER="localhost"

ENV HOST="0.0.0.0"
ENV ENV_MODE="production"
ENV NODE_ENV="production"

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/build ./build
COPY --from=builder /app/scripts ./scripts

RUN yarn install --production --network-timeout 1000000

CMD ["yarn", "start"]
