import { useState } from "react"
import { XMark } from "@medusajs/icons"
import { AvailabilityCalendar } from "./AvailabilityCalendar"
import { TimeSlotPicker } from "./TimeSlotPicker"

interface RescheduleModalProps {
  isOpen: boolean
  onClose: () => void
  onReschedule: (date: string, time: string) => void
  currentDate: string
  currentTime: string
  serviceName: string
  availableDates?: string[]
  availableSlots?: { time: string; available: boolean }[]
}

export function RescheduleModal({ 
  isOpen, 
  onClose, 
  onReschedule,
  currentDate,
  currentTime,
  serviceName,
  availableDates = [],
  availableSlots = []
}: RescheduleModalProps) {
  const [newDate, setNewDate] = useState<string | null>(null)
  const [newTime, setNewTime] = useState<string | null>(null)
  const [step, setStep] = useState(1)

  if (!isOpen) return null

  const handleSubmit = () => {
    if (newDate && newTime) {
      onReschedule(newDate, newTime)
      onClose()
    }
  }

  const handleClose = () => {
    setNewDate(null)
    setNewTime(null)
    setStep(1)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Reschedule Booking</h2>
          <button onClick={handleClose} className="p-1 hover:bg-gray-100 rounded">
            <XMark className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <p className="text-sm text-gray-600">
              <strong>{serviceName}</strong>
            </p>
            <p className="text-sm text-gray-500">
              Current: {new Date(currentDate).toLocaleDateString()} at {currentTime}
            </p>
          </div>

          {step === 1 && (
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Select New Date</h3>
              <AvailabilityCalendar 
                availableDates={availableDates}
                selectedDate={newDate}
                onSelectDate={(date) => {
                  setNewDate(date)
                  setStep(2)
                }}
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-medium text-gray-900 mb-4">
                Select New Time for {newDate && new Date(newDate).toLocaleDateString()}
              </h3>
              <TimeSlotPicker 
                slots={availableSlots}
                selectedTime={newTime}
                onSelectTime={(time) => setNewTime(time)}
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
        </div>

        <div className="p-4 border-t border-gray-200 flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!newDate || !newTime}
            className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Reschedule
          </button>
        </div>
      </div>
    </div>
  )
}
