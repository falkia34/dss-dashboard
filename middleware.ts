import { Auth } from '@/config';

export default Auth.auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== '/login') {
    const newUrl = new URL('/login', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ['/((?!auth|_next/static|_next/image|favicon.ico).*)'],
};
