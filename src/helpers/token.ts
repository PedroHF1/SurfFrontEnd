import { AuthContextUser } from '@/context/auth/props';
import { jwtDecode } from 'jwt-decode';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

export const createToken = (token : string ): void => {
  setCookie(null, '__session', token, {
    maxAge:  60 * 60 * 23, // 23 horas
    path: '/',
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
};

export const getToken = (): string => {
  const { __session: token } = parseCookies();
  return token;
};

export const deleteToken = (): void => {
  destroyCookie(null, '__session');
  return;
};

export const validToken = (t?: string) => {
  const token = t || getToken();
  jwtDecode<AuthContextUser>(token);
};

export const getIdFromToken = (): string | null => {
  const { __session: token } = parseCookies(); 
  if (!token) {
    console.error('No token found');
    return null;
  }

  try {
    const decodedToken = jwtDecode<AuthContextUser>(token);
    return decodedToken?.id || null; 
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
