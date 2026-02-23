# DevOps Plan: Cosmicstar CMS on Digital Ocean

## Project Health Check Summary

### Build Status: PASSING
- Next.js 14.2.18 builds successfully
- TypeScript compilation: No errors
- Output: Standalone mode (Docker-optimized)

### Pending Issues to Fix

| Priority | Issue | File | Action |
|----------|-------|------|--------|
| **HIGH** | Demo JWT keys in use | `.env.local` | Generate production keys |
| **HIGH** | No CI/CD pipeline | - | Create GitHub Actions |
| **MEDIUM** | ESLint error | `app/page.tsx:145` | Escape apostrophe |
| **LOW** | Using `<img>` tags | Multiple files | Consider Next.js `<Image />` |
| **LOW** | Manual CSS imports | `app/layout.tsx` | Consider Next.js CSS handling |

### Missing Infrastructure
- No automated tests (Jest/Vitest)
- No GitHub Actions CI/CD
- No production environment configs
- No health check endpoints

---

## Recommended Architecture for Digital Ocean

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DIGITAL OCEAN                                │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                     Droplet (Ubuntu 24.04)                     │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │                    Docker Compose                        │  │  │
│  │  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │  │  │
│  │  │  │ Next.js │  │  Kong   │  │Supabase │  │Postgres │    │  │  │
│  │  │  │   App   │──│ Gateway │──│Services │──│   DB    │    │  │  │
│  │  │  │ :3002   │  │ :8000   │  │         │  │ :5432   │    │  │  │
│  │  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  │                            │                                    │  │
│  │  ┌─────────────────────────┴───────────────────────────────┐  │  │
│  │  │              Nginx Reverse Proxy + SSL                   │  │  │
│  │  │              (Let's Encrypt / Certbot)                   │  │  │
│  │  │                      :443 / :80                          │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                │                                     │
│  ┌─────────────────────────────┴───────────────────────────────┐    │
│  │                    Digital Ocean Firewall                    │    │
│  │              Allow: 80, 443, 22 (SSH restricted)            │    │
│  └─────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        CI/CD PIPELINE                                │
│  ┌─────────┐    ┌──────────┐    ┌──────────┐    ┌──────────────┐   │
│  │ GitHub  │───▶│  Build   │───▶│   Test   │───▶│    Deploy    │   │
│  │  Push   │    │  Docker  │    │   Lint   │    │  to Droplet  │   │
│  └─────────┘    └──────────┘    └──────────┘    └──────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Option A: Single Droplet (Recommended for MVP)

**Best for:** Starting out, budget-conscious, simpler management

### Specs
- **Droplet**: Basic ($24/mo) - 4GB RAM, 2 vCPUs, 80GB SSD
- **Region**: BLR1 (Bangalore) or SGP1 (Singapore) for India
- **OS**: Ubuntu 24.04 LTS

### Components on Single Server
- Docker + Docker Compose
- Nginx (reverse proxy + SSL)
- All services from docker-compose.yml

### Monthly Cost: ~$24-48

---

## Option B: Managed Services (Production-Grade)

**Best for:** Scaling, high availability, less maintenance

### Architecture
| Service | Digital Ocean Product | Monthly Cost |
|---------|----------------------|--------------|
| App Hosting | App Platform (Basic) | $12 |
| Database | Managed PostgreSQL | $15 |
| Storage | Spaces (Object Storage) | $5 |
| CDN | Spaces CDN | Included |

### Alternative: Use Supabase Cloud
- Replace self-hosted Supabase with managed Supabase
- Free tier: 500MB database, 1GB storage
- Pro: $25/mo for production features

### Monthly Cost: ~$32-50

---

## Recommended Solution: Option A with CI/CD

For your use case, I recommend **Option A** (single Droplet) because:
1. You're self-hosting Supabase (already configured in docker-compose)
2. Lower cost for starting out
3. Full control over the stack
4. Easy to migrate to managed services later

---

## CI/CD Pipeline: GitHub Actions

### Workflow Overview
```
Push to main → Build & Lint → Build Docker Image → Deploy to Droplet
```

### Files to Create:
1. `.github/workflows/deploy.yml` - Main deployment workflow
2. `.github/workflows/pr-check.yml` - PR validation
3. `scripts/deploy.sh` - Server-side deployment script

---

## Implementation Steps

### Phase 1: Prepare Codebase (Before Hosting)
- [ ] Fix ESLint error in `app/page.tsx:145`
- [ ] Create `.env.production.example` template
- [ ] Add health check API endpoint
- [ ] Create `.eslintrc.json` (done)
- [ ] Create GitHub Actions workflows

### Phase 2: Server Setup (Digital Ocean)
- [ ] Create Droplet (Ubuntu 24.04)
- [ ] Configure firewall (UFW)
- [ ] Install Docker & Docker Compose
- [ ] Install Nginx & Certbot
- [ ] Create deployment user with SSH key
- [ ] Clone repository
- [ ] Configure production `.env`
- [ ] Generate production JWT keys
- [ ] Start services with docker-compose

### Phase 3: Domain & SSL
- [ ] Point domain DNS to Droplet IP
- [ ] Configure Nginx reverse proxy
- [ ] Setup SSL with Let's Encrypt
- [ ] Configure automatic SSL renewal

### Phase 4: CI/CD Setup
- [ ] Add GitHub Secrets (SSH key, server IP, etc.)
- [ ] Create deployment workflows
- [ ] Test automatic deployment
- [ ] Setup deployment notifications (optional)

### Phase 5: Monitoring & Backup
- [ ] Setup automated database backups
- [ ] Configure log rotation
- [ ] Add uptime monitoring (UptimeRobot - free)
- [ ] Setup error tracking (Sentry - free tier)

---

## Production Environment Variables

Generate these for production:

```bash
# Generate secure secrets
openssl rand -base64 32  # For JWT_SECRET
openssl rand -base64 32  # For POSTGRES_PASSWORD

# Then generate ANON_KEY and SERVICE_ROLE_KEY from JWT_SECRET
# Use: https://supabase.com/docs/guides/self-hosting#api-keys
```

### Required Production Variables
```env
# Database
POSTGRES_PASSWORD=<generate-strong-password>

# JWT (generate new keys!)
JWT_SECRET=<generate-32-char-secret>
ANON_KEY=<generate-from-jwt-secret>
SERVICE_ROLE_KEY=<generate-from-jwt-secret>

# URLs (update to your domain)
API_EXTERNAL_URL=https://api.yourdomain.com
SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SUPABASE_URL=https://api.yourdomain.com

# SMTP (for email features)
SMTP_HOST=smtp.yourmailprovider.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
```

---

## GitHub Secrets Required

Add these to your GitHub repository (Settings → Secrets):

| Secret Name | Description |
|-------------|-------------|
| `DROPLET_HOST` | Your Droplet IP address |
| `DROPLET_USER` | SSH username (e.g., `deploy`) |
| `SSH_PRIVATE_KEY` | Private key for SSH access |
| `DOCKER_REGISTRY` | Optional: Docker Hub/GHCR credentials |

---

## Quick Start Commands

### On Digital Ocean Droplet:
```bash
# Initial setup
curl -fsSL https://get.docker.com | sh
apt install docker-compose-plugin nginx certbot python3-certbot-nginx

# Clone and setup
git clone https://github.com/yourusername/cosmicstar-cms.git /opt/cosmicstar
cd /opt/cosmicstar
cp .env.production.example .env.local
# Edit .env.local with production values

# Start services
docker compose up -d

# Setup Nginx & SSL
certbot --nginx -d yourdomain.com
```

---

## Next Steps

1. **Immediate**: Fix the ESLint error, I'll create the CI/CD files
2. **Today**: Create Digital Ocean account, spin up Droplet
3. **Setup**: Configure server, deploy manually first
4. **Automate**: Test CI/CD pipeline with a test push
5. **Go Live**: Point domain, enable SSL, launch!

---

## Cost Summary

| Component | Monthly Cost |
|-----------|--------------|
| Digital Ocean Droplet (4GB) | $24 |
| Domain (optional, yearly) | ~$1/mo |
| Backups (20% of droplet) | $4.80 |
| **Total** | **~$30/mo** |

---

## Files I'll Create

1. `.github/workflows/deploy.yml` - Auto-deploy on push to main
2. `.github/workflows/pr-check.yml` - Build & lint on PRs
3. `scripts/server-deploy.sh` - Server-side deployment script
4. `.env.production.example` - Production env template
5. `nginx/cosmicstar.conf` - Nginx configuration
6. `app/api/health/route.ts` - Health check endpoint
# Deployment test - Mon Feb 23 13:57:20 +04 2026
# Deploy test Mon Feb 23 23:24:42 +04 2026
