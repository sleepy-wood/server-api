FROM public.ecr.aws/docker/library/node:16

WORKDIR /app

RUN apt update && apt install -y ffmpeg \
    && rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . ./

EXPOSE 3000

CMD ["yarn", "start:container"]
