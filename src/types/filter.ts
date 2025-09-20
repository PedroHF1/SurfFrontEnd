export interface Filters {
  minRating: number
  position: "all" | "north" | "south"
  maxWind: number
  minSwellPeriod: number
  timeOfDay: string[]
}
