import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock, User } from "@medusajs/icons"
import type { BookingSlot, ServiceProvider } from "@/lib/mock/marketplace"

interface BookingCalendarProps {
  slots: BookingSlot[]
  selectedSlot?: string
  onSelectSlot: (slotId: string) => void
  providers?: ServiceProvider[]
  selectedProvider?: string
  onSelectProvider?: (providerId: string) => void
}

export function BookingCalendar({
  slots,
  selectedSlot,
  onSelectSlot,
  providers,
  selectedProvider,
  onSelectProvider,
}: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate()

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  const isPast = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  // Get slots for selected day
  const slotsForDay = selectedDay
    ? slots.filter((slot) => {
        const slotDate = new Date(slot.startTime)
        return (
          slotDate.getDate() === selectedDay &&
          slotDate.getMonth() === currentDate.getMonth() &&
          slotDate.getFullYear() === currentDate.getFullYear()
        )
      })
    : []

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800">
      {/* Provider Selection */}
      {providers && providers.length > 0 && onSelectProvider && (
        <div className="p-4 border-b border-gray-800">
          <h4 className="text-sm font-medium text-gray-400 mb-3">Select Provider</h4>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {providers.map((provider) => (
              <button
                key={provider.id}
                onClick={() => onSelectProvider(provider.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors flex-shrink-0 ${
                  selectedProvider === provider.id
                    ? "border-cyan-500 bg-cyan-500/10"
                    : "border-gray-700 hover:border-gray-600"
                }`}
              >
                <img
                  src={provider.avatar}
                  alt={provider.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="text-left">
                  <p className="text-sm font-medium text-white">{provider.name}</p>
                  <p className="text-xs text-gray-500">
                    {provider.rating} rating
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <button
          onClick={goToPrevMonth}
          className="p-1 rounded hover:bg-gray-800 transition-colors text-gray-400"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="font-semibold text-white">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button
          onClick={goToNextMonth}
          className="p-1 rounded hover:bg-gray-800 transition-colors text-gray-400"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {emptyDays.map((_, i) => (
            <div key={`empty-${i}`} className="p-2" />
          ))}
          {days.map((day) => (
            <button
              key={day}
              disabled={isPast(day)}
              onClick={() => setSelectedDay(day)}
              className={`p-2 text-sm rounded-lg transition-colors ${
                isPast(day)
                  ? "text-gray-700 cursor-not-allowed"
                  : selectedDay === day
                  ? "bg-cyan-500 text-black"
                  : isToday(day)
                  ? "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDay && (
        <div className="p-4 border-t border-gray-800">
          <h4 className="text-sm font-medium text-gray-400 mb-3">
            Available Times for {monthNames[currentDate.getMonth()]} {selectedDay}
          </h4>
          {slotsForDay.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {slotsForDay.map((slot) => {
                const startTime = new Date(slot.startTime)
                const timeString = startTime.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })

                return (
                  <button
                    key={slot.id}
                    disabled={!slot.available}
                    onClick={() => onSelectSlot(slot.id)}
                    className={`flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                      !slot.available
                        ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                        : selectedSlot === slot.id
                        ? "bg-cyan-500 text-black"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    {timeString}
                  </button>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              No available slots for this date
            </p>
          )}
        </div>
      )}
    </div>
  )
}
