"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SelectItem } from "@/components/ui/select"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { useTheme } from "next-themes"

interface SparklineProps {
  data: number[]
  className?: string
  color?: string
}

const chartConfig = {
  Wave: {
    label: "Wave",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function Sparkline({ data, className, color = "gray" }: SparklineProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const { path, points, minValue, maxValue } = useMemo(() => {
    if (data.length === 0) return { path: "", points: [], minValue: 0, maxValue: 0 }

    const minValue = Math.min(...data)
    const maxValue = Math.max(...data)
    const range = maxValue - minValue || 1

    const width = 200
    const height = 32
    const padding = 4

    const points = data.map((value, index) => ({
      x: padding + (index / (data.length - 1)) * (width - 2 * padding),
      y: padding + (1 - (value - minValue) / range) * (height - 2 * padding),
      value,
    }))

    const path = points.reduce((acc, point, index) => {
      const command = index === 0 ? "M" : "L"
      return `${acc} ${command} ${point.x} ${point.y}`
    }, "")

    return { path, points, minValue, maxValue }
  }, [data])

  if (data.length === 0) {
    return <div className={cn("bg-muted rounded", className)} />
  }

  return (
    <Card className="p-0 border-none shadow-none max-h-[200px]">
      <CardContent className="p-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[130px] w-full"
        >
          <AreaChart
            data={data.map((value, i) => ({
              index: i,
              height: value,
            }))}
          >
            <defs>
              <linearGradient id="fillWave" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={color}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="height"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={i => `${i}`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  formatter={(value, name) => {
                    return <div className="flex items-center gap-4">
                      <span className="capitalize">{name}: </span>
                      <span className="font-semibold">{value}m</span>
                      </div>
                  }}
                />
              }
            />
            <Area
              dataKey="height"
              type="natural"
              fill="url(#fillWave)"
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, fill: color, stroke: "#fff", strokeWidth: 2 }}
              isAnimationActive={true}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
