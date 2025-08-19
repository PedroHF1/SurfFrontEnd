export interface Beach {
  id: string
  name: string
  latitude: number
  longitude: number
  rating: number
  swellHeight: number
  swellPeriod: number
  waveHeight: number
  windSpeed: number
  windDirection: string
  surfCondition: "Poor" | "Fair" | "Good" | "Epic"
  lastUpdated: string
}

export interface AddBeach {
  name: string
  lat: number
  lng: number
  position: string
}
