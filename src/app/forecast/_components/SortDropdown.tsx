"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface SortDropdownProps {
  sortBy: string
  onSortChange: (sortBy: string) => void
}

const SORT_OPTIONS = [
  { value: "rating", label: "Best Rating" },
  { value: "waves", label: "Highest Waves" },
  { value: "wind", label: "Lowest Wind" },
  { value: "name", label: "A–Z" },
]

export function SortDropdown({ sortBy, onSortChange }: SortDropdownProps) {
  const currentSort = SORT_OPTIONS.find((option) => option.value === sortBy)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 border rounded-lg px-4 py-1 hover:cursor-pointer">
          <span className="font-light text-gray-500">Sort:</span> {currentSort?.label || "Best Rating"}
          <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={sortBy === option.value ? "bg-accent" : ""}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
