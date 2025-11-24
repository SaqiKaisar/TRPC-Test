FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy root package files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY turbo.json ./
COPY tsconfig.json ./

# Copy all workspace packages
COPY packages/ ./packages/
COPY apps/server/ ./apps/server/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build
RUN pnpm turbo build --filter=server

WORKDIR /app/apps/server

EXPOSE 4000

CMD ["pnpm", "dev"]