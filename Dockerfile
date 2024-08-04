FROM node:lts-alpine as build
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
CMD [ "npm" , "run" , "dev" ]