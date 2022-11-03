FROM node:16-alpine AS deps

ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat

WORKDIR /app

copy package.json yarn.lock ./
RUN yarn install --frozen-lockfile


## Builder
FROM node:16-alpine AS builder

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app

COPY next.config.js ./
COPY package.json yarn.lock ./
COPY --from=deps /app/node_modules ./node_mmodules

COPY . .

RUN yarn build


## Production
FROM  node:16-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

CMD [ "node", 'server.js' ]