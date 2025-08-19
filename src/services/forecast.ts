import { createAxiosInstance } from "./api";

const api = createAxiosInstance('forecast')

export const getForecast = async () => {
  const {data} = await api.get('');
  return data;
}
