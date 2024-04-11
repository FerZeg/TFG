FROM node:18-alpine AS builder

RUN mkdir -p /app
WORKDIR /app

COPY /Código/Backend/package.json .
COPY /Código/Backend/package-lock.json .
RUN npm install

COPY /Código/Backend .

EXPOSE 80
CMD [ "npm", "run", "start" ]