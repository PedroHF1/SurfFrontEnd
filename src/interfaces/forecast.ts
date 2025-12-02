export interface Beach {
  _id?: string
  name: string
  lat: number
  lng: number
  rating: number
  position: string
  swellHeight: number
  swellDirection: number
  swellPeriod: number
  waveHeight: number
  waveDirection: number
  windSpeed: number
  windDirection: number
  lastUpdated: string
}

export interface Forecast {
  time: string
  forecast: Beach[]
}

export interface ProcessedBeach {
  _id?: string
  name: string
  position: string
  lat: number
  lng: number
  hourlyData: (Beach & { time: string })[]
}

export interface AddBeach {
  name: string
  lat: number
  lng: number
  position: string
}
