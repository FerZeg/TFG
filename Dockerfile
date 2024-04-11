FROM node:21.7-alpine AS builder

RUN mkdir -p /app
WORKDIR /app

COPY /Código/Backend .

RUN npm install

EXPOSE 80

CMD [ "npm", "run", "init" ]