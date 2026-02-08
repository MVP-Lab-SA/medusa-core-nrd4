interface TimeSlot {
  time: string
  available: boolean
}

interface TimeSlotPickerProps {
  slots: TimeSlot[]
  selectedSlot: string | null
  onSlotSelect: (time: string) => void
}

export function TimeSlotPicker({ slots, selectedSlot, onSlotSelect }: TimeSlotPickerProps) {
  const morningSlots = slots.filter((s) => {
    const hour = parseInt(s.time.split(":")[0])
    return hour < 12
  })
  const afternoonSlots = slots.filter((s) => {
    const hour = parseInt(s.time.split(":")[0])
    return hour >= 12 && hour < 17
  })
  const eveningSlots = slots.filter((s) => {
    const hour = parseInt(s.time.split(":")[0])
    return hour >= 17
  })

  const renderSlots = (slotGroup: TimeSlot[], label: string) => {
    if (slotGroup.length === 0) return null

    return (
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">{label}</h4>
        <div className="grid grid-cols-4 gap-2">
          {slotGroup.map((slot) => (
            <button
              key={slot.time}
              onClick={() => slot.available && onSlotSelect(slot.time)}
              disabled={!slot.available}
              className={`py-2 px-3 text-sm rounded-lg border transition-colors ${
                selectedSlot === slot.time
                  ? "bg-blue-600 text-white border-blue-600"
                  : slot.available
                  ? "border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                  : "border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50"
              }`}
            >
              {slot.time}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="font-semibold text-gray-900 mb-4">Select Time</h3>
      {slots.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No available times for this date</p>
      ) : (
        <>
          {renderSlots(morningSlots, "Morning")}
          {renderSlots(afternoonSlots, "Afternoon")}
          {renderSlots(eveningSlots, "Evening")}
        </>
      )}
    </div>
  )
}
