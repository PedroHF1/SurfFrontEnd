"use client"

import GoogleMapComponent from "@/components/MapComponent"
import { useState } from "react"
import { SlidingPanel } from "./_components/Beach/SlidePanel"
import { useQuery } from "@tanstack/react-query"
import { getForecast } from "@/services/forecast"
import { forecastExample } from "@/fixtures/forecast_example"
import { Beach } from "@/interfaces/forecast"

export default function Forecast() {
  const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCondition, setFilterCondition] = useState<string>("all")
  const [isPanelExpanded, setIsPanelExpanded] = useState(false)

  const {data = forecastExample as any, isFetching} = useQuery({
    retry: false,
    queryKey: ['forecast'],
    queryFn: () => {},
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10
  })

  const markers = data && data.length > 0 ? data[0].forecast.map((beach: Beach) => ({
    lat: beach.lat,
    lng: beach.lng,
  })) : [{ lat: 0, lng: 0 }]

  return (
    <div className="h-screen overflow-hidden bg-card">
      <div className="h-screen" onClick={() => setIsPanelExpanded(false)}>
        <GoogleMapComponent markers={markers} />
      </div>

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
      />
    </div>
  )
}
