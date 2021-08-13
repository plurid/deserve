FROM node:16-alpine AS builder

WORKDIR /app

COPY configurations ./configurations
COPY package.json yarn.lock ./

ENV ENV_MODE="production"
ENV NODE_ENV="production"
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN apk add --update --no-cache python3 make g++  \
   ca-certificates \
   curl \
   git \
   wget

RUN yarn install --production false --network-timeout 1000000

COPY . .

RUN yarn build.production




FROM node:16-alpine

RUN apk add --update --no-cache python3 make g++  \
   ca-certificates \
   curl \
   git \
   wget

ENV PORT=33733
ENV HOST="0.0.0.0"
ENV ENV_MODE="production"
ENV NODE_ENV="production"

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/build ./build
COPY --from=builder /app/scripts ./scripts

RUN yarn install --production --network-timeout 1000000

CMD ["yarn", "start"]
