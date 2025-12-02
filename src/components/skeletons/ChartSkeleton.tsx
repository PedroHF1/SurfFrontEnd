import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ChartSkeletonProps {
  title?: string;
  height?: number;
}

export const ChartSkeleton = ({ title, height = 300 }: ChartSkeletonProps) => {
  return (
    <Card>
      <CardHeader>
        {title ? (
          <div className='text-lg font-semibold text-muted-foreground/50'>{title}</div>
        ) : (
          <div className='h-6 w-48 bg-muted animate-pulse rounded' />
        )}
      </CardHeader>
      <CardContent>
        <div className='w-full bg-muted animate-pulse rounded-lg' style={{ height: `${height}px` }}>
          <div className='h-full w-full flex items-end justify-around p-8 gap-2'>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className='bg-muted-foreground/10 rounded-t w-full animate-pulse'
                style={{
                  height: `${Math.random() * 60 + 40}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
