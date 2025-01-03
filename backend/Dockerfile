FROM node:22.11.0-alpine

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

EXPOSE 8080

CMD [ "node", "server.js" ]