import { jwtDecode } from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';
import { validToken } from './helpers/token';
import { AuthContextUser } from './context/auth/props';

const redirectToLogin = (req: NextRequest, error: boolean = false) =>
  NextResponse.redirect(
    new URL(
      error
        ? `/login?status=middleware&message=${encodeURIComponent('Error found in middleware.ts')}`
        : '/login',
      req.url,
    ),
  );

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const hostname = url.origin;

  const sessionCookie = req.cookies.get('__session');
  if (!sessionCookie) return redirectToLogin(req);

  const token = sessionCookie.value;
  if (!token) return redirectToLogin(req);

  try {
    validToken(token);
  } catch (error) {
    return redirectToLogin(req, true);
  }

  let payload: AuthContextUser;
  try {
    payload = jwtDecode<AuthContextUser>(token);
  } catch (error) {
    return redirectToLogin(req, true);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/',],
};
