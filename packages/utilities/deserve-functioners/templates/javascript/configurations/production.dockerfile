# Stage 0
FROM node:16-alpine

ENV PORT 8080
ENV HOST 0.0.0.0
ENV NODE_ENV production
ENV ENV_MODE production

WORKDIR /app

COPY . .

RUN yarn install --production --network-timeout 1000000

CMD [ "yarn", "prepare" ]
