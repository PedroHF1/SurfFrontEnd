import { Beach } from "@/interfaces/beach"
import { useState } from "react"

const mockBeaches: Beach[] = [
  {
    _id: "1",
    name: "Manly Beach",
    lat: -33.7969,
    lng: 151.2899,
    rating: 5,
    swellHeight: 2.0,
    swellPeriod: 10.6,
    waveHeight: 2.0,
    windSpeed: 15,
    windDirection: "NE",
    lastUpdated: "2 hours ago",
  },
  {
    _id: "2",
    name: "Bondi Beach",
    lat: -33.8915,
    lng: 151.2767,
    rating: 4,
    swellHeight: 1.8,
    swellPeriod: 9.2,
    waveHeight: 1.5,
    windSpeed: 12,
    windDirection: "E",
    lastUpdated: "1 hour ago",
  },
  {
    _id: "3",
    name: "Byron Bay",
    lat: -28.6474,
    lng: 153.602,
    rating: 5,
    swellHeight: 2.5,
    swellPeriod: 12.0,
    waveHeight: 2.2,
    windSpeed: 8,
    windDirection: "SW",
    lastUpdated: "30 minutes ago",
  },
]

export function useBeaches() {
  const [beaches, setBeaches] = useState<Beach[]>(mockBeaches)
  const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null)

  return {
    beaches,
    setBeaches,
    selectedBeach,
    setSelectedBeach,
  }
}
