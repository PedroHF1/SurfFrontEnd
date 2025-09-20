import { Badge } from '@/components/ui/badge'
import { forecastExample } from "@/fixtures/forecast_example"
import { AddBeach, Beach, Forecast } from "@/interfaces/forecast"
import { createBeach } from "@/services/beach"
import { Filters } from "@/types/filter"
import { motion } from 'framer-motion'
import { useMemo, useState } from "react"
import { applyFilters, getActiveFiltersCount, groupBeachesByName, sortBeaches } from "../../_utils"
import { FiltersSheet } from '../Filter'
import { Header } from "../Header"
import { SortDropdown } from '../SortDropdown'
import { TimeBar } from "../TimeBar"
import { BeachList } from './BeachList'

interface SlidingPanelProps {
  forecasts?: Forecast[]
  selectedBeach: Beach | null
  searchTerm: string
  filterCondition: string
  isPanelExpanded: boolean
  onSearchChange: (value: string) => void
  onFilterChange: (value: string) => void
  onBeachSelect: (beach: Beach | null) => void
  onBeachDeselect: () => void
  onTogglePanel: () => void
  onPanelExpand: () => void
}

export function SlidingPanel({
  forecasts,
  selectedBeach,
  searchTerm,
  filterCondition,
  isPanelExpanded,
  onSearchChange,
  onFilterChange,
  onBeachSelect,
  onBeachDeselect,
  onTogglePanel,
  onPanelExpand,
}: SlidingPanelProps) {
  const [selectedTime, setSelectedTime] = useState("2025-09-08T01:00:00+00:00")
  const [sortBy, setSortBy] = useState("rating")
  const [searchQuery, setSearchQuery] = useState("")
  const times = forecastExample.map((f) => f.time)
  const selectedTimeIndex = times.indexOf(selectedTime)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    minRating: 0,
    position: "all",
    maxWind: 50,
    minSwellPeriod: 0,
    timeOfDay: [],
  })

  const processedData = useMemo(() => {
    const groupedBeaches = groupBeachesByName(forecastExample as any)

    let filteredBeaches = groupedBeaches
    if (searchQuery) {
      filteredBeaches = groupedBeaches.filter((beach) => beach.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    const filteredByConditions = applyFilters(filteredBeaches, filters, selectedTimeIndex)

    const sortedBeaches = sortBeaches(filteredByConditions, sortBy)

    return {
      beaches: sortedBeaches,
      totalCount: groupedBeaches.length,
      filteredCount: sortedBeaches.length,
      times: forecastExample.map((f) => f.time),
    }
  }, [sortBy, searchQuery, filters])

  // Re-fetch data with correct time index if it's different from 0
  // const finalData = useSurfData(selectedTimeIndex >= 0 ? selectedTimeIndex : 0, sortBy, searchQuery, filters)

  const activeFiltersCount = getActiveFiltersCount(filters)

const handleAddBeach = async (payload: AddBeach) => {
   try {
    await createBeach(payload)
   } catch (error) {
    console.error(error);
   }
  }

  return (
    <div className={`fixed left-0 right-0 bg-background backdrop-blur-sm border-t transition-all duration-300 ease-in-out z-40 ${
        isPanelExpanded ? "bottom-0 top-[170px]" : "-bottom-[250px]"
      }`}
      style={{
        height: isPanelExpanded ? "calc(100vh - 8rem)" : "50vh",
      }}
      onClick={onPanelExpand}
      >
      <Header
        beachCount={processedData.filteredCount}
        searchQuery={searchQuery}
        isPanelExpanded={isPanelExpanded}
        onSearchChange={setSearchQuery}
        onAddBeach={handleAddBeach}
        onTogglePanel={onTogglePanel}
        onOpenFilters={() => setIsFiltersOpen(true)}
      />

      <TimeBar times={times} selectedTime={selectedTime} onTimeSelect={setSelectedTime} />

      <main className="container mx-auto px-4 py-6 ">
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-foreground">
              {processedData.filteredCount} of {processedData.totalCount} beaches
            </h2>

            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="gap-1">
                {activeFiltersCount} filter{activeFiltersCount !== 1 ? "s" : ""} active
              </Badge>
            )}
          </div>

          <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className='overflow-y-auto h-[50vh]'>
          <BeachList
            beaches={processedData.beaches}
            selectedTimeIndex={selectedTimeIndex >= 0 ? selectedTimeIndex : 0}
            sortBy={sortBy}
            searchQuery={searchQuery}
          />
        </motion.div>

        {processedData.beaches.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🏄‍♂️</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No beaches match your criteria</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters to find more surf spots.
              </p>
              <div className="flex gap-2 justify-center">
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-sm text-primary hover:underline">
                    Clear search
                  </button>
                )}
                {activeFiltersCount > 0 && (
                  <button
                    onClick={() =>
                      setFilters({
                        minRating: 0,
                        position: "all",
                        maxWind: 50,
                        minSwellPeriod: 0,
                        timeOfDay: [],
                      })
                    }
                    className="text-sm text-primary hover:underline"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </main>

      <FiltersSheet
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </div>
  )
}
