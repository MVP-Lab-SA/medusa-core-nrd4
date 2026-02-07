import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "@medusajs/icons"
import { clx } from "@medusajs/ui"

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date) => void
  minDate?: Date
  maxDate?: Date
  placeholder?: string
  disabled?: boolean
  className?: string
  disabledDates?: Date[]
  label?: string
  error?: string
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

export function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = "Select date",
  disabled = false,
  className,
  disabledDates = [],
  label,
  error,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [viewDate, setViewDate] = useState(value || new Date())
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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPrevMonth = new Date(year, month, 0).getDate()
    
    const days: { date: Date; isCurrentMonth: boolean }[] = []
    
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isCurrentMonth: false,
      })
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      })
    }
    
    const remaining = 42 - days.length
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      })
    }
    
    return days
  }

  const isDateDisabled = (date: Date) => {
    if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) return true
    if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999))) return true
    return disabledDates.some(d => 
      d.getDate() === date.getDate() &&
      d.getMonth() === date.getMonth() &&
      d.getFullYear() === date.getFullYear()
    )
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
  }

  const isSelected = (date: Date) => {
    if (!value) return false
    return date.getDate() === value.getDate() &&
      date.getMonth() === value.getMonth() &&
      date.getFullYear() === value.getFullYear()
  }

  const handleSelect = (date: Date) => {
    if (isDateDisabled(date)) return
    onChange?.(date)
    setIsOpen(false)
  }

  const prevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

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
        {value ? formatDate(value) : <span className="text-neutral-500">{placeholder}</span>}
      </button>
      
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}

      {isOpen && (
        <div className="absolute z-50 mt-2 p-4 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl min-w-[300px]">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={prevMonth}
              className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-neutral-400" />
            </button>
            <span className="text-white font-medium">
              {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map(day => (
              <div key={day} className="text-center text-xs text-neutral-500 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(viewDate).map((day, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelect(day.date)}
                disabled={isDateDisabled(day.date)}
                className={clx(
                  "p-2 text-sm rounded-lg transition-all",
                  !day.isCurrentMonth && "text-neutral-600",
                  day.isCurrentMonth && !isSelected(day.date) && !isDateDisabled(day.date) && "text-white hover:bg-neutral-800",
                  isToday(day.date) && !isSelected(day.date) && "ring-1 ring-cyan-500",
                  isSelected(day.date) && "bg-cyan-500 text-black font-medium",
                  isDateDisabled(day.date) && "opacity-30 cursor-not-allowed"
                )}
              >
                {day.date.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
