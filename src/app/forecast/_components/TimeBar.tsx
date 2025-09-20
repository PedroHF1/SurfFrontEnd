"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import moment from "moment"
import { useEffect, useRef, useState } from "react"

interface TimeBarProps {
  times: string[]
  selectedTime: string
  onTimeSelect: (time: string) => void
}

interface DateBarProps {
  times: string[]
  selectedDate: string
  onDateSelect: (date: string) => void
}

interface HourBarProps {
  times: string[]
  selectedDate: string
  selectedTime: string
  onTimeSelect: (time: string) => void
}

export function DateBar({ times, selectedDate, onDateSelect }: DateBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftGradient, setShowLeftGradient] = useState(false)
  const [showRightGradient, setShowRightGradient] = useState(true)

  const handleScroll = () => {
    if (!scrollRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setShowLeftGradient(scrollLeft > 0)
    setShowRightGradient(scrollLeft < scrollWidth - clientWidth - 1)
  }

  const uniqueDates = Array.from(new Set(times.map(time => moment(time).format("YYYY-MM-DD"))))
    .sort((a, b) => moment(a).valueOf() - moment(b).valueOf())

  useEffect(() => {
    const selectedIndex = uniqueDates.indexOf(selectedDate)
    if (selectedIndex !== -1 && scrollRef.current) {
      const button = scrollRef.current.children[selectedIndex] as HTMLElement
      if (button) {
        button.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        })
      }
    }
  }, [selectedDate, uniqueDates])

  return (
    <div className="bg-background/90 backdrop-blur-sm border-b border-border/50">
      <div className="relative">
        {showLeftGradient && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background/90 to-transparent z-10 pointer-events-none" />
        )}

        {showRightGradient && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background/90 to-transparent z-10 pointer-events-none" />
        )}

        <div
          ref={scrollRef}
          className="flex gap-2 p-3 overflow-x-auto no-scrollbar scroll-smooth "
          style={{ scrollSnapType: "x mandatory" }}
        >
          {uniqueDates.map((date) => {
            const isSelected = date === selectedDate
            const displayDate = moment(date).format("ddd, MMM D")

            return (
              <motion.button
                key={date}
                onClick={() => onDateSelect(date)}
                className={cn(
                  "relative px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors min-w-fit",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card text-card-foreground border border-border/50",
                )}
                style={{ scrollSnapAlign: "center" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                {displayDate}

                {isSelected && (
                  <motion.div
                    layoutId="date-underline"
                    className="absolute -bottom-1 left-1/2 w-8 h-0.5 bg-primary rounded-full"
                    style={{ x: "-50%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function HourBar({ times, selectedDate, selectedTime, onTimeSelect }: HourBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftGradient, setShowLeftGradient] = useState(true)
  const [showRightGradient, setShowRightGradient] = useState(true)

  const handleScroll = () => {
    if (!scrollRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setShowLeftGradient(scrollLeft > 0)
    setShowRightGradient(scrollLeft < scrollWidth - clientWidth - 1)
  }

  const timesForSelectedDate = times.filter(time =>
    moment(time).format("YYYY-MM-DD") === selectedDate
  ).sort((a, b) => moment(a).valueOf() - moment(b).valueOf())

  useEffect(() => {
    const selectedIndex = timesForSelectedDate.indexOf(selectedTime)
    if (selectedIndex !== -1 && scrollRef.current) {
      const button = scrollRef.current.children[selectedIndex] as HTMLElement
      if (button) {
        button.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        })
      }
    }
  }, [selectedTime, timesForSelectedDate])

  return (
    <div className="bg-background/95 backdrop-blur-sm  ">
      <div className="relative w-[30vw] mx-auto">
        {showLeftGradient && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background/95 to-transparent z-10 pointer-events-none" />
        )}

        {showRightGradient && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background/95 to-transparent z-10 pointer-events-none" />
        )}

        <div
          ref={scrollRef}
          className="flex gap-2 p-3 overflow-x-auto no-scrollbar scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {timesForSelectedDate.map((time) => {
            const isSelected = time === selectedTime
            const displayTime = moment(time).format("HH A")

            return (
              <motion.button
                key={time}
                onClick={() => onTimeSelect(time)}
                className={cn(
                 "relative px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors min-w-fit",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-sm z-20"
                    : "bg-card text-card-foreground border border-border/50",
                )}
                style={{ scrollSnapAlign: "center" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                {displayTime}

                {isSelected && (
                  <motion.div
                  layoutId="hour-underline"
                    className="absolute -bottom-1 left-4 w-8 h-0.5 bg-primary rounded-full"
                    style={{ x: "-50%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function TimeBar({ times, selectedTime, onTimeSelect }: TimeBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftGradient, setShowLeftGradient] = useState(true)
  const [showRightGradient, setShowRightGradient] = useState(true)

  const handleScroll = () => {
    if (!scrollRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setShowLeftGradient(scrollLeft > 0)
    setShowRightGradient(scrollLeft < scrollWidth - clientWidth - 1)
  }

  useEffect(() => {
    const selectedIndex = times.indexOf(selectedTime)
    if (selectedIndex !== -1 && scrollRef.current) {
      const button = scrollRef.current.children[selectedIndex] as HTMLElement
      if (button) {
        button.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        })
      }
    }
  }, [selectedTime, times])

  const groupedTimes = times.reduce(
    (acc, time, index) => {
      const date = moment(time).format("ddd, MMM D")
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push({ time, index })
      return acc
    },
    {} as Record<string, { time: string; index: number }[]>,
  )

  return (
    <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="relative">
        {showLeftGradient && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background/80 to-transparent z-10 pointer-events-none" />
        )}

        {showRightGradient && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background/80 to-transparent z-10 pointer-events-none" />
        )}

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-2 p-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {Object.entries(groupedTimes).map(([date, timeGroup]) => (
            <div key={date} className="flex gap-2 items-center">
              <div className="flex items-center gap-2 px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground font-medium whitespace-nowrap">
                {date}
              </div>

              {timeGroup.map(({ time }) => {
                const isSelected = time === selectedTime
                return (
                  <motion.button
                    key={time}
                    onClick={() => onTimeSelect(time)}
                    className={cn(
                      "relative px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-card-foreground hover:bg-accent",
                    )}
                    style={{ scrollSnapAlign: "center" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  >
                    {moment(time).format("HH:mm")}

                    {isSelected && (
                      <motion.div
                        layoutId="time-underline"
                        className="absolute -bottom-1 left-1/2 w-6 h-0.5 bg-primary rounded-full"
                        style={{ x: "-50%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 24 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
