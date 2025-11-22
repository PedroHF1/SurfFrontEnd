'use client';

import { create } from 'zustand';
import { AuthContextProps, AuthContextUser } from './props';
import { createToken, deleteToken, getToken, validToken } from '@/helpers/token';
import { jwtDecode } from 'jwt-decode';
import { login, register } from '@/services/auth';
import React from 'react';
import { signIn, signOut } from 'next-auth/react';

const loadInitialState = () => {
  const token = getToken();
  if (!token) return { email: null, name: null, id: null };

  try {
    validToken(token);
    const decodedToken = jwtDecode<AuthContextUser>(token);

    return decodedToken;
  } catch (error) {
    deleteToken();
    return { email: null, name: null, id: null };
  }
};

const useAuthStore = create<AuthContextProps>((set, get) => ({
  ...loadInitialState(),

  token: getToken() || null,
  login: async (credentials) => {
    try {
      const response = await login(credentials);
      const token = response.token;

      if (!token) {
        throw new Error('No token received from server');
      }
      createToken(token);

      const decodedToken = jwtDecode<AuthContextUser>(token);
      set({
        ...decodedToken,
        token: token,
        user: decodedToken,
      });
    } catch (error) {
      deleteToken();
      set({
        token: null,
        user: null,
      });
      throw error;
    }
  },

  register: async (credentials) => {
    try {
      await register(credentials);
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    deleteToken();
    window.location.pathname = '/login';
    set({ user: null, token: null });
  },

  user: loadInitialState(),

  verifyToken: () => {
    try {
      validToken();
    } catch (error) {
      deleteToken();
      set({ user: null, token: null });
      return;
    }
  },
}));

useAuthStore.getState().verifyToken();

const AuthContext = React.createContext<AuthContextProps>(useAuthStore.getState());
const AuthContextProvider = AuthContext.Provider;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authStore = useAuthStore.getState();
  return <AuthContextProvider value={authStore}>{children}</AuthContextProvider>;
};

export const useAuth = (): AuthContextProps => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
