import { next } from '@vercel/edge';

export default function middleware(req) {
  const auth = req.headers.get('authorization');

  if (auth) {
    const [_scheme, encoded] = auth.split(' ');
    const [user, pwd] = atob(encoded).split(':');

    if (user === process.env.SITE_USER && pwd === process.env.SITE_PASS) {
      return next();
    }
  }

  return new Response('Auth Required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
  });
}

export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT those starting with:
     * - assets
     * - icons
     * - favicon.ico
     */
    '/((?!assets|icons|favicon.ico).*)',
  ],
};
