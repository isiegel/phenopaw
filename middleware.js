export default function middleware(req) {
  const url = new URL(req.url);

  // 1. Asset & Icon Bypass
  if (
    url.pathname.startsWith('/assets') ||
    url.pathname.startsWith('/icons') ||
    url.pathname.startsWith('/static') ||
    url.pathname.includes('.')
  ) {
    return; // "return" in native Vercel middleware means "continue to the file"
  }

  const auth = req.headers.get('authorization');

  if (auth) {
    try {
      const authValue = auth.split(' ')[1];
      const decoded = atob(authValue);
      const [user, pwd] = decoded.split(':');

      if (user === process.env.SITE_USER && pwd === process.env.SITE_PASS) {
        return; // Success, let them in
      }
    } catch (e) {
      console.error('Auth error:', e);
    }
  }

  // 2. The Login Prompt
  return new Response('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
      'Content-Type': 'text/plain',
    },
  });
}
