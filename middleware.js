import { NextResponse } from 'next/server';

export default function middleware(req) {
  const url = req.nextUrl;

  // 1. Asset Bypass (Keep this to fix your image/icon issue!)
  if (
    url.pathname.startsWith('/assets') ||
    url.pathname.startsWith('/icons') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const auth = req.headers.get('authorization');

  if (auth) {
    try {
      const authValue = auth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      if (user === process.env.SITE_USER && pwd === process.env.SITE_PASS) {
        return NextResponse.next();
      }
    } catch (e) {
      console.error('Auth error:', e);
    }
  }

  return new NextResponse('Auth Required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
  });
}
