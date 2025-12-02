import { createAxiosInstance } from './api';
import {
  DashboardStats,
  WaveForecastPoint,
  ConditionsPoint,
  RatingDistributionPoint,
} from '@/interfaces/dashboard';

const api = createAxiosInstance('dashboard');

export const getDashboardStats = async (): Promise<DashboardStats> => {
    const { data } = await api.get('/stats');
    return data;
};

interface ApiWaveForecastPoint {
  time: string;
  location: string;
  waveHeight: number;
}

const transformWaveForecastData = (apiData: ApiWaveForecastPoint[]): WaveForecastPoint[] => {
  const groupedByTime = apiData.reduce((acc, point) => {
    if (!acc[point.time]) {
      acc[point.time] = { time: point.time, locations: {} };
    }
    acc[point.time].locations[point.location] = point.waveHeight;
    return acc;
  }, {} as Record<string, { time: string; locations: Record<string, number> }>);

  return Object.values(groupedByTime).map((point) => ({
    time: point.time,
    locations: point.locations,
  }));
};

export const getWaveForecast = async (): Promise<WaveForecastPoint[]> => {
    const { data } = await api.get<ApiWaveForecastPoint[]>('/wave-forecast');
    return transformWaveForecastData(data);
};

export const getConditions = async (): Promise<ConditionsPoint[]> => {
    const { data } = await api.get('/conditions');
    return data;
};

export const getRatingDistribution = async (): Promise<RatingDistributionPoint[]> => {
    const { data } = await api.get('/rating-distribution');
    return data;
};
