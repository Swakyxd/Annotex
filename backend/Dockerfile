FROM node:20-alpine AS builder

WORKDIR /app

# Prisma config resolution requires DIRECT_URL even for `prisma generate`.
# Render build phase does not always inject runtime env vars, so keep a safe fallback.
ARG DIRECT_URL="postgresql://placeholder:placeholder@localhost:5432/postgres?schema=public"
ENV DIRECT_URL=${DIRECT_URL}

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma

RUN npm ci

COPY src ./src

# Generate Prisma client and build TypeScript
RUN npm run prisma:generate
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

ARG DIRECT_URL="postgresql://placeholder:placeholder@localhost:5432/postgres?schema=public"
ENV DIRECT_URL=${DIRECT_URL}

COPY package*.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

RUN mkdir -p logs uploads

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "dist/server.js"]
