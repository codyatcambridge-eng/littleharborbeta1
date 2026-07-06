/**
 * Auth middleware for Little Harbor.
 * Protects routes and redirects unauthenticated users.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

const protectedRoutes = [
  '/profile',
  '/community',
  '/messages',
  '/admin',
];

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  const { data: { session } } = await supabase.auth.getSession();

  // Check if route is protected
  const isProtected = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Redirect to auth if trying to access protected route without session
  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // Redirect to community if already logged in and trying to access auth page
  if (request.nextUrl.pathname === '/auth' && session) {
    return NextResponse.redirect(new URL('/community', request.url));
  }

  return res;
}

export const config = {
  matcher: ['/profile/:path*', '/community/:path*', '/messages/:path*', '/admin/:path*', '/auth'],
};
