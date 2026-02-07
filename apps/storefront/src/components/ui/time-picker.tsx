import { useState, useRef, useEffect } from "react"
import { clx } from "@medusajs/ui"

interface TimePickerProps {
  value?: string
  onChange?: (time: string) => void
  minTime?: string
  maxTime?: string
  interval?: number
  placeholder?: string
  disabled?: boolean
  className?: string
  label?: string
  error?: string
  format?: "12h" | "24h"
}

export function TimePicker({
  value,
  onChange,
  minTime = "00:00",
  maxTime = "23:59",
  interval = 30,
  placeholder = "Select time",
  disabled = false,
  className,
  label,
  error,
  format = "12h",
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const generateTimeSlots = () => {
    const slots: string[] = []
    const [minHour, minMin] = minTime.split(":").map(Number)
    const [maxHour, maxMin] = maxTime.split(":").map(Number)
    const minMinutes = minHour * 60 + minMin
    const maxMinutes = maxHour * 60 + maxMin

    for (let minutes = minMinutes; minutes <= maxMinutes; minutes += interval) {
      const hour = Math.floor(minutes / 60)
      const min = minutes % 60
      slots.push(`${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`)
    }
    return slots
  }

  const formatTime = (time: string) => {
    if (!time) return ""
    const [hour, min] = time.split(":").map(Number)
    if (format === "24h") {
      return time
    }
    const period = hour >= 12 ? "PM" : "AM"
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${displayHour}:${min.toString().padStart(2, "0")} ${period}`
  }

  const handleSelect = (time: string) => {
    onChange?.(time)
    setIsOpen(false)
  }

  const slots = generateTimeSlots()

  return (
    <div ref={containerRef} className={clx("relative", className)}>
      {label && (
        <label className="block text-sm font-medium text-neutral-300 mb-1.5">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={clx(
          "w-full px-4 py-3 text-left",
          "bg-neutral-900 border border-neutral-700 rounded-lg",
          "text-white placeholder-neutral-500",
          "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent",
          "transition-all duration-200",
          disabled && "opacity-50 cursor-not-allowed",
          error && "border-red-500"
        )}
      >
        {value ? formatTime(value) : <span className="text-neutral-500">{placeholder}</span>}
      </button>
      
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}

      {isOpen && (
        <div className="absolute z-50 mt-2 py-2 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl max-h-64 overflow-y-auto min-w-[150px]">
          {slots.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => handleSelect(time)}
              className={clx(
                "w-full px-4 py-2 text-left text-sm transition-colors",
                value === time
                  ? "bg-cyan-500 text-black font-medium"
                  : "text-white hover:bg-neutral-800"
              )}
            >
              {formatTime(time)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
