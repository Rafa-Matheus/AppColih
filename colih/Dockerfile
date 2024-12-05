FROM node:18-alpine
FROM postgres:latest

ENV POSTGRES_DB colih
ENV POSTGRES_USER admin
ENV POSTGRES_PASSWORD admin

WORKDIR /app

COPY .eslintrc.json ./
COPY db.json ./
COPY next.config.js ./
COPY package*.json ./
COPY server.js ./

COPY ./components ./components
COPY ./lib ./lib
COPY ./model ./model
COPY ./pages ./pages
COPY ./public ./public
COPY ./screens ./screens
COPY ./styles ./styles

RUN npm i

EXPOSE 3000

CMD ["npm", "run", "dev"]