import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getRatingLabel } from "@/helpers/rating"
import { useBeaches } from "@/hooks/useBeaches"
import { Beach } from "@/interfaces/beach"
import { MapPin, Star, Waves, Wind } from "lucide-react"

interface BeachCardProps {
  beach: Beach
  onClick: (beach: Beach | null) => void
  variant?: "compact" | "detailed"
}

export function BeachCard({ beach, onClick, variant = "compact" }: BeachCardProps) {
  const {selectedBeach} = useBeaches()

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Epic":
        return "bg-green-500"
      case "Good":
        return "bg-blue-500"
      case "Fair":
        return "bg-yellow-500"
      case "Poor":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`} />
    ))
  }

  if (variant === "detailed") {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-400" />
              <div>
                <CardTitle className="text-white">{beach.name}</CardTitle>
                <CardDescription className="text-slate-400">
                  {beach.lat}, {beach.lng}
                </CardDescription>
              </div>
            </div>
            <Badge className={`${getConditionColor(getRatingLabel[beach.rating])} text-white`}>
              {getRatingLabel[beach.rating]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center text-sm text-slate-400">
                <Star className="w-4 h-4 mr-1" />
                Rating
              </div>
              <div className="flex">{renderStars(beach.rating)}</div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center text-sm text-slate-400">
                <Waves className="w-4 h-4 mr-1" />
                Swell
              </div>
              <div className="text-white font-medium">
                {beach.swellHeight}m @ {beach.swellPeriod}s
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center text-sm text-slate-400">
                <Waves className="w-4 h-4 mr-1" />
                Waves
              </div>
              <div className="text-white font-medium">{beach.waveHeight}m</div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center text-sm text-slate-400">
                <Wind className="w-4 h-4 mr-1" />
                Wind
              </div>
              <div className="text-white font-medium">
                {beach.windSpeed}kt {beach.windDirection}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-700">
            <span className="text-slate-400 text-sm">Last updated: {beach.lastUpdated}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer"
      onClick={() => {
        if (selectedBeach?._id === beach._id) {
          onClick(null)
        } else {
          onClick(beach)
        }
      }}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <MapPin className="w-4 h-4 text-blue-400" />
            <div>
              <h3 className="text-white font-medium">{beach.name}</h3>
              <p className="text-slate-400 text-sm">
                {beach.lat}, {beach.lng}
              </p>
            </div>
          </div>
          <Badge className={`${getConditionColor(getRatingLabel[beach.rating])} text-white text-xs`}>
            {getRatingLabel[beach.rating]}
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-3 text-sm">
          <div>
            <div className="text-slate-400 text-xs">Swell</div>
            <div className="text-white font-medium">{beach.swellHeight}m</div>
          </div>
          <div>
            <div className="text-slate-400 text-xs">Waves</div>
            <div className="text-white font-medium">{beach.waveHeight}m</div>
          </div>
          <div>
            <div className="text-slate-400 text-xs">Wind</div>
            <div className="text-white font-medium">{beach.windSpeed}kt</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
