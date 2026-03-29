import { next } from '@vercel/edge';

export default function middleware(req) {
  const url = new URL(req.url);

  // 1. SAFETY BYPASS: Don't run middleware for static files
  if (
    url.pathname.startsWith('/assets') ||
    url.pathname.startsWith('/icons') ||
    url.pathname.includes('.')
  ) {
    return next();
  }

  const auth = req.headers.get('authorization');

  if (auth) {
    try {
      const [_scheme, encoded] = auth.split(' ');
      const [user, pwd] = atob(encoded).split(':');

      const validUser = process.env.SITE_USER || 'admin';
      const validPass = process.env.SITE_PASS || 'password123';

      if (user === validUser && pwd === validPass) {
        return next();
      }
    } catch (e) {
      console.error('Auth error:', e);
    }
  }

  return new Response('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
