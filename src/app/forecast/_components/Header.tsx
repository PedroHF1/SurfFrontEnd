"use client"

import { Search, Plus, Filter, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/ThemeToggle"
import { AddBeachDialog } from "./Beach/AddBeachDialog"
import { AddBeach } from "@/interfaces/forecast"

interface HeaderProps {
  beachCount: number
  searchQuery: string
  isPanelExpanded : boolean
  onSearchChange: (query: string) => void
  onAddBeach: (payload: AddBeach) => void
  onOpenFilters: () => void
  onTogglePanel: () => void
}

export function Header({ beachCount,onTogglePanel, searchQuery, isPanelExpanded, onSearchChange, onAddBeach, onOpenFilters }: HeaderProps) {
  return (
    <motion.header
      className="border-b border-border bg-card/50 backdrop-blur-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <div className="mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
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
            <motion.h1
              className="text-2xl font-bold text-foreground"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.1 }}
            >
              Surf Spots ({beachCount})
            </motion.h1>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search beaches..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 w-64 bg-background/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={onOpenFilters} className="gap-2" leftIcon={<Filter className="h-4 w-4" />}>
              All Conditions
            </Button>

           <AddBeachDialog onAddBeach={onAddBeach} />
          </div>
        </div>
      </div>
    </motion.header>
  )
}
