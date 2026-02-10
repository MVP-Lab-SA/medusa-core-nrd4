import type { DeliverySlot } from "../../lib/mock/fleetbase"

interface DeliverySlotPickerProps {
  slots: DeliverySlot[]
  selectedSlot: string | null
  onSelectSlot: (slotId: string) => void
}

export function DeliverySlotPicker({ slots, selectedSlot, onSelectSlot }: DeliverySlotPickerProps) {
  // Group slots by date
  const slotsByDate = slots.reduce((acc, slot) => {
    const date = new Date(slot.date).toDateString()
    if (!acc[date]) acc[date] = []
    acc[date].push(slot)
    return acc
  }, {} as Record<string, DeliverySlot[]>)

  return (
    <div className="space-y-4">
      {Object.entries(slotsByDate).map(([date, dateSlots]) => (
        <div key={date}>
          <h4 className="font-medium text-gray-900 mb-2">
            {new Date(date).toLocaleDateString("en", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {dateSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => slot.available && onSelectSlot(slot.id)}
                disabled={!slot.available}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  selectedSlot === slot.id
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                    : slot.available
                    ? "border-gray-200 hover:border-blue-300"
                    : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                }`}
              >
                <div className="font-medium text-sm">{slot.timeWindow}</div>
                {slot.price > 0 ? (
                  <div className="text-xs text-gray-500 mt-1">
                    {new Intl.NumberFormat("en", {
                      style: "currency",
                      currency: slot.currency,
                    }).format(slot.price)}
                  </div>
                ) : (
                  <div className="text-xs text-green-600 mt-1">Free</div>
                )}
                {!slot.available && (
                  <div className="text-xs text-red-500 mt-1">Unavailable</div>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
