import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const MetricCardSkeleton = () => {
  return (
    <Card className='hover:shadow-lg transition-shadow duration-300'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <div className='h-4 w-24 bg-muted animate-pulse rounded' />
        <div className='h-4 w-4 bg-muted animate-pulse rounded' />
      </CardHeader>
      <CardContent>
        <div className='h-9 w-20 bg-muted animate-pulse rounded mb-2' />
        <div className='flex items-center gap-2 mt-2'>
          <div className='h-5 w-16 bg-muted animate-pulse rounded' />
          <div className='h-4 w-32 bg-muted animate-pulse rounded' />
        </div>
      </CardContent>
    </Card>
  );
};
