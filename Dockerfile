FROM node:24-alpine as node

RUN apk add --no-cache ffmpeg python3 py3-pip

RUN pip install --no-cache-dir --break-system-packages youtube-dl

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
