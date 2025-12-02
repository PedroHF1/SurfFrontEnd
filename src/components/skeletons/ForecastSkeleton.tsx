import { Skeleton } from '@/components/ui/skeleton';

export const ForecastSkeleton = () => {
  return (
    <div
      className='fixed left-0 right-0 bg-background backdrop-blur-sm border-t transition-all duration-300 ease-in-out z-40 -bottom-[250px]'
      style={{
        height: '50vh',
      }}
    >
      <div className='border-b bg-card/50 backdrop-blur-sm'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between mb-4'>
            <Skeleton className='h-8 w-32' />
            <div className='flex items-center gap-2'>
              <Skeleton className='h-9 w-9 rounded-full' />
              <Skeleton className='h-9 w-9 rounded-full' />
              <Skeleton className='h-9 w-9 rounded-full' />
            </div>
          </div>

          <Skeleton className='h-10 w-full rounded-lg' />

          <div className='flex gap-2 mt-4 overflow-hidden'>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className='h-16 w-20 rounded-lg flex-shrink-0' />
            ))}
          </div>
        </div>
      </div>

      <main className='container mx-auto px-4 py-6 overflow-y-auto no-scrollbar h-[60vh]'>
        <div className='flex items-center justify-between mb-6'>
          <Skeleton className='h-6 w-40' />
          <Skeleton className='h-9 w-32 rounded-lg' />
        </div>

        <div className='space-y-4'>
          {[...Array(3)].map((_, i) => (
            <div key={i} className='bg-card rounded-xl border border-border p-4 shadow-sm'>
              <div className='flex items-start justify-between mb-3'>
                <div className='flex-1'>
                  <Skeleton className='h-6 w-48 mb-2' />
                  <Skeleton className='h-4 w-24' />
                </div>
                <Skeleton className='h-12 w-12 rounded-lg' />
              </div>

              <div className='grid grid-cols-3 gap-3 mt-4'>
                {[...Array(3)].map((_, j) => (
                  <div key={j} className='space-y-2'>
                    <Skeleton className='h-3 w-16' />
                    <Skeleton className='h-5 w-20' />
                  </div>
                ))}
              </div>

              <div className='flex items-center gap-2 mt-4 pt-3 border-t border-border'>
                <Skeleton className='h-4 w-4 rounded-full' />
                <Skeleton className='h-4 w-32' />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
