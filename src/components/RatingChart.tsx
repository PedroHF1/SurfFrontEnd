'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';
import { getRatingDistribution } from '@/services/dashboard';
import { useEffect, useMemo, useState } from 'react';
import { RatingDistributionPoint } from '@/interfaces/dashboard';
import { ChartSkeleton } from '@/components/skeletons/ChartSkeleton';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { generateColor } from '@/constants/dashboardColors';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ratingLabels: Record<string, string> = {
  '1': 'Fraco',
  '2': 'Médio',
  '3': 'Bom',
  '4': 'Excelente',
};

const chartConfig = {
  hours: {
    label: 'Previsões',
    color: generateColor(0),
  },
};

export const RatingChart = () => {
  const [data, setData] = useState<RatingDistributionPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeLocation, setActiveLocation] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const apiData = await getRatingDistribution();
        setData(apiData);
        if (apiData.length > 0) {
          setActiveLocation(apiData[0].location);
        }
      } catch (error) {
        console.error('Failed to fetch rating distribution, using mock data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = useMemo(() => {
    const activeLocationData = data.find((d) => d.location === activeLocation);
    if (!activeLocationData) return [];

    return Object.entries(activeLocationData.ratings).map(([rating, hours]) => ({
      rating: ratingLabels[rating] || rating,
      hours,
    }));
  }, [data, activeLocation]);

  if (isLoading) {
    return <ChartSkeleton title='Distribuição de Avaliação de Surf' />;
  }

  return (
    <Card className='!gap-2'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-1'>
            <CardTitle>Distribuição de Avaliação de Surf</CardTitle>
            <CardDescription>
              Mostrando total de previsões para cada avaliação por localização
            </CardDescription>
          </div>
          <Select value={activeLocation} onValueChange={setActiveLocation}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Selecione a localização' />
            </SelectTrigger>
            <SelectContent>
              {data.map((locationData) => (
                <SelectItem key={locationData.location} value={locationData.location}>
                  {locationData.location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <ChartContainer config={chartConfig} className='aspect-auto h-[250px] w-full'>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 12,
              bottom: 12,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey='rating' tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{
                value: 'Total de previsões',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent className='w-[150px]' labelFormatter={(value) => `${value}`} />
              }
            />
            <Bar dataKey='hours' fill={generateColor(0)} radius={[8, 8, 0, 0]}>
              <LabelList
                dataKey='hours'
                position='top'
                offset={5}
                className='fill-foreground max-md:hidden'
                fontSize={12}
                formatter={(value: number | null | undefined) => (value && value > 0 ? value : '')}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
