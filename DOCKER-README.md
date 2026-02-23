# Cosmicstar CMS - Docker Setup

## Quick Start

```bash
# Start all services (Supabase + Next.js)
./scripts/start.sh

# Or using npm
npm run docker:start
```

## Services

| Service | URL | Description |
|---------|-----|-------------|
| Next.js App | http://localhost:3000 | Main website |
| Supabase API | http://localhost:8000 | REST/Auth API |
| Supabase Studio | http://localhost:3001 | Database admin UI |
| PostgreSQL | localhost:5432 | Database |

## Commands

```bash
# Start all services
npm run docker:start

# Stop all services
npm run docker:stop

# View logs
npm run docker:logs

# Rebuild containers
npm run docker:build

# Reset database (WARNING: deletes all data)
npm run docker:reset
```

## Default Credentials

- **Admin Email:** admin@cosmicstar.com
- **Database Password:** See `.env` file

## Production Deployment

Before deploying to production, you MUST change these in `.env`:

1. `POSTGRES_PASSWORD` - Use a strong, unique password
2. `JWT_SECRET` - Generate with: `openssl rand -base64 32`
3. `ANON_KEY` and `SERVICE_ROLE_KEY` - Generate new keys
4. `API_EXTERNAL_URL` - Your domain URL
5. `SITE_URL` - Your website URL

### Generate New API Keys

Visit: https://supabase.com/docs/guides/self-hosting#api-keys

Or use this tool to generate keys based on your JWT_SECRET.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Docker Network                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────┐   │
│  │ Next.js  │───►│   Kong   │───►│    Supabase      │   │
│  │   App    │    │  (API    │    │    Services      │   │
│  │  :3000   │    │ Gateway) │    │                  │   │
│  └──────────┘    │  :8000   │    │  ┌────────────┐  │   │
│                  └──────────┘    │  │   Auth     │  │   │
│                                  │  │   REST     │  │   │
│  ┌──────────┐                    │  │  Storage   │  │   │
│  │ Studio   │                    │  │  Realtime  │  │   │
│  │  :3001   │                    │  └────────────┘  │   │
│  └──────────┘                    │        │         │   │
│                                  │        ▼         │   │
│                                  │  ┌────────────┐  │   │
│                                  │  │ PostgreSQL │  │   │
│                                  │  │   :5432    │  │   │
│                                  │  └────────────┘  │   │
│                                  └──────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Volumes

- `db-data` - PostgreSQL data
- `storage-data` - Uploaded files

## Troubleshooting

### Services not starting
```bash
docker-compose logs -f
```

### Database connection issues
```bash
docker-compose exec db psql -U postgres
```

### Reset everything
```bash
npm run docker:reset
```
