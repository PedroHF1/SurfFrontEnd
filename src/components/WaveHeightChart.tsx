'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Line,
  LineChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from 'recharts';
import { getWaveHeightData } from '@/services/mockSurfData';
import { getWaveForecast } from '@/services/dashboard';
import { useEffect, useState } from 'react';
import { WaveForecastPoint } from '@/interfaces/dashboard';
import { ChartSkeleton } from '@/components/skeletons/ChartSkeleton';
import moment from 'moment';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';
import { dashboardColors, generateColor } from '@/constants/dashboardColors';

const chartLabels: Record<string, string> = {
  waveHeight: 'Altura das Ondas',
};

const chartConfig = Object.entries(chartLabels).reduce((config, [key, label], index) => {
  config[key] = {
    label: label,
    color: generateColor(index),
  };
  return config;
}, {} as Record<string, { label: string; color: string }>);

export const WaveHeightChart = () => {
  const [data, setData] = useState<WaveForecastPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const apiData = await getWaveForecast();
        setData(apiData);
      } catch (error) {
        console.error('Failed to fetch wave forecast, using mock data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <ChartSkeleton title='Previsão de Altura das Ondas' />;
  }

  const chartData = data.map((point) => ({
    time: point.time,
    ...point.locations,
  }));

  const locationNames = data.length > 0 ? Object.keys(data[0].locations) : [];

  console.log('data', data);
  console.log('chartData', chartData);
  console.log('locationNames', locationNames);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Previsão de Altura das Ondas</CardTitle>
        <CardDescription>Mostrando altura das ondas para os próximos 7 dias</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='aspect-auto h-[250px] w-full'>
          <AreaChart data={chartData}>
            <defs>
              {locationNames.map((location, index) => (
                <linearGradient
                  key={location}
                  id={`fill${location.replace(/\s+/g, '')}`}
                  x1='0'
                  y1='0'
                  x2='0'
                  y2='1'
                >
                  <stop offset='5%' stopColor={generateColor(index)} stopOpacity={0.8} />
                  <stop offset='95%' stopColor={generateColor(index)} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='time'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return moment(value).format('MMM DD');
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{
                value: 'Altura das Ondas (m)',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className='[&>div:last-child]:space-x-8'
                  labelFormatter={(value) => {
                    return moment(value).format('MMM DD, YYYY');
                  }}
                  indicator='dot'
                />
              }
            />
            <Legend />
            {locationNames.map((location, index) => (
              <Area
                key={location}
                dataKey={location}
                type='natural'
                fill={`url(#fill${location.replace(/\s+/g, '')})`}
                stroke={generateColor(index)}
                stackId='a'
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
