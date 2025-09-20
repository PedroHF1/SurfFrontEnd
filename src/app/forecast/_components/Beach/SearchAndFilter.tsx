import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Search } from "lucide-react"
import { AddBeachDialog } from "./AddBeachDialog"
import { AddBeach, Beach } from "@/interfaces/forecast"

interface SearchAndFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  filterCondition: string
  onFilterChange: (value: string) => void
  onAddBeach: (beach: AddBeach) => void
}

export function SearchAndFilters({
  searchTerm,
  onSearchChange,
  filterCondition,
  onFilterChange,
  onAddBeach,
}: SearchAndFiltersProps) {
  return (
    <div className="p-4 border-b border-slate-700">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search beaches..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
            />
          </div>
        </div>
        <AddBeachDialog onAddBeach={onAddBeach} />
        <Select value={filterCondition} onValueChange={onFilterChange}>
          <SelectTrigger className="w-full sm:w-48 bg-slate-800 border-slate-700 text-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by condition" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all" className="text-white hover:bg-slate-700">
              All Conditions
            </SelectItem>
            <SelectItem value="epic" className="text-white hover:bg-slate-700">
              Epic
            </SelectItem>
            <SelectItem value="good" className="text-white hover:bg-slate-700">
              Good
            </SelectItem>
            <SelectItem value="fair" className="text-white hover:bg-slate-700">
              Fair
            </SelectItem>
            <SelectItem value="poor" className="text-white hover:bg-slate-700">
              Poor
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
