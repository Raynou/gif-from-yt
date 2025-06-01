FROM node:24-alpine as node
FROM mikenye/youtube-dl:2025.04.30
FROM linuxserver/ffmpeg

WORKDIR /app

RUN npm install

RUN npm build

EXPOSE 3000

CMD [ "npm", "run", "start" ]

