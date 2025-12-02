export interface SurfForecastPoint {
  time: string;
  lat: number;
  lng: number;
  name: string;
  position: string;
  rating: number;
  swellDirection: number;
  swellHeight: number;
  swellPeriod: number;
  waveDirection: number;
  waveHeight: number;
  windDirection: number;
  windSpeed: number;
}

export interface TimeSlot {
  time: string;
  forecast: SurfForecastPoint[];
}

export interface SurfMetricCard {
  title: string;
  value: string;
  change: number;
  description: string;
  icon?: string;
}

export interface LocationStats {
  location: string;
  avgWaveHeight: number;
  maxWaveHeight: number;
  avgRating: number;
  bestRating: number;
  optimalWindHours: number;
}

export const surfForecastData: TimeSlot[] = [
  {
    time: "2025-11-17T23:00:00+00:00",
    forecast: [
      {
        lat: -23.000372,
        lng: -43.365894,
        name: "Miami",
        position: "north",
        rating: 3,
        swellDirection: 173.11,
        swellHeight: 0.41,
        swellPeriod: 14.99,
        time: "2025-11-17T23:00:00+00:00",
        waveDirection: 173.44,
        waveHeight: 0.57,
        windDirection: 280.92,
        windSpeed: 1.13,
      },
      {
        lat: -22.818795,
        lng: -43.196777,
        name: "Celso Ramos",
        position: "south",
        rating: 3,
        swellDirection: 173.11,
        swellHeight: 0.41,
        swellPeriod: 14.99,
        time: "2025-11-17T23:00:00+00:00",
        waveDirection: 173.44,
        waveHeight: 0.57,
        windDirection: 311.93,
        windSpeed: 2.82,
      },
    ],
  },
  {
    time: "2025-11-18T00:00:00+00:00",
    forecast: [
      {
        lat: -23.000372,
        lng: -43.365894,
        name: "Miami",
        position: "north",
        rating: 3,
        swellDirection: 173.02,
        swellHeight: 0.44,
        swellPeriod: 14.75,
        time: "2025-11-18T00:00:00+00:00",
        waveDirection: 173.5,
        waveHeight: 0.58,
        windDirection: 247.46,
        windSpeed: 0.61,
      },
      {
        lat: -22.818795,
        lng: -43.196777,
        name: "Celso Ramos",
        position: "south",
        rating: 3,
        swellDirection: 173.02,
        swellHeight: 0.44,
        swellPeriod: 14.75,
        time: "2025-11-18T00:00:00+00:00",
        waveDirection: 173.5,
        waveHeight: 0.58,
        windDirection: 297.6,
        windSpeed: 1.61,
      },
    ],
  },
  {
    time: "2025-11-18T06:00:00+00:00",
    forecast: [
      {
        lat: -23.000372,
        lng: -43.365894,
        name: "Miami",
        position: "north",
        rating: 3,
        swellDirection: 174.42,
        swellHeight: 0.49,
        swellPeriod: 13.56,
        time: "2025-11-18T06:00:00+00:00",
        waveDirection: 174.2,
        waveHeight: 0.6,
        windDirection: 19.15,
        windSpeed: 0.81,
      },
      {
        lat: -22.818795,
        lng: -43.196777,
        name: "Celso Ramos",
        position: "south",
        rating: 3,
        swellDirection: 174.42,
        swellHeight: 0.49,
        swellPeriod: 13.56,
        time: "2025-11-18T06:00:00+00:00",
        waveDirection: 174.2,
        waveHeight: 0.6,
        windDirection: 7.13,
        windSpeed: 0.61,
      },
    ],
  },
  {
    time: "2025-11-18T12:00:00+00:00",
    forecast: [
      {
        lat: -23.000372,
        lng: -43.365894,
        name: "Miami",
        position: "north",
        rating: 2,
        swellDirection: 175.51,
        swellHeight: 0.42,
        swellPeriod: 12.61,
        time: "2025-11-18T12:00:00+00:00",
        waveDirection: 175.45,
        waveHeight: 0.56,
        windDirection: 148.98,
        windSpeed: 0.82,
      },
      {
        lat: -22.818795,
        lng: -43.196777,
        name: "Celso Ramos",
        position: "south",
        rating: 2,
        swellDirection: 175.51,
        swellHeight: 0.42,
        swellPeriod: 12.61,
        time: "2025-11-18T12:00:00+00:00",
        waveDirection: 175.45,
        waveHeight: 0.56,
        windDirection: 133.01,
        windSpeed: 2.86,
      },
    ],
  },
  {
    time: "2025-11-18T18:00:00+00:00",
    forecast: [
      {
        lat: -22.818795,
        lng: -43.196777,
        name: "Celso Ramos",
        position: "south",
        rating: 3,
        swellDirection: 177.01,
        swellHeight: 0.37,
        swellPeriod: 11.98,
        time: "2025-11-18T18:00:00+00:00",
        waveDirection: 177.12,
        waveHeight: 0.55,
        windDirection: 100.76,
        windSpeed: 6.42,
      },
      {
        lat: -23.000372,
        lng: -43.365894,
        name: "Miami",
        position: "north",
        rating: 2,
        swellDirection: 177.01,
        swellHeight: 0.37,
        swellPeriod: 11.98,
        time: "2025-11-18T18:00:00+00:00",
        waveDirection: 177.12,
        waveHeight: 0.55,
        windDirection: 145,
        windSpeed: 2.4,
      },
    ],
  },
  {
    time: "2025-11-19T06:00:00+00:00",
    forecast: [
      {
        lat: -23.000372,
        lng: -43.365894,
        name: "Miami",
        position: "north",
        rating: 3,
        swellDirection: 183.38,
        swellHeight: 0.75,
        swellPeriod: 11.43,
        time: "2025-11-19T06:00:00+00:00",
        waveDirection: 184.52,
        waveHeight: 0.92,
        windDirection: 319.21,
        windSpeed: 1.57,
      },
      {
        lat: -22.818795,
        lng: -43.196777,
        name: "Celso Ramos",
        position: "south",
        rating: 3,
        swellDirection: 183.38,
        swellHeight: 0.75,
        swellPeriod: 11.43,
        time: "2025-11-19T06:00:00+00:00",
        waveDirection: 184.52,
        waveHeight: 0.92,
        windDirection: 247.17,
        windSpeed: 4.41,
      },
    ],
  },
  {
    time: "2025-11-19T12:00:00+00:00",
    forecast: [
      {
        lat: -23.000372,
        lng: -43.365894,
        name: "Miami",
        position: "north",
        rating: 3,
        swellDirection: 181.75,
        swellHeight: 0.87,
        swellPeriod: 10.91,
        time: "2025-11-19T12:00:00+00:00",
        waveDirection: 181.49,
        waveHeight: 1.39,
        windDirection: 225.54,
        windSpeed: 5.52,
      },
      {
        lat: -22.818795,
        lng: -43.196777,
        name: "Celso Ramos",
        position: "south",
        rating: 3,
        swellDirection: 181.75,
        swellHeight: 0.87,
        swellPeriod: 10.91,
        time: "2025-11-19T12:00:00+00:00",
        waveDirection: 181.49,
        waveHeight: 1.39,
        windDirection: 235.89,
        windSpeed: 8.92,
      },
    ],
  },
  {
    time: "2025-11-19T18:00:00+00:00",
    forecast: [
      {
        lat: -23.000372,
        lng: -43.365894,
        name: "Miami",
        position: "north",
        rating: 2,
        swellDirection: 113.65,
        swellHeight: 0.16,
        swellPeriod: 7.35,
        time: "2025-11-19T18:00:00+00:00",
        waveDirection: 180.83,
        waveHeight: 1.52,
        windDirection: 205.93,
        windSpeed: 4.93,
      },
      {
        lat: -22.818795,
        lng: -43.196777,
        name: "Celso Ramos",
        position: "south",
        rating: 2,
        swellDirection: 113.65,
        swellHeight: 0.16,
        swellPeriod: 7.35,
        time: "2025-11-19T18:00:00+00:00",
        waveDirection: 180.83,
        waveHeight: 1.52,
        windDirection: 222.48,
        windSpeed: 7.5,
      },
    ],
  },
  {
    time: "2025-11-20T06:00:00+00:00",
    forecast: [
      {
        lat: -23.000372,
        lng: -43.365894,
        name: "Miami",
        position: "north",
        rating: 2,
        swellDirection: 185.54,
        swellHeight: 0.97,
        swellPeriod: 7.4,
        time: "2025-11-20T06:00:00+00:00",
        waveDirection: 179.74,
        waveHeight: 1.22,
        windDirection: 268.95,
        windSpeed: 2.08,
      },
      {
        lat: -22.818795,
        lng: -43.196777,
        name: "Celso Ramos",
        position: "south",
        rating: 2,
        swellDirection: 185.54,
        swellHeight: 0.97,
        swellPeriod: 7.4,
        time: "2025-11-20T06:00:00+00:00",
        waveDirection: 179.74,
        waveHeight: 1.22,
        windDirection: 279.61,
        windSpeed: 4.08,
      },
    ],
  },
  {
    time: "2025-11-20T12:00:00+00:00",
    forecast: [
      {
        lat: -23.000372,
        lng: -43.365894,
        name: "Miami",
        position: "north",
        rating: 2,
        swellDirection: 179.72,
        swellHeight: 1.21,
        swellPeriod: 9.19,
        time: "2025-11-20T12:00:00+00:00",
        waveDirection: 178.8,
        waveHeight: 1.24,
        windDirection: 174.08,
        windSpeed: 2.98,
      },
      {
        lat: -22.818795,
        lng: -43.196777,
        name: "Celso Ramos",
        position: "south",
        rating: 2,
        swellDirection: 179.72,
        swellHeight: 1.21,
        swellPeriod: 9.19,
        time: "2025-11-20T12:00:00+00:00",
        waveDirection: 178.8,
        waveHeight: 1.24,
        windDirection: 183.89,
        windSpeed: 5.05,
      },
    ],
  },
  {
    time: "2025-11-21T06:00:00+00:00",
    forecast: [
      {
        lat: -23.000372,
        lng: -43.365894,
        name: "Miami",
        position: "north",
        rating: 4,
        swellDirection: 177.19,
        swellHeight: 1.83,
        swellPeriod: 15.26,
        time: "2025-11-21T06:00:00+00:00",
        waveDirection: 176.45,
        waveHeight: 1.83,
        windDirection: 24.16,
        windSpeed: 1.52,
      },
      {
        lat: -22.818795,
        lng: -43.196777,
        name: "Celso Ramos",
        position: "south",
        rating: 4,
        swellDirection: 177.19,
        swellHeight: 1.83,
        swellPeriod: 15.26,
        time: "2025-11-21T06:00:00+00:00",
        waveDirection: 176.45,
        waveHeight: 1.83,
        windDirection: 50.19,
        windSpeed: 3.32,
      },
    ],
  },
  {
    time: "2025-11-21T12:00:00+00:00",
    forecast: [
      {
        lat: -23.000372,
        lng: -43.365894,
        name: "Miami",
        position: "north",
        rating: 4,
        swellDirection: 176.97,
        swellHeight: 1.81,
        swellPeriod: 14.24,
        time: "2025-11-21T12:00:00+00:00",
        waveDirection: 176.85,
        waveHeight: 1.81,
        windDirection: 84.61,
        windSpeed: 1.26,
      },
      {
        lat: -22.818795,
        lng: -43.196777,
        name: "Celso Ramos",
        position: "south",
        rating: 4,
        swellDirection: 176.97,
        swellHeight: 1.81,
        swellPeriod: 14.24,
        time: "2025-11-21T12:00:00+00:00",
        waveDirection: 176.85,
        waveHeight: 1.81,
        windDirection: 98.58,
        windSpeed: 2.56,
      },
    ],
  },
];

export function calculateLocationStats(): LocationStats[] {
  const locations = ["Miami", "Celso Ramos"];

  return locations.map((location) => {
    const locationData = surfForecastData.flatMap((slot) =>
      slot.forecast.filter((f) => f.name === location)
    );

    const waveHeights = locationData.map((d) => d.waveHeight);
    const ratings = locationData.map((d) => d.rating);
    const optimalWind = locationData.filter(
      (d) => d.windSpeed < 3 && d.rating >= 3
    ).length;

    return {
      location,
      avgWaveHeight:
        waveHeights.reduce((a, b) => a + b, 0) / waveHeights.length,
      maxWaveHeight: Math.max(...waveHeights),
      avgRating: ratings.reduce((a, b) => a + b, 0) / ratings.length,
      bestRating: Math.max(...ratings),
      optimalWindHours: optimalWind,
    };
  });
}

export function getSurfMetrics(): SurfMetricCard[] {
  const stats = calculateLocationStats();
  const miamiStats = stats.find((s) => s.location === "Miami")!;
  const celsoStats = stats.find((s) => s.location === "Celso Ramos")!;

  return [
    {
      title: "Avg Wave Height",
      value: `${miamiStats.avgWaveHeight.toFixed(2)}m`,
      change: 12.5,
      description: "Miami Beach Average",
    },
    {
      title: "Peak Wave Height",
      value: `${Math.max(miamiStats.maxWaveHeight, celsoStats.maxWaveHeight).toFixed(2)}m`,
      change: 8.3,
      description: "Maximum Expected",
    },
    {
      title: "Best Rating",
      value: `${miamiStats.bestRating}/4`,
      change: 0,
      description: "Excellent Conditions",
    },
    {
      title: "Optimal Conditions",
      value: `${miamiStats.optimalWindHours + celsoStats.optimalWindHours}h`,
      change: 15.2,
      description: "Low Wind Hours",
    },
  ];
}

export function getRatingDistribution() {
  const ratings = [1, 2, 3, 4];
  const locations = ["Miami", "Celso Ramos"];

  return ratings.map((rating) => {
    const data: Record<string, number | string> = { rating: `${rating}★` };

    locations.forEach((location) => {
      const count = surfForecastData.flatMap((slot) =>
        slot.forecast.filter((f) => f.name === location && f.rating === rating)
      ).length;
      data[location] = count;
    });

    return data;
  });
}

export function getWaveHeightData() {
  return surfForecastData.map((slot) => {
    const miamiData = slot.forecast.find((f) => f.name === "Miami");
    const celsoData = slot.forecast.find((f) => f.name === "Celso Ramos");

    return {
      time: slot.time,
      locations: {
        Miami: miamiData?.waveHeight || 0,
        "Celso Ramos": celsoData?.waveHeight || 0,
      },
    };
  });
}

export function getWindSwellData() {
  return surfForecastData.map((slot) => {
    const miamiData = slot.forecast.find((f) => f.name === "Miami");

    return {
      time: slot.time,
      windSpeed: miamiData?.windSpeed || 0,
      swellHeight: miamiData?.swellHeight || 0,
    };
  });
}
