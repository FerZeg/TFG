FROM node:18-alpine AS builder

RUN mkdir -p /app
WORKDIR /app

RUN npm install

COPY /Código/Backend .

EXPOSE 80

CMD [ "npm", "run", "init" ]