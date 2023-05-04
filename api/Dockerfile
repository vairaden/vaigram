FROM node:18-alpine AS installer
RUN apk update
WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=installer /app/node_modules ./node_modules
COPY . .
RUN yarn prisma generate --schema=./src/prisma/schema.prisma
RUN yarn build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/dist .
COPY --from=builder /app/.env .
COPY --from=builder /app/node_modules ./node_modules

# Don't run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs

CMD ["node", "./index.js"]