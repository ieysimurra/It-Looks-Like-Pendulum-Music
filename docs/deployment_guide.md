# 🚀 Deployment Guide

This guide covers how to deploy Interactive Musical Pendulums to various platforms and environments.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Build Process](#build-process)
3. [GitHub Pages](#github-pages)
4. [Netlify](#netlify)
5. [Vercel](#vercel)
6. [Custom Server](#custom-server)
7. [CDN Configuration](#cdn-configuration)
8. [Environment Variables](#environment-variables)
9. [Monitoring & Analytics](#monitoring--analytics)
10. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### System Requirements
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Git**: Latest version
- **Modern Browser**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+

### Required Accounts (Optional)
- GitHub account (for GitHub Pages)
- Netlify account (for Netlify deployment)
- Vercel account (for Vercel deployment)
- Domain provider (for custom domains)

---

## 🏗️ Build Process

### Local Build

```bash
# Clone the repository
git clone https://github.com/your-username/interactive-musical-pendulums.git
cd interactive-musical-pendulums

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run serve
```

### Build Configuration

The build process includes:

- **Minification**: JavaScript and CSS minification
- **Optimization**: Asset optimization and compression
- **Service Worker**: PWA service worker generation
- **Manifest**: Web app manifest generation
- **Icons**: Icon generation for various devices

### Build Outputs

```
dist/
├── index.html              # Main HTML file
├── sketch.min.js           # Minified JavaScript
├── style.min.css           # Minified CSS
├── sw.js                   # Service worker
├── manifest.json           # Web app manifest
├── assets/                 # Optimized assets
│   ├── icons/             # App icons
│   ├── screenshots/       # App screenshots
│   └── favicon.ico        # Favicon
└── docs/                  # Documentation (optional)
```

---

## 📄 GitHub Pages

### Automatic Deployment

The repository includes GitHub Actions for automatic deployment:

1. **Push to main branch** triggers deployment
2. **GitHub Actions** builds the project
3. **GitHub Pages** serves the built files

### Manual Setup

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Custom Domain

1. Add `CNAME` file to `dist/` directory:
```
your-domain.com
```

2. Configure DNS:
```
Type: CNAME
Name: www
Value: your-username.github.io
```

### GitHub Pages Configuration

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 🟢 Netlify

### Drag & Drop Deployment

1. Build the project locally:
```bash
npm run build
```

2. Drag `dist/` folder to [Netlify Drop](https://app.netlify.com/drop)

### Git Integration

1. **Connect Repository** in Netlify dashboard
2. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

### Netlify Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--prefix=/opt/buildhome/.nodejs"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "no-cache"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[dev]
  command = "npm run dev"
  port = 8000
  publish = "."
```

### Environment Variables

```bash
# Netlify environment variables
NODE_ENV=production
BUILD_FLAGS=--production
GENERATE_SOURCEMAP=false
```

---

## ▲ Vercel

### Vercel CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Git Integration

1. **Import Project** in Vercel dashboard
2. **Configure Settings**:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Vercel Configuration

Create `vercel.json`:

```json
{
  "version": 2,
  "name": "interactive-musical-pendulums",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "buildCommand": "npm run build",
        "outputDirectory": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/sw.js",
      "headers": {
        "Cache-Control": "no-cache"
      }
    },
    {
      "src": "/assets/(.*)",
      "headers": {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

---

## 🖥️ Custom Server

### Apache Configuration

Create `.htaccess`:

```apache
# Enable HTTPS redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Single Page Application routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security headers
<IfModule mod_headers.c>
    Header always set X-Frame-Options "DENY"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>

# Cache configuration
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/html "access plus 1 hour"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Service Worker
<Files "sw.js">
    Header set Cache-Control "no-cache"
</Files>
```

### Nginx Configuration

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL Configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;

    # Root directory
    root /var/www/interactive-musical-pendulums/dist;
    index index.html;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Cache configuration
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location = /sw.js {
        expires off;
        add_header Cache-Control "no-cache";
    }

    # Single Page Application routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

### Docker Deployment

Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./ssl:/etc/nginx/ssl:ro
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.pendulums.rule=Host(`your-domain.com`)"
      - "traefik.http.routers.pendulums.tls=true"
      - "traefik.http.routers.pendulums.tls.certresolver=letsencrypt"
```

---

## 🌐 CDN Configuration

### Cloudflare

1. **Add Site** to Cloudflare
2. **Configure DNS**:
   ```
   Type: CNAME
   Name: www
   Target: your-origin-server.com
   Proxy: Enabled
   ```

3. **Page Rules**:
   ```
   Pattern: *your-domain.com/assets/*
   Settings: Cache Level = Cache Everything, Edge Cache TTL = 1 month
   
   Pattern: *your-domain.com/sw.js
   Settings: Cache Level = Bypass
   ```

4. **Security Settings**:
   - SSL/TLS: Full (strict)
   - Always Use HTTPS: On
   - HSTS: Enabled
   - Security Level: Medium

### AWS CloudFront

Create CloudFront distribution:

```json
{
  "DistributionConfig": {
    "CallerReference": "interactive-musical-pendulums",
    "Comment": "Interactive Musical Pendulums CDN",
    "DefaultRootObject": "index.html",
    "Origins": [
      {
        "Id": "S3-Origin",
        "DomainName": "your-bucket.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ],
    "DefaultCacheBehavior": {
      "TargetOriginId": "S3-Origin",
      "ViewerProtocolPolicy": "redirect-to-https",
      "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"
    },
    "CacheBehaviors": [
      {
        "PathPattern": "/assets/*",
        "TargetOriginId": "S3-Origin",
        "ViewerProtocolPolicy": "redirect-to-https",
        "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6"
      },
      {
        "PathPattern": "/sw.js",
        "TargetOriginId": "S3-Origin",
        "ViewerProtocolPolicy": "redirect-to-https",
        "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"
      }
    ]
  }
}
```

---

## 🔧 Environment Variables

### Development
```bash
NODE_ENV=development
DEBUG=true
API_URL=http://localhost:3000
ANALYTICS_ID=
```

### Staging
```bash
NODE_ENV=staging
DEBUG=true
API_URL=https://staging-api.example.com
ANALYTICS_ID=GA-STAGING-ID
```

### Production
```bash
NODE_ENV=production
DEBUG=false
API_URL=https://api.example.com
ANALYTICS_ID=GA-PRODUCTION-ID
SENTRY_DSN=https://your-sentry-dsn
```

---

## 📊 Monitoring & Analytics

### Google Analytics 4

```javascript
// Add to index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Sentry Error Tracking

```javascript
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});
```

### Uptime Monitoring

Use services like:
- **Pingdom**: Basic uptime monitoring
- **UptimeRobot**: Free uptime monitoring
- **StatusPage**: Status page creation
- **Datadog**: Comprehensive monitoring

---

## 🔍 Troubleshooting

### Common Issues

#### Build Failures

**Problem**: `npm run build` fails
**Solution**: 
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Audio Not Working

**Problem**: Audio doesn't play on deployed site
**Solution**: Ensure HTTPS deployment (required for Web Audio API)

#### Service Worker Issues

**Problem**: Service worker not updating
**Solution**:
```bash
# Clear browser cache
# Update cache version in sw.js
# Force reload with Ctrl+F5
```

#### CORS Errors

**Problem**: CORS errors when loading assets
**Solution**: Configure proper CORS headers:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

### Performance Issues

#### Slow Loading

1. **Enable Compression**: Gzip/Brotli
2. **Optimize Images**: Use WebP format
3. **CDN**: Use CDN for static assets
4. **Lazy Loading**: Implement lazy loading

#### High Memory Usage

1. **Check Pendulum Limit**: Ensure max 5 pendulums
2. **Audio Cleanup**: Verify audio nodes are disposed
3. **Trace Length**: Limit pendulum trace length

### Deployment Checklist

- [ ] Build completes without errors
- [ ] All assets load correctly
- [ ] Audio functionality works
- [ ] Recording features work
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] CDN configured (if applicable)
- [ ] Monitoring set up
- [ ] Analytics configured
- [ ] Performance optimized

---

## 📞 Support

For deployment issues:

1. **Check Documentation**: Review this guide thoroughly
2. **GitHub Issues**: [Create an issue](https://github.com/your-username/interactive-musical-pendulums/issues)
3. **Community**: Join our Discord community
4. **Email**: deployment-help@example.com

---

**Happy Deploying! 🚀**