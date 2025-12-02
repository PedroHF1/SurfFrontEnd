export interface DashboardStats {
  avgWaveHeight: number;
  avgWaveHeightChange: number;
  peakWaveHeight: number;
  peakWaveHeightChange: number;
  bestRating: number;
  lowWindHoursPercent: number;
  optimalConditionsHours: number;
  excellentConditionsPercent: number;
}

export interface WaveForecastPoint {
  time: string;
  locations: {
    [key: string]: number;
  };
}

export interface ConditionsPoint {
  time: string;
  windSpeed: number;
  swellHeight: number;
}

export interface RatingDistributionPoint {
  location: string;
  ratings: {
    [key: string]: number;
  };
}

export interface DashboardApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
