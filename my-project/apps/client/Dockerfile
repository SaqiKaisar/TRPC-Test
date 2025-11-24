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
COPY apps/client/ ./apps/client/

# Install dependencies
RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/client

EXPOSE 5173

CMD ["pnpm", "dev", "--host"]

