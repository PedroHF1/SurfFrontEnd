import { Forecast, ProcessedBeach } from "@/interfaces/forecast";
import { Filters } from "../../../types/filter";


export const getQualityLabel = (rating: number): { label: string; color: string } => {
  if (rating >= 4.5) return { label: "Épico", color: "bg-green-500" }
  if (rating >= 3.5) return { label: "Bom", color: "bg-blue-500" }
  if (rating >= 2.5) return { label: "Médio", color: "bg-yellow-500" }
  if (rating >= 1.5) return { label: "Fraco", color: "bg-orange-500" }
  return { label: "Flat", color: "bg-red-500" }
}

export const groupBeachesByName = (forecastData: Forecast[]): ProcessedBeach[] => {
  const beachMap = new Map<string, ProcessedBeach>()

  forecastData.forEach(({ time, forecast }) => {
    forecast.forEach((beach) => {
      if (!beachMap.has(beach.name)) {
        beachMap.set(beach.name, {
          _id: beach._id,
          name: beach.name,
          position: beach.position,
          lat: beach.lat,
          lng: beach.lng,
          hourlyData: [],
        })
      }

      beachMap.get(beach.name)!.hourlyData.push({
        time,
        ...beach,
      })
    })
  })

  return Array.from(beachMap.values())
}

export const getSparklineData = (hourlyData: any[], currentIndex: number): number[] => {
  const next12Hours = hourlyData.slice(currentIndex, currentIndex + 12)
  return next12Hours.map((data) => data.waveHeight)
}

export const sortBeaches = (beaches: ProcessedBeach[], sortBy: string): ProcessedBeach[] => {
  switch (sortBy) {
    case "rating":
      return [...beaches].sort((a, b) => (b.hourlyData[0]?.rating || 0) - (a.hourlyData[0]?.rating || 0))
    case "waves":
      return [...beaches].sort((a, b) => (b.hourlyData[0]?.waveHeight || 0) - (a.hourlyData[0]?.waveHeight || 0))
    case "wind":
      return [...beaches].sort((a, b) => (a.hourlyData[0]?.windSpeed || 0) - (b.hourlyData[0]?.windSpeed || 0))
    case "name":
      return [...beaches].sort((a, b) => a.name.localeCompare(b.name))
    default:
      return [...beaches].sort((a, b) => (b.hourlyData[0]?.rating || 0) - (a.hourlyData[0]?.rating || 0))
  }
}

export const applyFilters = (
  beaches: ProcessedBeach[],
  filters: Filters,
  selectedTimeIndex: number,
): ProcessedBeach[] => {
  return beaches.filter((beach) => {
    const currentData = beach.hourlyData[selectedTimeIndex]
    if (!currentData) return false

    if (currentData.rating < filters.minRating) return false

    if (filters.position !== "all" && beach.position !== filters.position) return false

    if (currentData.windSpeed > filters.maxWind) return false

    if (currentData.swellPeriod < filters.minSwellPeriod) return false

    if (filters.timeOfDay.length > 0) {
      const hour = new Date(currentData.time).getHours()
      const timeOfDayMap = {
        dawn: [5, 6, 7],
        morning: [8, 9, 10, 11],
        afternoon: [12, 13, 14, 15, 16],
        evening: [17, 18, 19],
        night: [20, 21, 22, 23, 0, 1, 2, 3, 4],
      }

      const matchesTimeOfDay = filters.timeOfDay.some((timeOfDay) =>
        timeOfDayMap[timeOfDay as keyof typeof timeOfDayMap]?.includes(hour),
      )

      if (!matchesTimeOfDay) return false
    }

    return true
  })
}

export const getActiveFiltersCount = (filters: Filters): number => {
  let count = 0
  if (filters.minRating > 0) count++
  if (filters.position !== "all") count++
  if (filters.maxWind < 50) count++
  if (filters.minSwellPeriod > 0) count++
  if (filters.timeOfDay.length > 0) count++
  return count
}
