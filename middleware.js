import { next } from '@vercel/edge';

export default function middleware(req) {
  const auth = req.headers.get('authorization');

  if (auth) {
    const [_scheme, encoded] = auth.split(' ');
    const [user, pwd] = atob(encoded).split(':');

    if (user === 'admin' && pwd === 'pitfall!') {
      return next();
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
