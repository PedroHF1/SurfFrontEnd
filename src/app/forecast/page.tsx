'use client';

import GoogleMapComponent from '@/components/MapComponent';
import { useState } from 'react';
import { SlidingPanel } from './_components/Beach/SlidePanel';
import { useQuery } from '@tanstack/react-query';
import { getForecast } from '@/services/forecast';
import { Beach } from '@/interfaces/forecast';
import { QuickGuideDialog, useQuickGuide } from './_components/QuickGuideDialog';
import { ForecastSkeleton } from '@/components/skeletons/ForecastSkeleton';

export default function Forecast() {
  const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCondition, setFilterCondition] = useState<string>('all');
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const { showGuide, closeGuide } = useQuickGuide();

  const {
    data = [],
    isFetching,
    refetch,
  } = useQuery({
    retry: false,
    queryKey: ['forecast'],
    queryFn: () => getForecast(),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
  });

  const markers =
    data && data.length > 0
      ? data[0].forecast.map((beach: Beach) => ({
          lat: beach.lat,
          lng: beach.lng,
        }))
      : [{ lat: 0, lng: 0 }];

  return (
    <div className='h-screen overflow-hidden bg-card'>
      <div className='h-screen' onClick={() => setIsPanelExpanded(false)}>
        <GoogleMapComponent markers={markers} />
      </div>
      {isFetching ? (
        <ForecastSkeleton />
      ) : (
        <>
          <SlidingPanel
            forecasts={data}
            selectedBeach={selectedBeach}
            searchTerm={searchTerm}
            filterCondition={filterCondition}
            isPanelExpanded={isPanelExpanded}
            onSearchChange={setSearchTerm}
            onFilterChange={setFilterCondition}
            onBeachSelect={setSelectedBeach}
            onBeachDeselect={() => setSelectedBeach(null)}
            onTogglePanel={() => setIsPanelExpanded(!isPanelExpanded)}
            onPanelExpand={() => setIsPanelExpanded(true)}
            refetch={refetch}
          />
          <QuickGuideDialog isOpen={showGuide && !isFetching} onClose={closeGuide} />
        </>
      )}
    </div>
  );
}
