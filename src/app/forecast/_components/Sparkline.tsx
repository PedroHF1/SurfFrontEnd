"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SparklineProps {
  data: number[]
  className?: string
  color?: string
}

export function Sparkline({ data, className, color = "rgb(var(--chart-1))" }: SparklineProps) {
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
    <div className={cn("relative", className)}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 32"
        className="overflow-visible"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {/* Background area */}
        <defs>
          <linearGradient id="sparkline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <path
          d={`${path} L ${points[points.length - 1]?.x || 0} 28 L ${points[0]?.x || 0} 28 Z`}
          fill="url(#sparkline-gradient)"
        />

        {/* Main line */}
        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Interactive points */}
        {points.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="8"
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
            />

            {hoveredIndex === index && (
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="3"
                fill={color}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              />
            )}
          </g>
        ))}
      </svg>

      {/* Tooltip */}
      {hoveredIndex !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-md border border-border"
          style={{
            left: `${(hoveredIndex / (data.length - 1)) * 100}%`,
          }}
        >
          {data[hoveredIndex]?.toFixed(1)}m
        </motion.div>
      )}
    </div>
  )
}
