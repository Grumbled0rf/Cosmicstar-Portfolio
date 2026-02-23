import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Allow all requests - auth is handled client-side in admin pages
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
