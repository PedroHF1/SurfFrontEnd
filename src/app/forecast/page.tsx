"use client"

import GoogleMapComponent from "@/components/MapComponent"
import { useState } from "react"
import { SlidingPanel } from "./_components/Beach/SlidePanel"
import { useBeaches } from "@/hooks/useBeaches"
import { useQuery } from "@tanstack/react-query"
import { getForecast } from "@/services/forecast"

export default function Forecast() {
  const { beaches, selectedBeach, setSelectedBeach,  } = useBeaches()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCondition, setFilterCondition] = useState<string>("all")
  const [isPanelExpanded, setIsPanelExpanded] = useState(false)

  const {data, isLoading} = useQuery({
    queryKey: ['forecast'],
    queryFn: () => getForecast()
  })

  return (
    <div className="h-screen overflow-hidden bg-slate-900">


      <div className="h-screen" onClick={() => setIsPanelExpanded(false)}>
        <GoogleMapComponent latitude={-33.7969} longitude={151.2899} />
      </div>

      <SlidingPanel
        beaches={data}
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
