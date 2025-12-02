import { createAxiosInstance } from './api';

const api = createAxiosInstance('users');

export interface UpdateUserData {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
}

export const updateUser = async (data: UpdateUserData) => {
  const response = await api.put('', data);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/me');
  return response.data.user;
};
