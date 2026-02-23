import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface HealthCheck {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  version: string;
  uptime: number;
  checks: {
    app: boolean;
    env: boolean;
  };
}

export async function GET() {
  const startTime = process.hrtime();

  const health: HealthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '0.1.0',
    uptime: process.uptime(),
    checks: {
      app: true,
      env: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    },
  };

  // Check if all checks pass
  const allHealthy = Object.values(health.checks).every(Boolean);
  health.status = allHealthy ? 'healthy' : 'unhealthy';

  const [seconds, nanoseconds] = process.hrtime(startTime);
  const responseTime = seconds * 1000 + nanoseconds / 1000000;

  return NextResponse.json(
    {
      ...health,
      responseTime: `${responseTime.toFixed(2)}ms`,
    },
    {
      status: allHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
}
