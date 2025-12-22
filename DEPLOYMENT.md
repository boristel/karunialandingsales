# Deployment Guide - Karunia Motor Landing Pages

Deploying this Next.js application to Coolify on your VPS.

## Table of Contents
1. [Deployment Options](#deployment-options)
2. [Prerequisites](#prerequisites)
3. [Option 1: Using Nixpacks (Recommended)](#option-1-using-nixpacks-recommended)
4. [Option 2: Using Dockerfile](#option-2-using-dockerfile)
5. [Environment Variables](#environment-variables)
6. [Deployment Steps](#deployment-steps)
7. [Post-Deployment Configuration](#post-deployment-configuration)
8. [Troubleshooting](#troubleshooting)

---

## Deployment Options

This Next.js application uses **Server-Side Rendering (SSR)** with `getServerSideProps`, which means:
- ❌ **Static HTML export is NOT possible** (the app requires a Node.js server)
- ✅ **Nixpacks** - Automatic build configuration (Recommended)
- ✅ **Dockerfile** - Full control over the container

---

## Prerequisites

### 1. Coolify Instance
- Coolify installed on your VPS
- Access to Coolify dashboard
- Git repository connected (GitHub/GitLab/Bitbucket)

### 2. Required Environment Variables
```
NEXT_PUBLIC_STRAPI_URL=https://karuniastrapi.nababancloud.com
STRAPI_API_KEY=your-api-token-here
```

### 3. VPS Requirements
- Minimum: 1 CPU, 512MB RAM (1GB RAM recommended)
- Node.js 18+ runtime
- Port allocation for the service

---

## Option 1: Using Nixpacks (Recommended)

Nixpacks automatically detects Next.js and configures the build.

### Configuration File: `nixpacks.toml`

This file is already included in the project root:

```toml
[phases.build]
nixPkgs = ["nodejs-18_x", "npm-9_x"]
cmds = ["npm ci", "npm run build"]

[phases.start]
cmds = ["npm run start"]

[start]
cmd = "npm run start"

[variables]
NODE_ENV = "production"
PORT = "3000"
```

### Why Nixpacks?
- ✅ Zero configuration required
- ✅ Automatic dependency detection
- ✅ Optimized caching for faster builds
- ✅ Automatic SSL/HTTPS setup
- ✅ Health check configuration

---

## Option 2: Using Dockerfile

### Dockerfile Content

This file is already included in the project root:

```dockerfile
# Multi-stage build for optimized image size
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

# Set NODE_ENV to production
ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set working directory
WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Change ownership
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set PORT
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "server.js"]
```

### Dockerfile Features:
- Multi-stage build for smaller image size
- Non-root user for security
- Optimized for production
- Standalone output for better performance

### Required next.config.js Update for Docker:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Required for Docker
  images: {
    domains: ['localhost', 'karuniastrapi.nababancloud.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'karuniastrapi.nababancloud.com',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
```

---

## Environment Variables

### Required for Production:

Create these in Coolify under **Environment Variables**:

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_STRAPI_URL` | `https://karuniastrapi.nababancloud.com` | Your Strapi backend URL |
| `STRAPI_API_KEY` | `your-api-token` | Strapi API authentication token |
| `NODE_ENV` | `production` | Environment mode |
| `PORT` | `3000` | Application port (default) |

### Optional Variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.com` | Your public application URL |

---

## Deployment Steps

### Using Coolify Dashboard

#### Step 1: Create New Project
1. Open Coolify dashboard
2. Click **"New Project"**
3. Select **"From Git Provider"**
4. Choose your Git provider (GitHub/GitLab/Bitbucket)
5. Select repository: `boristel/karunialandingsales`
6. Select branch: `main`

#### Step 2: Configure Build Settings

**For Nixpacks:**
1. Build Type: **Nixpacks**
2. Nixpacks will automatically detect Next.js
3. No additional configuration needed

**For Dockerfile:**
1. Build Type: **Dockerfile**
2. Dockerfile Path: `./Dockerfile`
3. Context Path: `./`
4. Build Arguments: (leave empty)

#### Step 3: Configure Environment Variables
1. Scroll to **Environment Variables** section
2. Add each required variable from the table above
3. **Important:** Never commit `.env.local` to git
4. Click **"Save"**

#### Step 4: Configure Deployment
1. **Deployment Type:** **Website** (recommended for public access)
2. **Domain:**
   - Add your custom domain (e.g., `sales.karuniamotor.com`)
   - Or use Coolify's generated domain
3. **Port:** `3000`
4. **HTTPS:** Enable (automatic with Coolify + Let's Encrypt)

#### Step 5: Deploy
1. Click **"Deploy"** button
2. Wait for build to complete (2-5 minutes)
3. Monitor logs in the **Logs** tab
4. Deployment will be live at your configured domain

---

## Post-Deployment Configuration

### 1. DNS Configuration

If using a custom domain, add DNS records:

```
Type: A
Name: sales (or your subdomain)
Value: your-vps-ip-address
TTL: 3600
```

Or for CNAME:
```
Type: CNAME
Name: sales
Value: your-coolify-domain
TTL: 3600
```

### 2. Health Checks

Coolify automatically sets up health checks at:
```
https://your-domain.com/api/health
```

Ensure the endpoint returns 200 OK.

### 3. SSL/HTTPS

Coolify automatically provisions SSL certificates via Let's Encrypt:
- ✅ Automatic HTTPS
- ✅ Certificate auto-renewal
- ✅ HTTP to HTTPS redirect

### 4. Performance Optimization

Enable in Coolify:
- Resource limits (CPU, Memory)
- Auto-scaling (if available)
- CDN (built-in with Coolify proxy)

---

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: Build Fails - Module Not Found
```
Error: Cannot find module 'xxx'
```
**Solution:** Run `npm install` locally and commit updated `package-lock.json`

#### Issue 2: Application Shows "Sales Not Found"
```
All profiles return "Sales Not Found"
```
**Solutions:**
1. Check environment variables in Coolify
2. Verify `NEXT_PUBLIC_STRAPI_URL` is correct
3. Verify `STRAPI_API_KEY` is valid
4. Check Strapi backend is accessible from VPS
5. Review Coolify logs for API errors

#### Issue 3: Images Not Loading
```
Images show 400 Bad Request or 403 Forbidden
```
**Solutions:**
1. Verify `next.config.js` has correct `remotePatterns`
2. Check Strapi API allows image access from your domain
3. Ensure images are published in Strapi
4. Check Coolify proxy configuration

#### Issue 4: Deployment Stuck
```
Build hangs at "Installing dependencies"
```
**Solutions:**
1. Check VPS has sufficient disk space
2. Verify network connectivity to npm registry
3. Try rebuilding without cache
4. Check Coolify agent is running on VPS

#### Issue 5: High Memory Usage
```
Container killed due to OOM (Out of Memory)
```
**Solutions:**
1. Increase memory limit in Coolify (min 512MB, recommended 1GB)
2. Enable `output: 'standalone'` in `next.config.js`
3. Optimize Next.js build with `swcMinify: true`

### Checking Logs

1. **Coolify Dashboard:**
   - Go to Project → Deployments
   - Click on active deployment
   - View **Logs** tab

2. **VPS Terminal:**
   ```bash
   docker ps                    # Find container ID
   docker logs <container-id>   # View logs
   docker logs -f <container-id> # Follow logs
   ```

3. **Application Logs:**
   - Server errors: Check Coolify logs
   - Build errors: Check build logs tab
   - Runtime errors: Check container logs

### Useful Commands for VPS

```bash
# Check container status
docker ps -a | grep karunia

# View container logs
docker logs -f <container-id>

# Restart container
docker restart <container-id>

# Enter container shell
docker exec -it <container-id> sh

# Check resource usage
docker stats <container-id>

# Clean up old images
docker system prune -a
```

---

## Monitoring and Maintenance

### Health Monitoring

Set up in Coolify:
- Uptime monitoring (built-in)
- Resource usage alerts
- Error rate monitoring

### Backup Strategy

1. **Database Backup:** (if using database)
   - Enable automatic backups in Coolify
   - Schedule daily backups

2. **Application Backup:**
   - Git repository serves as backup
   - Tag releases for easy rollback

### Update Procedure

1. Update code locally
2. Test thoroughly
3. Commit and push to `main` branch
4. Coolify auto-deploys on push (if enabled)
5. Or manually trigger deployment in Coolify dashboard

### Rollback Procedure

If deployment fails:
1. Go to Coolify Dashboard
2. Select Project
3. Click **Deployments**
4. Find previous successful deployment
5. Click **Redeploy**

---

## Security Best Practices

1. ✅ Never commit `.env.local` to git
2. ✅ Use strong API tokens
3. ✅ Enable HTTPS everywhere
4. ✅ Keep dependencies updated
5. ✅ Monitor logs for suspicious activity
6. ✅ Use non-root user in container
7. ✅ Set resource limits
8. ✅ Regular security updates on VPS

---

## Performance Tips

1. **Enable Caching:**
   ```javascript
   // next.config.js
   module.exports = {
     experimental: {
       serverActions: true,
     },
   }
   ```

2. **Optimize Images:**
   - Use `unoptimized: false` for production
   - Configure proper image domains

3. **Enable Compression:**
   - Coolify proxy handles gzip
   - Next.js handles asset optimization

4. **CDN:**
   - Coolify provides built-in CDN
   - Or configure custom CDN

---

## Support and Resources

- **Coolify Documentation:** https://coolify.io/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Docker Documentation:** https://docs.docker.com/
- **Project Repository:** https://github.com/boristel/karunialandingsales

---

## Quick Reference

### Deploy URLs (Example)
- **Production:** https://sales.karuniamotor.com
- **Coolify:** https://coolify.yourdomain.com
- **Repository:** https://github.com/boristel/karunialandingsales

### Environment Variables Quick Copy
```bash
NEXT_PUBLIC_STRAPI_URL=https://karuniastrapi.nababancloud.com
STRAPI_API_KEY=your-api-token-here
NODE_ENV=production
PORT=3000
```

### Test Endpoints
- **Home:** https://your-domain.com/
- **Sample Profile:** https://your-domain.com/profile/SALES-1766286554860
- **Health Check:** https://your-domain.com/api/health (if configured)

---

**Last Updated:** December 2024
**Version:** 1.0.0
**Status:** Production Ready ✅
