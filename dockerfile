FROM node:19-alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm i --omit=dev

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "serve" ]


