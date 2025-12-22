# Multi-stage Dockerfile for Karunia Motor Landing Pages
# Optimized for Coolify deployment

# ============================================
# Stage 1: Builder
# ============================================
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all source files
COPY . .

# Build the application
# Note: standalone output requires next.config.js to have output: 'standalone'
RUN npm run build

# ============================================
# Stage 2: Runner (Production)
# ============================================
FROM node:18-alpine AS runner

# Set NODE_ENV to production
ENV NODE_ENV=production

# Add a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set working directory
WORKDIR /app

# Copy necessary files from builder
# Copy public folder (static assets)
COPY --from=builder /app/public ./public

# Copy package files
COPY --from=builder /app/package*.json ./

# Copy standalone output (minimal server files)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy static files
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Change ownership to non-root user
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose the application port
EXPOSE 3000

# Set environment variables
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["node", "server.js"]

# ============================================
# Build Arguments (Optional)
# ============================================
# Usage: docker build --build-arg NEXT_PUBLIC_STRAPI_URL=https://your-api.com .
ARG NEXT_PUBLIC_STRAPI_URL
ARG STRAPI_API_KEY

ENV NEXT_PUBLIC_STRAPI_URL=${NEXT_PUBLIC_STRAPI_URL}
ENV STRAPI_API_KEY=${STRAPI_API_KEY}

# ============================================
# Image Information
# ============================================
LABEL maintainer="Karunia Motor <dev@karuniamotor.com>"
LABEL description="Karunia Motor Landing Pages - Next.js Application"
LABEL version="1.0.0"
LABEL org.opencontainers.image.title="Karunia Motor Landing Pages"
LABEL org.opencontainers.image.description="Sales representative landing pages for Karunia Motor"
LABEL org.opencontainers.image.vendor="Karunia Motor"
