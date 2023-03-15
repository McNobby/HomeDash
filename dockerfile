FROM node:19-alpine as build

# Turborepo deps
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

RUN npm i -g turbo
COPY . .
RUN turbo prune --scope=frontend --scope=backend --docker



FROM node:19-alpine as install
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY --from=builder /app/out/json/ .

RUN npm i --omit=dev



FROM node:19-alpine as prod
WORKDIR /app

COPY --from=DEPS /app/node_modules ./node_modules
COPY --from=build /app/dest ./dest

COPY ./package.json ./
COPY ./public ./public

EXPOSE 3000

CMD [ "npm", "run", "serve" ]


