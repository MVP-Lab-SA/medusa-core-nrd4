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
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Provider Selection */}
      {providers && providers.length > 0 && onSelectProvider && (
        <div className="p-4 border-b border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Select Provider</h4>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {providers.map((provider) => (
              <button
                key={provider.id}
                onClick={() => onSelectProvider(provider.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors flex-shrink-0 ${
                  selectedProvider === provider.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={provider.avatar}
                  alt={provider.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">{provider.name}</p>
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
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button
          onClick={goToPrevMonth}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="font-semibold text-gray-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button
          onClick={goToNextMonth}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
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
                  ? "text-gray-300 cursor-not-allowed"
                  : selectedDay === day
                  ? "bg-blue-500 text-white"
                  : isToday(day)
                  ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  : "hover:bg-gray-100"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDay && (
        <div className="p-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
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
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : selectedSlot === slot.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
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
