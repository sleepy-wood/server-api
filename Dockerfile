FROM node:16

WORKDIR /app

COPY . .
RUN yarn install --frozen-lockfile

# TODO: start:prod
CMD ["yarn", "start:dev"]
