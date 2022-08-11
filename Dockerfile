FROM node:13.12.0-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN apk update && apk add --no-cache -u \
    curl \
    g++ \
    automake \
    autoconf \
    nasm \
    gcc \
    gifsicle \
    zlib \
    git \
    unzip
RUN npm install --only=production
RUN npm install -g forever

COPY . ./
EXPOSE 8080
CMD [ "npm", "run", "dev" ]
# CMD forever --minUptime 10000 --spinSleepTime 30000 -c "npm start" ./
