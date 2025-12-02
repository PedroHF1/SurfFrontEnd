import { AuthContextUser } from "@/context/auth/props";
import { createAxiosInstance } from "./api";

const api = createAxiosInstance('users');

export const login = async (payload: { email: string, password: string }): Promise<AuthContextUser> => {
  const { data } = await api.post('/authenticate', payload);
  return data;
};

export const register = async (payload: { name: string, email: string, password: string }): Promise<void> => {
  const { data } = await api.post('', payload);
  return data;
};

export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  const { data } = await api.post('/forgot-password', { email });
  return data;
};

export const resetPassword = async (payload: { 
  email: string; 
  token: string; 
  password: string 
}): Promise<{ message: string }> => {
  const { data } = await api.post('/reset-password', payload);
  return data;
};
