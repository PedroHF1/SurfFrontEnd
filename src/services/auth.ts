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
