import { useState } from "react"
import { ChevronLeft, ChevronRight } from "@medusajs/icons"

interface AvailabilityCalendarProps {
  availableDates: string[]
  selectedDate: string | null
  onDateSelect: (date: string) => void
}

export function AvailabilityCalendar({ availableDates, selectedDate, onDateSelect }: AvailabilityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate()

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const padding = Array.from({ length: firstDayOfMonth }, () => null)

  const isAvailable = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const dateStr = date.toISOString().split("T")[0]
    return availableDates.includes(dateStr)
  }

  const getDateString = (day: number) => {
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      .toISOString()
      .split("T")[0]
  }

  const isPast = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="font-semibold text-gray-900">
          {currentMonth.toLocaleDateString("en", { month: "long", year: "numeric" })}
        </h3>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {padding.map((_, i) => (
          <div key={`pad-${i}`} className="aspect-square" />
        ))}
        {days.map((day) => {
          const dateStr = getDateString(day)
          const available = isAvailable(day)
          const past = isPast(day)
          const selected = dateStr === selectedDate

          return (
            <button
              key={day}
              onClick={() => available && !past && onDateSelect(dateStr)}
              disabled={!available || past}
              className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-colors ${
                selected
                  ? "bg-blue-600 text-white"
                  : available && !past
                  ? "hover:bg-blue-100 text-gray-900"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-600 rounded" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-100 rounded" />
          <span>Available</span>
        </div>
      </div>
    </div>
  )
}
