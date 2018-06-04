FROM node:8.9-alpine

WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm install --loglevel=error --progess=false

COPY . .