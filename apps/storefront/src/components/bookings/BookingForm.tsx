import { useState } from "react"
import { User, Calendar, Clock, CurrencyDollar } from "@medusajs/icons"
import { AvailabilityCalendar } from "./AvailabilityCalendar"
import { TimeSlotPicker } from "./TimeSlotPicker"

interface BookingFormProps {
  serviceId: string
  serviceName: string
  duration: number
  price: number
  providerId?: string
  providerName?: string
  availableDates?: string[]
  availableSlots?: { time: string; available: boolean }[]
  onSubmit: (data: {
    date: string
    time: string
    notes: string
    attendees: number
  }) => void
}

export function BookingForm({ 
  serviceName, 
  duration, 
  price, 
  providerName,
  availableDates = [],
  availableSlots = [],
  onSubmit 
}: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [notes, setNotes] = useState("")
  const [attendees, setAttendees] = useState(1)
  const [step, setStep] = useState(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedDate && selectedTime) {
      onSubmit({
        date: selectedDate,
        time: selectedTime,
        notes,
        attendees
      })
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Service Summary */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900">{serviceName}</h2>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {duration} min
          </span>
          <span className="flex items-center gap-1">
            <CurrencyDollar className="w-4 h-4" />
            ${price}
          </span>
          {providerName && (
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {providerName}
            </span>
          )}
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex border-b border-gray-200">
        {['Date', 'Time', 'Details'].map((label, idx) => (
          <button
            key={label}
            onClick={() => setStep(idx + 1)}
            disabled={idx + 1 > step}
            className={`flex-1 py-3 text-sm font-medium ${
              step === idx + 1 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : idx + 1 < step
                ? 'text-gray-900'
                : 'text-gray-400'
            }`}
          >
            {idx + 1}. {label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        {step === 1 && (
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Select a Date</h3>
            <AvailabilityCalendar 
              availableDates={availableDates}
              selectedDate={selectedDate}
              onDateSelect={(date: string) => {
                setSelectedDate(date)
                setStep(2)
              }}
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="font-medium text-gray-900 mb-4">
              Select a Time for {selectedDate && new Date(selectedDate).toLocaleDateString()}
            </h3>
            <TimeSlotPicker 
              slots={availableSlots}
              selectedSlot={selectedTime}
              onSlotSelect={(time: string) => {
                setSelectedTime(time)
                setStep(3)
              }}
            />
            <button
              type="button"
              onClick={() => setStep(1)}
              className="mt-4 text-sm text-blue-600 hover:text-blue-700"
            >
              Change Date
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Booking Details</h3>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>{selectedDate && new Date(selectedDate).toLocaleDateString()}</span>
                <span className="text-gray-400">at</span>
                <span>{selectedTime}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Attendees
              </label>
              <select
                value={attendees}
                onChange={(e) => setAttendees(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                {[1, 2, 3, 4, 5].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requests (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special requirements or notes..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none h-24"
              />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Service</span>
                <span>${price}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Attendees</span>
                <span>x{attendees}</span>
              </div>
              <div className="flex justify-between font-medium text-lg pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>${price * attendees}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800"
            >
              Confirm Booking
            </button>
            
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full text-sm text-blue-600 hover:text-blue-700"
            >
              Change Time
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
