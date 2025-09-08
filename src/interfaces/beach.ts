export interface Beach {
  _id: string
  name: string
  lat: number
  lng: number
  rating: number
  swellHeight: number
  swellPeriod: number
  waveHeight: number
  windSpeed: number
  windDirection: string
  lastUpdated: string
}

export interface Forecast {
  time: string
  forecast: Beach[]
}

export interface AddBeach {
  name: string
  lat: number
  lng: number
  position: string
}
