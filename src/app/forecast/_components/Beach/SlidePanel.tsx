import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { BeachCard } from "./BeachCard"
import { AddBeach, Beach, Forecast } from "@/interfaces/beach"
import { SearchAndFilters } from "./SearchAndFilter"
import { createBeach } from "@/services/beach"
import moment from "moment"
import { useState } from "react"

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
  const [selectedTime, setSelectedTime] = useState('')
  const filteredBeaches = selectedTime && forecasts ? forecasts.filter(beach => beach.time === selectedTime).flatMap(beach => beach.forecast) : []
  // const filteredBeaches = forecasts && forecasts.filter((beach) => {
  //   // const matchesSearch = searchTerm && searchTerm.length > 0 ? beach.name && beach.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
  //   // const matchesFilter = filterCondition ? filterCondition === "all" || beach.surfCondition.toLowerCase() === filterCondition.toLowerCase() : true
  //   // return matchesSearch
  // })



  const handleAddBeach = async (payload: AddBeach) => {
   try {
    await createBeach(payload)
   } catch (error) {
    console.error(error);
   }
  }

  return (
    <div
      className={`fixed left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 transition-all duration-300 ease-in-out z-40 ${
        isPanelExpanded ? "bottom-0 top-[170px]" : "-bottom-[250px]"
      }`}
      style={{
        height: isPanelExpanded ? "calc(100vh - 8rem)" : "50vh",
      }}
      onClick={onPanelExpand}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-white">Surf Spots ({filteredBeaches && filteredBeaches.length})</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onTogglePanel()
            }}
            className="text-slate-400 hover:text-white"
          >
            {isPanelExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </Button>
        </div>

        {selectedBeach && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBeachDeselect}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-hidden">
        <SearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          filterCondition={filterCondition}
          onFilterChange={onFilterChange}
          onAddBeach={handleAddBeach}
        />

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedBeach ? (
            <BeachCard beach={selectedBeach} onClick={() => {}} variant="detailed" />
          ) : (
            <div className="overflow-auto space-y-6 h-[420px]">
              <div className="flex items-center justify-center gap-2">
                {forecasts && forecasts.map((forecast, index) => (
                  <Button key={index} onClick={() => setSelectedTime(forecast.time)} variant={'link'}>{moment.utc(forecast.time).format("HH A")}</Button>
                ))}
              </div>
              {filteredBeaches && filteredBeaches.map((beach, index) => (
                <BeachCard
                  key={index}
                  beach={beach}
                  onClick={onBeachSelect}
                  variant="compact"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
