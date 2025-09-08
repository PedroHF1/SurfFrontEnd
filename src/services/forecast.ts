import { Forecast } from "@/interfaces/beach";
import { createAxiosInstance } from "./api";

const api = createAxiosInstance('forecast')

export const getForecast = async (): Promise<Forecast[]> => {
  const {data} = await api.get('');
  return data;
}
