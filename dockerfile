FROM node:19-alpine as build
WORKDIR /app

COPY ./package.json ./
COPY ./tsconfig.json ./
COPY ./server ./server
RUN npm i

RUN npx tsc


FROM node:19-alpine as DEPS
WORKDIR /app

COPY ./package.json ./
RUN npm i --omit=dev


FROM node:19-alpine as prod
WORKDIR /app

COPY --from=DEPS /app/node_modules ./node_modules
COPY --from=build /app/dest ./dest

COPY ./package.json ./
COPY ./public ./public

EXPOSE 3000

CMD [ "npm", "run", "serve" ]


