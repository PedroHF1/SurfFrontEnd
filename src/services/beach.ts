import { createAxiosInstance } from "./api";

const api = createAxiosInstance('beaches');

export const createBeach = async (payload: any) => {
  const {data} = await api.post('', payload);
  return data;
}
