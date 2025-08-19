import axios, { AxiosError } from 'axios';
import { destroyCookie, parseCookies } from 'nookies';

export const createAxiosInstance = (path: string) => {
  const { __session: token } = parseCookies();
  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/${path}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (!token) {
        console.log('Token not found');
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  if (path === 'auth') return instance;

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        destroyCookie(null, '__session');
        if (typeof window !== 'undefined') {
          window.location.href = `/login?${error.response.status}&message=${error.response?.statusText}`;
          return;
        }
      }

      if (error.response && error.response.status === 403) {
        window.location.href = '/permission';
        return;
      }

      return Promise.reject(error);
    },
  );

  return instance;
};



export const api = createAxiosInstance('');
