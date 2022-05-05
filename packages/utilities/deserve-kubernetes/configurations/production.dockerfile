# Stage 0
FROM node:16-alpine AS builder
ARG NPM_TOKEN
ARG NPM_REGISTRY=registry.npmjs.org
ENV PORT 8080
ENV HOST 0.0.0.0
ENV NODE_ENV production
ENV ENV_MODE production
ENV NPM_TOKEN $NPM_TOKEN
ENV NPM_REGISTRY $NPM_REGISTRY
WORKDIR /app
COPY configurations ./configurations
COPY package.json ./
RUN ( echo "cat <<EOF" ; cat ./configurations/.npmrcx ; echo EOF ) | sh > ./.npmrc
RUN yarn install --production false --network-timeout 1000000
COPY . .
RUN yarn run build.production
RUN npm prune --production


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
COPY --from=builder /app/node_modules ./node_modules
CMD [ "yarn", "start" ]
