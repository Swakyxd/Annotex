FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# NEXT_PUBLIC_* is inlined into the client bundle at build time, so this must be
# a build arg. Passing it only at runtime leaves the browser calling localhost.
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

RUN npm run build

FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
# standalone's server.js binds to localhost by default, which is unreachable
# from outside the container and breaks the port mapping.
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nextjs && \
    adduser -S nextjs -u 1001 -G nextjs

# next.config.ts sets output: "standalone", so .next/standalone carries
# server.js plus the traced node_modules. It does NOT include public/ or
# .next/static — without the two copies below, every image and stylesheet 404s.
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nextjs /app/public ./public

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode < 500 ? 0 : 1)}).on('error', () => process.exit(1))"

CMD ["node", "server.js"]
