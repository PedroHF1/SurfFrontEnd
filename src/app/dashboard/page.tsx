'use client';

import { MetricCard } from '@/components/MetricCard';
import { AudienceChart } from '@/components/AudienceChart';
import { TrafficSourcesChart } from '@/components/TrafficSourcesChart';
import { BrowserReportsTable } from '@/components/BrowserReportsTable';
import { WaveHeightChart } from '@/components/WaveHeightChart';
import { WindSwellChart } from '@/components/WindSwellChart';
import { RatingChart } from '@/components/RatingChart';
import { kpiMetrics } from '@/services/mockDashboardData';
import { getSurfMetrics } from '@/services/mockSurfData';
import { getDashboardStats } from '@/services/dashboard';
import { Activity, Clock, DollarSign, Target, Waves, Wind, TrendingUp, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DashboardStats } from '@/interfaces/dashboard';

const DashboardPage = () => {
  const analyticsIcons = [Activity, Clock, DollarSign, Target];
  const surfIcons = [Waves, TrendingUp, Star, Wind];
  const mockSurfMetrics = getSurfMetrics();

  const [surfMetrics, setSurfMetrics] = useState(mockSurfMetrics);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoadingStats(true);
        const stats = await getDashboardStats();

        setSurfMetrics([
          {
            title: 'Altura Média das Ondas',
            value: `${stats.avgWaveHeight.toFixed(2)}m`,
            change: Number(stats.avgWaveHeightChange.toFixed(2)),
            description: 'Média Entre Localizações',
          },
          {
            title: 'Pico de Altura das Ondas',
            value: `${stats.peakWaveHeight.toFixed(2)}m`,
            change: Number(stats.peakWaveHeightChange.toFixed(2)),
            description: 'Máximo Esperado',
          },
          {
            title: 'Melhor Avaliação',
            value: `${stats.bestRating}/4`,
            change: Number(stats.excellentConditionsPercent.toFixed(2)),
            description: 'Condições Excelentes',
          },
          {
            title: 'Condições Ótimas',
            value: `${stats.optimalConditionsHours}h`,
            change: Number(stats.lowWindHoursPercent.toFixed(2)),
            description: 'Horas de Vento Baixo',
          },
        ]);
      } catch (error) {
        console.error('Failed to fetch dashboard stats, using mock data:', error);
      } finally {
        setIsLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className='space-y-6 '>
      <div className='max-md:overflow-auto max-md:ml-14 max-md:min-w-[400px]'>
        <div className='mb-6'>
          <h2 className='text-2xl font-bold tracking-tight'>Previsão de Surf</h2>
          <p className='text-muted-foreground'>Condições das ondas e avaliações.</p>
        </div>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6'>
          {surfMetrics.map((metric, index) => {
            const Icon = surfIcons[index];
            return (
              <MetricCard
                key={metric.title}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                description={metric.description}
                icon={<Icon className='h-4 w-4' />}
                isLoading={isLoadingStats}
              />
            );
          })}
        </div>

        <div className='grid gap-4 lg:grid-cols-1 mb-6'>
          <WaveHeightChart />
        </div>

        <div className='grid gap-4 lg:grid-cols-2'>
          <WindSwellChart />
          <RatingChart />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
