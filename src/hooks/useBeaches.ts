import { Beach } from "@/interfaces/beach"
import { useState } from "react"

const mockBeaches: Beach[] = [
  {
    id: "1",
    name: "Manly Beach",
    latitude: -33.7969,
    longitude: 151.2899,
    rating: 5,
    swellHeight: 2.0,
    swellPeriod: 10.6,
    waveHeight: 2.0,
    windSpeed: 15,
    windDirection: "NE",
    surfCondition: "Epic",
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    name: "Bondi Beach",
    latitude: -33.8915,
    longitude: 151.2767,
    rating: 4,
    swellHeight: 1.8,
    swellPeriod: 9.2,
    waveHeight: 1.5,
    windSpeed: 12,
    windDirection: "E",
    surfCondition: "Good",
    lastUpdated: "1 hour ago",
  },
  {
    id: "3",
    name: "Byron Bay",
    latitude: -28.6474,
    longitude: 153.602,
    rating: 5,
    swellHeight: 2.5,
    swellPeriod: 12.0,
    waveHeight: 2.2,
    windSpeed: 8,
    windDirection: "SW",
    surfCondition: "Epic",
    lastUpdated: "30 minutes ago",
  },
]

export function useBeaches() {
  const [beaches, setBeaches] = useState<Beach[]>(mockBeaches)
  const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null)

  const addBeach = (newBeachData: Omit<Beach, "id">) => {
    const beach: Beach = {
      id: Date.now().toString(),
      ...newBeachData,
    }
    setBeaches([...beaches, beach])
  }

  return {
    beaches,
    selectedBeach,
    setSelectedBeach,
    addBeach,
  }
}
