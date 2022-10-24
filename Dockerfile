FROM node:16

WORKDIR /app

COPY . .
RUN yarn install --frozen-lockfile

CMD ["yarn", "start:prod"]
