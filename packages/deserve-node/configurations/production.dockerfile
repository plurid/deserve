FROM node:12-alpine AS builder


WORKDIR /app


COPY . .


ENV ENV_MODE production
ENV NODE_ENV production


RUN yarn install --production false --network-timeout 1000000


RUN yarn build.production




FROM node:12-alpine


ARG PORT=3366


ENV ENV_MODE production
ENV NODE_ENV production
ENV PORT $PORT


WORKDIR /app


COPY --from=builder /app/package.json ./
COPY --from=builder /app/build ./build
COPY --from=builder /app/scripts ./scripts


RUN yarn install --production --network-timeout 1000000


CMD ["yarn", "start"]
