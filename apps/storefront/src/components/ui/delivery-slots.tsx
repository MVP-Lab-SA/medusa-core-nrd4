import { useState } from "react"
import { Clock, Calendar } from "@medusajs/icons"

interface TimeSlot {
  id: string
  time: string
  available: boolean
  price?: number
}

interface DeliveryDay {
  date: Date
  slots: TimeSlot[]
  isFastest?: boolean
}

interface DeliverySlotsProps {
  days: DeliveryDay[]
  selectedDate?: Date
  selectedSlot?: string
  onSelect: (date: Date, slotId: string) => void
  currency?: string
  className?: string
}

export function DeliverySlots({
  days,
  selectedDate,
  selectedSlot,
  onSelect,
  currency = "USD",
  className = ""
}: DeliverySlotsProps) {
  const [activeDay, setActiveDay] = useState(0)

  const formatDate = (date: Date) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) return "Today"
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow"
    
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  const formatPrice = (amount: number) => {
    if (amount === 0) return "Free"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency
    }).format(amount)
  }

  const currentDay = days[activeDay]

  return (
    <div className={`border border-gray-200 rounded-xl overflow-hidden ${className}`}>
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-600" />
          <h3 className="font-medium text-gray-900">Choose Delivery Time</h3>
        </div>
      </div>

      {/* Date Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {days.map((day, idx) => {
          const isActive = activeDay === idx
          return (
            <button
              key={idx}
              onClick={() => setActiveDay(idx)}
              className={`flex-1 min-w-[100px] p-3 text-center transition-colors ${
                isActive
                  ? "bg-cyan-50 border-b-2 border-cyan-500"
                  : "hover:bg-gray-50"
              }`}
            >
              <p className={`text-sm font-medium ${isActive ? "text-cyan-700" : "text-gray-900"}`}>
                {formatDate(day.date)}
              </p>
              {day.isFastest && (
                <span className="text-xs text-green-600 font-medium">Fastest</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Time Slots */}
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {currentDay.slots.map(slot => {
            const isSelected = selectedDate?.toDateString() === currentDay.date.toDateString() && selectedSlot === slot.id

            return (
              <button
                key={slot.id}
                onClick={() => slot.available && onSelect(currentDay.date, slot.id)}
                disabled={!slot.available}
                className={`p-3 rounded-lg border transition-all ${
                  isSelected
                    ? "bg-cyan-500 border-cyan-500 text-white"
                    : slot.available
                    ? "border-gray-200 hover:border-cyan-300 hover:bg-cyan-50"
                    : "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className={`w-4 h-4 ${isSelected ? "text-white" : "text-gray-400"}`} />
                  <span className={`text-sm font-medium ${isSelected ? "text-white" : "text-gray-900"}`}>
                    {slot.time}
                  </span>
                </div>
                {slot.price !== undefined && (
                  <p className={`text-xs ${isSelected ? "text-cyan-100" : slot.price === 0 ? "text-green-600" : "text-gray-500"}`}>
                    {formatPrice(slot.price)}
                  </p>
                )}
                {!slot.available && (
                  <p className="text-xs text-gray-400">Unavailable</p>
                )}
              </button>
            )
          })}
        </div>

        {selectedSlot && (
          <div className="mt-4 p-3 bg-cyan-50 rounded-lg">
            <p className="text-sm text-cyan-800">
              <strong>Selected:</strong> {formatDate(selectedDate!)} at{" "}
              {currentDay.slots.find(s => s.id === selectedSlot)?.time}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
