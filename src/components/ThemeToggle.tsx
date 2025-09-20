"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9">
        {/* <div className="h-4 w-4" /> */}
      </Button>
    )
  }

  const isLight = theme === "light"
  const isDark = theme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-9 h-9 relative overflow-hidden text-foreground hover:bg-accent hover:text-accent-foreground"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          scale: isLight ? 1 : 0,
          rotate: isLight ? 0 : 90,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="h-4 w-4" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          rotate: isDark ? 0 : -90,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="h-4 w-4" />
      </motion.div>

      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
