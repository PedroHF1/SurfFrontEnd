import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, TrendingUp } from 'lucide-react';
import { MetricCardSkeleton } from '@/components/skeletons/MetricCardSkeleton';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  description: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export const MetricCard = ({
  title,
  value,
  change,
  description,
  icon,
  isLoading = false,
}: MetricCardProps) => {
  if (isLoading) {
    return <MetricCardSkeleton />;
  }

  const isPositive = change > 0;
  const isNegative = change < 0;

  return (
    <Card className='hover:shadow-lg transition-shadow duration-300'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium text-muted-foreground'>{title}</CardTitle>
        {icon && <div className='text-muted-foreground'>{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className='text-3xl font-bold'>{value}</div>
        <div className='flex items-center gap-2 mt-2'>
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              isPositive
                ? 'text-green-600 dark:text-green-500'
                : isNegative
                ? 'text-red-600 dark:text-red-500'
                : 'text-muted-foreground'
            }`}
          >
            {isPositive && <ArrowUp className='h-4 w-4' />}
            {isNegative && <ArrowDown className='h-4 w-4' />}
            {Math.abs(change)}%
          </div>
          <span className='text-xs text-muted-foreground'>{description}</span>
        </div>
      </CardContent>
    </Card>
  );
};
