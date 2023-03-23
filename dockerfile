FROM node:19-alpine as builder

# Turborepo deps
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN npm i -g turbo
COPY . .
RUN turbo prune --scope=frontend --scope=backend --docker


FROM node:19-alpine as installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN npm i

COPY --from=builder /app/out/full .
RUN cd ./apps/frontend && npm i
RUN cd ./apps/Backend && npm i

RUN cd ../../ # workdir
RUN npm i

RUN npm i -g turbo
COPY ./turbo.json .
RUN npm run build


FROM node:19-alpine as prod
WORKDIR /app

# Install Turborepo
RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm i -g turbo
COPY ./turbo.json .

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 vue
#USER vue

COPY  --chown=vue:nodejs ./package*.json .

COPY --from=installer --chown=vue:nodejs /app/apps/frontend/dist ./apps/frontend/dist
COPY --chown=vue:nodejs ./apps/frontend/package*.json ./apps/frontend

COPY --from=installer --chown=vue:nodejs /app/apps/Backend/dist ./apps/Backend/dist
COPY --chown=vue:nodejs ./apps/Backend/package*.json ./apps/Backend
RUN npm i --prefix ./apps/Backend # we have to install the backend deps here as it is not minified

EXPOSE 3000 9000

CMD [ "npm", "run", "serve" ]


