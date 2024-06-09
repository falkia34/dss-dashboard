import { Auth } from '@/config/auth';
import { NextResponse } from 'next/server';

export default Auth.auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== '/login') {
    const callbackUrl = encodeURIComponent(req.nextUrl.toString());

    return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, req.nextUrl.origin));
  }
});

export const config = {
  matcher: ['/((?!auth|login|logout|_next/static|_next/image|favicon.ico).*)'],
};
