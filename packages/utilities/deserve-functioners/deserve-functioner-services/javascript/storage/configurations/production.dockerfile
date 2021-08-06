# Stage 0
FROM node:16-alpine AS builder
ENV PORT 8080
ENV HOST 0.0.0.0
ENV NODE_ENV production
ENV ENV_MODE production
WORKDIR /app
COPY configurations ./configurations
COPY package.json yarn.lock ./
RUN yarn install --production false --network-timeout 1000000
COPY . .
RUN yarn run build.production


# Stage 1
FROM node:16-alpine
ENV PORT 8080
ENV HOST 0.0.0.0
ENV NODE_ENV production
ENV ENV_MODE production
WORKDIR /app
COPY --from=builder /app/.npmrc ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/distribution ./distribution
COPY --from=builder /app/scripts ./scripts
RUN yarn install --production --network-timeout 1000000
CMD [ "yarn", "start" ]
