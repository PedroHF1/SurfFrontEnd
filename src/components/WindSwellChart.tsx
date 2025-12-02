'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getWindSwellData } from '@/services/mockSurfData';
import { getConditions } from '@/services/dashboard';
import { useEffect, useState } from 'react';
import { ConditionsPoint } from '@/interfaces/dashboard';
import { ChartSkeleton } from '@/components/skeletons/ChartSkeleton';
import moment from 'moment';
import { generateColor } from '@/constants/dashboardColors';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';

const chartLabels: Record<string, string> = {
  windSpeed: 'Velocidade do Vento',
  swellHeight: 'Altura do Swell',
};

const chartConfig = Object.entries(chartLabels).reduce((config, [key, label], index) => {
  config[key] = {
    label: label,
    color: generateColor(index + 2),
  };
  return config;
}, {} as Record<string, { label: string; color: string }>);

export const WindSwellChart = () => {
  const [data, setData] = useState<ConditionsPoint[]>(getWindSwellData());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const apiData = await getConditions();
        setData(apiData);
      } catch (error) {
        console.error('Failed to fetch conditions, using mock data:', error);
        setData(getWindSwellData());
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log('datawind', data);

  if (isLoading) {
    return <ChartSkeleton title='Condições de Vento e Swell' />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Condições de Vento e Swell</CardTitle>
        <CardDescription>
          Mostrando condições de vento e swell para os próximos 7 dias
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='aspect-auto h-[250px] w-full'>
          <AreaChart data={data}>
            <defs>
              {Object.keys(chartConfig).map((key, index) => (
                <linearGradient
                  key={key}
                  id={`fill${key.replace(/\s+/g, '')}`}
                  x1='0'
                  y1='0'
                  x2='0'
                  y2='1'
                >
                  <stop offset='5%' stopColor={generateColor(index + 2)} stopOpacity={0.8} />
                  <stop offset='95%' stopColor={generateColor(index + 2)} stopOpacity={0.1} />
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
                value: 'Velocidade do Vento (m/s)',
                angle: -90,
                position: 'insideLeft',
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className='[&>div:last-child]:space-x-4'
                  labelFormatter={(value) => {
                    return moment(value).format('MMM DD, YYYY');
                  }}
                  indicator='dot'
                />
              }
            />
            <Legend />
            {Object.keys(chartConfig).map((key, index) => (
              <Area
                key={key}
                dataKey={key}
                type='natural'
                fill={`url(#fill${key.replace(/\s+/g, '')})`}
                stroke={generateColor(index + 2)}
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
